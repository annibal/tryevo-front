import React, { useState, createContext, useEffect } from "react";
import * as authProvider from "../providers/authProvider";
import * as userInfoProvider from "../providers/userInfoProvider";

export const ACCOUNT_FEATURES = {
  // menus (doesn't show on user features)
  IGNORE_ON_SIDEBAR: "IGNORE_ON_SIDEBAR",

  // check if logged
  LOGGED: "LOGGED_IN",
  NOT_LOGGED: "NOT_LOGGED_IN",

  // map from type
  MASTER_ADMIN: "MASTER_ADMIN",
  PF: "PF_CANDIDATO",
  PJ: "PJ_EMPRESA",

  // synced with server
  VER_DASHBOARD: "VER_DASHBOARD",
  // VER_G_VAGAS_MES: "VER_GRAFICO_VAGAS_MES",
  // VER_G_VAGAS_ESTADO: "VER_GRAFICO_VAGAS_ESTADO",
  // VER_G_CONT_MES: "VER_GRAFICO_CONTRATACOES_MES",
  // VER_G_COMP_ESTADO: "VER_GRAFICO_COMPETENCIAS_ESTADO",

  VER_G_VAGAS_REGIAO: "VER_GRAFICO_VAGAS_REGIAO",
  VER_G_EVO_VAGAS: "VER_GRAFICO_EVOLUCAO_VAGAS",
  VER_G_TOP_CARGOS: "VER_GRAFICO_TOP_CARGOS",
  VER_G_EVO_EMPRESAS: "VER_GRAFICO_EVOLUCAO_EMPRESAS",
  VER_G_SALARIO_CARGOS: "VER_GRAFICO_SALARIO_CARGOS",

  VER_G_COMP_VAGAS: "VER_GRAFICO_COMPETENCIAS_VAGAS",
  VER_G_COMP_CAND: "VER_GRAFICO_COMPETENCIAS_CANDIDATOS",
  VER_G_HABILIDADES_VAGAS: "VER_GRAFICO_HABILIDADES_VAGAS",
  VER_G_HABILIDADES_CAND: "VER_GRAFICO_HABILIDADES_CANDIDATOS",
  VER_G_CAND_FINALISTAS: "VER_GRAFICO_CANDIDATOS_FINALISTAS",
  VER_G_EVO_CANDIDATURA: "VER_GRAFICO_EVOLUCAO_CANDIDATURA",
  VER_G_CONTRATACOES_CARGOS: "VER_GRAFICO_CONTRATACOES_CARGOS",

  VER_NOME_EMPRESA: "VER_NOME_EMPRESA",
  
  VER_DADOS_CANDIDATO: "VER_DADOS_CANDIDATO",
  VER_CV_FULL: "VER_CV_FULL",

  LIMITE_CANDIDATURAS: "LIMITE_CANDIDATURAS",
  LIMITE_VAGAS: "LIMITE_VAGAS",

  ADMIN: "ADMIN",
};

export const AUTH_READY_STATE = {
  INITIAL: "INITIAL",
  FETCHING_DATA: "FETCHING_DATA",
  DONE: "DONE",
};

