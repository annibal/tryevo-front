import React, { useState, createContext, useEffect } from 'react';
import * as authProvider from '../providers/authProvider';

export const ACCOUNT_FEATURES = {
  IGNORE_ON_SIDEBAR: 'ignore-on-sidebar',
  LOGGED: 'account-is-logged-in',
  NOT_LOGGED: 'account-none',
  PF: 'PF',
  PF_DASH: 'PF_DASH',
  PF_RANKING: 'PF_RANKING',
  PJ: 'PJ',
  PJ_DASH: 'PJ_DASH',
  PJ_SEE_DATA: 'PJ_SEE_DATA',
}

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [features, setFeatures] = useState({
    [ACCOUNT_FEATURES.NOT_LOGGED]: true,
  });

  useEffect(() => {
    async function loadUser() {
      setLoading(true);
      try {
        const objUser = await authProvider.getAuthData();
        console.log({objUser})
        setUser(objUser);
        if (objUser) {
          setFeatures({
            ...(objUser?.features || {}),
            [ACCOUNT_FEATURES.LOGGED]: true,
            [ACCOUNT_FEATURES.NOT_LOGGED]: false,
          })
        } else {
          setFeatures({
            [ACCOUNT_FEATURES.NOT_LOGGED]: true,
          })
          authProvider.logOut();
        }
      } catch (e) {
        setError(e);
      }
      setLoading(false);
    }

    console.log('loadUser', {user})
    if (!user) {
      loadUser();
    }
  }, [user])

  const signIn = async (newUser) => {
    setError(null);
    setLoading(true);
    try {
      const objUser = await authProvider.signIn(newUser);
      console.log({ newUser })
      setUser(objUser);
      setFeatures({
        [newUser.pf ? ACCOUNT_FEATURES.PF : ACCOUNT_FEATURES.PJ]: true,
        [ACCOUNT_FEATURES.LOGGED]: true,
        [ACCOUNT_FEATURES.NOT_LOGGED]: false,
      })
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  }
  
  const logIn = async (userAndPass) => {
    setError(null);
    setLoading(true);
    try {
      const objUser = await authProvider.logIn(userAndPass);
      setUser(objUser);
      setFeatures({
        ...(objUser?.features || {}),
        [ACCOUNT_FEATURES.LOGGED]: true,
        [ACCOUNT_FEATURES.NOT_LOGGED]: false,
      })
    } catch (e) {
      setError(e)
    }
    setLoading(false);
  }

  const logOut = async () => {
    setLoading(true);
    setUser(null);
    setError(null);
    setFeatures({
      [ACCOUNT_FEATURES.NOT_LOGGED]: true,
    })
    try {
      authProvider.logOut();
    } catch (e) {
      setError(e)
    }
    setLoading(false);
  }

  const value = {
    user,
    features,
    error,
    loading,
    signIn,
    logIn,
    logOut,
  };

  console.log('Auth Provider', {user, error, loading, features});

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return React.useContext(AuthContext);
}


// function AuthStatus() {
//   const auth = useAuth();
//   const navigate = useNavigate();

//   if (!auth.user) {
//     return <p>You are not logged in.</p>;
//   }

//   return (
//     <p>
//       Welcome {auth.user}!{" "}
//       <button
//         onClick={() => {
//           auth.signout(() => navigate("/"));
//         }}
//       >
//         Sign out
//       </button>
//     </p>
//   );
// }
