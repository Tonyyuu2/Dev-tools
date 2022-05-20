import React, { useState } from 'react';
import axios from 'axios';

const AuthContext = React.createContext({
  username: null,
  onLogout: () => { },
  onLogin: (email, password) => { }
});

export const AuthContextProvider = (props) => {
  const initialToken = localStorage.getItem('token');
  const initialName = localStorage.getItem('name');
  const [token, setToken] = useState(initialToken);
  const [username, setUsername] = useState(initialName);

  const loginHandler = async ({ email, password }) => {
    const data = { email, password };
    return axios.post('/api/auth/login', data)
      .then(result => {
        if (result.data) {
          localStorage.setItem('token', result.data.token);
          localStorage.setItem('name', result.data.username);
          setToken(result.data.token);
          setUsername(result.data.username);
        }
      })
      .catch(e => e.response.data.msg);
  };

  const logoutHandler = () => {
    localStorage.clear();
    setToken(null);
    setUsername(null);
  };

  const registerHandler = (username, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('name', username);
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