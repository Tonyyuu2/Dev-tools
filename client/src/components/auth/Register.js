import React, { useState, useContext } from 'react';
import classes from './Register.module.css';
import axios from 'axios';
import style from '../../App.module.css';
import AuthContext from '../store/auth-context';
import { useNavigate } from 'react-router-dom';

const Register = () => {

  const [user, setUser] = useState({
    firstname: "", lastname: "", git: "", email: "", password: "", isValid: true
  });
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();


  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('/auth/register', user)
      .then(result => {
        console.log(result.data);
        ctx.onRegister(result.data.username, result.data.token);
        navigate('/');
      })
      .catch(e => console.log(e));

    setUser({});
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value, isValid: true });
  };

  const validateEmail = () => {
    axios.get(`/api/auth/checkEmail?email=${user.email}`)
      .then(result => {
        if (result.data.emailexists) {
          setUser(prev => {
            return { ...prev, isValid: false };
          });
        };
      });
  };

  return (
    <div className={ style.global_bg }>
      <form className={ classes.container } onSubmit={ handleSubmit }>
        <label htmlFor='firstname'>Firstname</label>
        <input type='text' name='firstname' onChange={ handleChange }></input>
        <label htmlFor='lastname'>Lastame</label>
        <input type='text' name='lastname' onChange={ handleChange }></input>
        <label htmlFor='git'>Github username</label>
        <input type='text' name='git' onChange={ handleChange }></input>
        <label htmlFor='email'>Email</label>
        <input type='email' id='email' name='email'
          className={ `${!user.isValid && classes.error}` }
          onChange={ handleChange }
          onBlur={ validateEmail }
        ></input>
        { !user.isValid && <p>User with this email already exists.</p> }
        <label htmlFor='password'>Password</label>
        <input type='password' name='password' onChange={ handleChange }></input>
        <button className={ classes.btn } type='submit'>Register</button>
      </form>
    </div >
  );
};

export default Register;