import React, { useState, createContext, useEffect } from "react";
import * as authProvider from "../providers/authProvider";
import * as userInfoProvider from "../providers/userInfoProvider";

export const ACCOUNT_FEATURES = {
  IGNORE_ON_SIDEBAR: "ignore-on-sidebar",
  LOGGED: "account-is-logged-in",
  NOT_LOGGED: "account-none",
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

    if (plano.startsWith("PJ")) {
      features[ACCOUNT_FEATURES.PJ] = true;
    }
  }

  return features;
};

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [readyState, setReadyState] = useState(AUTH_READY_STATE.INITIAL);
  const [user, setUser] = useState(null);
  const [userInfo, setUserInfo] = useState(null);
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

  useEffect(() => {
    async function loadUser() {
      setLoading(true);
      let objUser;

      try {
        objUser = await authProvider.getAuthData();
        setUserData(objUser);
      } catch (e) {
        setError(e);
      }
      
      if (objUser == null) {
        setReadyState(AUTH_READY_STATE.DONE);
      }
      setLoading(false);
    }

    async function loadUserInfo() {
      setLoading(true);
      try {
        const objUserInfo = await userInfoProvider.getOwnInfo();
        setUserInfo(objUserInfo);
      } catch (e) {
        setError(e);
      }

      setReadyState(AUTH_READY_STATE.DONE);
      setLoading(false);
    }

    if (!user && !loading) {
      setReadyState(AUTH_READY_STATE.FETCHING_DATA);
      loadUser();
    }
    if (user && !userInfo && !loading) {
      loadUserInfo();
    }
  }, [user, userInfo, loading]);

  const invalidate = () => {
    setUser(false);
    setUserInfo(false);
    setReadyState(AUTH_READY_STATE.INITIAL);
  }

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
    setLoading(true);
    setUser(null);
    setError(null);
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
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}
