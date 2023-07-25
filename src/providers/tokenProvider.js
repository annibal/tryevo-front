
const tokenKey = 'tryevo-token-jwt';

export const getToken = () => {
  try {
    let strToken = localStorage.getItem(tokenKey);
    if (!strToken) strToken = '';

    return strToken;
  } catch (e) {
    console.error(e, e.stack);
  }

  return '';
}

export const setToken = (value) => {
  try {
    if (!value) {
      localStorage.removeItem(tokenKey);
    } else {
      localStorage.setItem(tokenKey, value);
    }
    return true;
  } catch (e) {
    console.error(e, e.stack);
  }
}