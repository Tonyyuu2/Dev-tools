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
      <div className={ classes.main_body }>
      <h1 className={ classes.welcome_container }>Welcome <br/> Back!</h1>
      <div className={ classes.container } >
        <form onSubmit={ handleSubmit } className={ classes.form_container }>
        <h3 className={ classes.login }>Login</h3>
          <label htmlFor='email'></label>
          <input className={ classes.inputField } type='email' name='email' onChange={ handleChange } placeholder="email address"></input>
          <label htmlFor='password'></label>
          <input className={ classes.inputField } type='password' placeholder='password' name='password' onChange={ handleChange }></input>
          { error && <p>{ error }</p> }
          <button type='submit' className={ classes.btn }>Login</button>
          <div className={ classes.newUser}>
          <p >New User? </p>
          <p>Forgot Your Password?</p>
          </div>
        </form>
    </div>
    </div>
    </div>
  );
};

export default Login;