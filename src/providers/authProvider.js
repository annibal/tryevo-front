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

export const signIn = async ({ user, pass, firstName, lastName, isPf }) => {
  const { success, data, error } = await doCall('users.json');
  if (success) {
    if (data.find((item) => item.user === user)) {
      throw new Error("Usuário já existe");
    }

    const objUser = {
      active: true,
      id: Math.random() * 100 | 0 + 20,
      user,
      pass,
      firstName,
      lastName,
      features: {
        PF: isPf,
        PJ: !isPf,
      }
    }

    const token = JSON.stringify({ id: objUser.id, 'try': 'evo' });
    setToken(token);

    return objUser;
  } else {
    throw Error(error)
  }
}

export const logIn = async ({ user, pass }) => {
  const { success, data, error } = await doCall('users.json');
  if (success) {
    console.log({ user, pass, data })
    const objUser = data.find((item) => item.user === user);
    if (!objUser) {
      throw new Error("Usuário não existe");
    }
    if (objUser.pass !== pass) {
      throw new Error("Senha errada");
    }

    const token = JSON.stringify({ id: objUser.id, 'try': 'evo' });
    setToken(token);

    return objUser;
  } else {
    throw Error(error)
  }
}

export const getAuthData = async () => {
  const token = getToken();
  if (!token) return null;
  const tokenData = JSON.parse(token);
  
  const { success, data, error } = await doCall('users.json');
  console.log({ success, data, error })
  if (success) {
    const user = data.find((item) => item.id === tokenData.id)
    if (!user) {
      throw Error("Usuário não existe");
    }
    return user;
  } else {
    throw Error(error);
  }
}

export const logOut = async () => {
  setToken(null);
  return true;
}