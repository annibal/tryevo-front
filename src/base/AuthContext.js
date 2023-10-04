import React, { useState, createContext, useEffect } from "react";
import * as authProvider from "../providers/authProvider";
import * as userInfoProvider from "../providers/userInfoProvider";

export const ACCOUNT_FEATURES = {
  IGNORE_ON_SIDEBAR: "ignore-on-sidebar",
  LOGGED: "account-is-logged-in",
  NOT_LOGGED: "account-none",
  MASTER_ADMIN: "MASTER_ADMIN",
  PF: "PF",
  PF_DASH: "PF_DASH",
  PF_RANKING: "PF_RANKING",
  PJ: "PJ",
  PJ_DASH: "PJ_DASH",
  PJ_SEE_DATA: "PJ_SEE_DATA",
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

  if (plano) {
    features[ACCOUNT_FEATURES.LOGGED] = true;
    features[ACCOUNT_FEATURES.NOT_LOGGED] = false;

    if (plano.startsWith("PF")) {
      features[ACCOUNT_FEATURES.PF] = true;
    }
    if (plano === "PF_SMART") {
      features[ACCOUNT_FEATURES.PF_DASH] = true;
    }

    if (plano.startsWith("PJ")) {
      features[ACCOUNT_FEATURES.PJ] = true;
    }

    if (plano === ACCOUNT_FEATURES.MASTER_ADMIN) {
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

  async function loadUser(silent = false) {
    if (silent) setLoading(true);
    setLoadedUser(false);
    let objUser;

    try {
      objUser = await authProvider.getAuthData();
      setUserData(objUser);
    } catch (e) {
      if ((e.message || e).toString().includes('jwt')) {
        await logOut();
      } else {
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

  const updateData = async () => {
    await loadUser(true);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
