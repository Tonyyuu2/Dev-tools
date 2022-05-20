import React, { useState } from 'react';
import axios from 'axios';

const AuthContext = React.createContext({
  username: null,
  token: null,
  onLogout: () => { },
  onLogin: (email, password) => { },
});

export const AuthContextProvider = (props) => {

  const [token, setToken] = useState(null);
  const [username, setUsername] = useState(null);

  /*  useEffect(() => {
     const userInfo = localStorage.getItem('isLoggedIn');
     if (userInfo === '1') {
       setIsLoggedIn(true);
     }
 
   }, []); */

  const loginHandler = async ({ email, password }) => {
    const data = { email, password };
    return axios.post('/api/auth/login', data)
      .then(result => {
        console.log(result.data);
        if (result.data) {
          console.log('result', result.data.token);
          setToken(result.data.token);
          setUsername(result.data.username);
        }

      })
      .catch(e => e.response.data.msg);
  };

  const logoutHandler = () => {
    setToken(null);
  };

  const registerHandler = (username, token) => {
    setToken(token);
    setUsername(username);
  };

  return <AuthContext.Provider
    value={ {
      token,
      onLogout: logoutHandler,
      onLogin: loginHandler,
      onRegister: registerHandler,
      username
    } }>{ props.children }</AuthContext.Provider>;

};

export default AuthContext;