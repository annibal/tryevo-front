import { doCall } from "./baseProvider"
import { getToken, setToken } from "./tokenProvider";

export const forgotPassword = async ({ user }) => {
  const { success, data, error } = await doCall('users.json');
  if (success) {
    const objUser = data.find((item) => item.user === user)
    if (!objUser) {
      return {
        success: false,
        users: data,
      }
    }

    return {
      success: true,
      users: data,
      foundUser: objUser,
    }
  } else {
    throw Error(error);
  }
}

export const changePassword = async ({ senha }) => {
  const { success, data, error } = await doCall('auth/change-password', {
    method: 'POST',
    body: { senha },
  });
  
  if (success && data) {
    return data;
  } else {
    if (error.message) throw new Error(error.message);
    throw new Error(error);
  }
}

export const changeTipoConta = async ({ tipo }) => {
  const { success, data, error } = await doCall('auth/change-account-type', {
    method: 'POST',
    body: { tipo },
  });
  
  if (success && data) {
    return data;
  } else {
    if (error.message) throw new Error(error.message);
    throw new Error(error);
  }
}

export const signIn = async (newUserData) => {
  // { email: "", senha: "", isEmpresa: true }
  const { success, data, error } = await doCall('auth/register', {
    method: 'POST',
    body: newUserData,
  });
  
  if (success && data && data.token) {
    setToken(data.token);
    return data;
  } else {
    if (error.message) throw new Error(error.message);
    throw new Error(error);
  }
}

export const logIn = async ({ email, senha }) => {
  const { success, data, error } = await doCall('auth/login', {
    method: 'POST',
    body: {
      email,
      senha,
    },
  });

  if (success && data && data.token) {
    setToken(data.token);
    return data;
  } else {
    if (error.message) throw new Error(error.message);
    throw new Error(error);
  }
}

export const getAuthData = async (refreshToken = false) => {
  const token = getToken();
  if (!token) return null;
  
  const url = `/auth/self${refreshToken ? "?withToken=true" : ""}`
  const { success, data, error } = await doCall(url);

  if (success && data) {
    if (data.token && refreshToken) {
      setToken(data.token);
    }
    return data;
  } else {
    if (error.message) throw new Error(error.message);
    throw Error(error);
  }
}

export const logOut = async () => {
  setToken(null);
  return true;
}