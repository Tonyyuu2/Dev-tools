import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthContext from '../store/auth-context';
import classes from './Login.module.css';
import style from '../../App.module.css';

const Login = () => {
  const ctx = useContext(AuthContext);
  const [data, setData] = useState({ email: '', password: '' });
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const error = await ctx.onLogin(data);
    if (error) {
      setError(error);
    } else {
      navigate('/');
    }
  };

  return (


    <div className={ style.global_bg }>

      <form onSubmit={ handleSubmit } className={ classes.container }>
        <label htmlFor='email'> Email</label>
        <input type='email' name='email' onChange={ handleChange }></input>
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' onChange={ handleChange }></input>
        { error && <p>{ error }</p> }
        <button type='submit' className={ classes.btn }>Login</button>
      </form>
    </div>
  );
};

export default Login;