export const getFeaturesFromPlano = (plano) => {
  let features = {
    [ACCOUNT_FEATURES.LOGGED]: false,
    [ACCOUNT_FEATURES.NOT_LOGGED]: true,
  };

  if (plano && plano.tipo) {
    const objPlano = {
      _id: plano._id,
      nome: plano.nome,
      tipo: plano.tipo,
      features: plano.features || {},
      // features: (plano.features || []).reduce((all, feat) => ({
      //   ...all,
      //   [feat.chave]: feat.valor
      // }), {})
    }

    features = {
      ...objPlano.features,
      [ACCOUNT_FEATURES.LOGGED]: true,
      [ACCOUNT_FEATURES.NOT_LOGGED]: false,
    }

    if (objPlano.tipo === "PF") {
      features[ACCOUNT_FEATURES.PF] = true;
    }
    if (objPlano.tipo ==="PJ") {
      features[ACCOUNT_FEATURES.PJ] = true;
    }
    if (objPlano.tipo ==="MA") {
      features[ACCOUNT_FEATURES.MASTER_ADMIN] = true;
    }
  }

  return features;
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [readyState, setReadyState] = useState(AUTH_READY_STATE.INITIAL);
  const [user, setUser] = useState(null);
  const [loadedUser, setLoadedUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
  const [loadedUserInfo, setLoadedUserInfo] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState({
    [ACCOUNT_FEATURES.NOT_LOGGED]: true,
  });

  const setUserData = (objUser) => {
    setFeatures(getFeaturesFromPlano(objUser?.plano));
    if (objUser) {
      setUser(objUser);
    } else {
      authProvider.logOut();
    }
  };

  async function loadUser(silent = false, refreshToken = false) {
    if (silent) setLoading(true);
    setLoadedUser(false);
    let objUser;

    try {
      objUser = await authProvider.getAuthData(refreshToken);
      if (objUser) {
        if (!objUser.plano?.tipo) {
          throw new Error("Plano inválido");
        }
        setUserData(objUser);
      }
    } catch (e) {
      const errMsg = (e.message || e).toString()
      const isJWTerror = errMsg.includes('jwt')
      const isPlanAssError = errMsg.includes('Plano')
      console.log(errMsg, isJWTerror, isPlanAssError)
      if (isJWTerror || isPlanAssError) {
        await logOut();
      } else {
        console.trace(e);
        setError(e);
      }
    }

    if (objUser == null) {
      setReadyState(AUTH_READY_STATE.DONE);
    }
    setLoadedUser(true);
    setLoading(false);
  }

  async function loadUserInfo(silent = false) {
    if (silent) setLoading(true);
    setLoadedUserInfo(false);

    try {
      const objUserInfo = await userInfoProvider.getOwnInfo();
      setUserInfo(objUserInfo || {});
    } catch (e) {
      if ((e.message || e).toString().includes('jwt')) {
        await logOut();
      } else {
        console.trace(e);
        setError(e);
      }
    }

    setReadyState(AUTH_READY_STATE.DONE);
    setLoadedUserInfo(true);
    setLoading(false);
  }

  useEffect(() => {
    if (!loadedUser && !loading) {
      setReadyState(AUTH_READY_STATE.FETCHING_DATA);
      loadUser();
    }
    if (user && !loadedUserInfo && !loading) {
      loadUserInfo();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loadedUser, loadedUserInfo, userInfo, loading]);

  const updateData = async (refreshToken) => {
    await loadUser(true, refreshToken);
    await loadUserInfo(true);
  }

  const invalidate = () => {
    setUser(false);
    setLoadedUser(false);
    setUserInfo(false);
    setLoadedUserInfo(false);
    setReadyState(AUTH_READY_STATE.INITIAL);
  };

  // aka register
  const signIn = async (newUser) => {
    if (newUser.senha !== newUser.checksenha) {
      setError("Senhas diferentes");
      return;
    }

    setError(null);
    setLoading(true);
    let objUser;
    try {
      objUser = await authProvider.signIn(newUser);
      setUserData(objUser);
    } catch (e) {
      console.trace(e)
      setError(e);
    }
    setLoading(false);
    return objUser;
  };

  const logIn = async (userAndPass) => {
    setError(null);
    setLoading(true);
    let objUser;
    try {
      objUser = await authProvider.logIn(userAndPass);
      setUserData(objUser);
    } catch (e) {
      console.trace(e)
      setError(e);
    }
    setLoading(false);
    return objUser;
  };

  const logOut = async () => {
    invalidate();
    setFeatures({
      [ACCOUNT_FEATURES.NOT_LOGGED]: true,
    });
    try {
      authProvider.logOut();
    } catch (e) {
      console.trace(e)
      setError(e);
    }
    setLoading(false);
  };

  const values = {
    user,
    userInfo,
    features,
    error,
    loading,
    readyState,
  };

  // console.log("Auth Context Values", values);

  const value = {
    ...values,
    signIn,
    logIn,
    logOut,
    invalidate,
    updateData,
    setUserInfo,
    clearError: () => { setError(null) }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
