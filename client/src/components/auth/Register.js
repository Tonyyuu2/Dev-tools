import React, { useState, useContext } from "react";
import classes from "./Register.module.css";
import axios from "axios";
import style from "../../App.module.css";
import AuthContext from "../store/auth-context";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [user, setUser] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    isValid: true,
  });
  const ctx = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      user.firstname &&
      user.lastname &&
      user.email &&
      user.password &&
      user.isValid
    ) {
      axios
        .post("/api/auth/register", user)
        .then((result) => {
          ctx.onRegister(result.data.username, result.data.token);
          navigate("/");
        })
        .catch((e) => console.log(e));

      setUser({});
    }
  };

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value, isValid: true });
  };

  const validateEmail = () => {
    axios.get(`/api/auth/checkEmail?email=${user.email}`).then((result) => {
      if (result.data.emailexists) {
        setUser((prev) => {
          return { ...prev, isValid: false };
        });
      }
    });
  };

  return (
    <div className={style.global_bg}>
      <p className={classes.ptag}> </p>
      <div className={classes.container}>
      <h1 className={classes.heading}> Sign Up </h1>
        <form className={classes.flex_container} onSubmit={handleSubmit}>
          <input
            className={classes.textfield}
            type="text"
            name="firstname"
            onChange={handleChange}
            placeholder="First name"
          ></input>
          <input
            className={classes.textfield}
            type="text"
            name="lastname"
            onChange={handleChange}
            placeholder="Last name"
          ></input>
          <input
            type="email"
            id="email"
            name="email"
            className={`${!user.isValid && classes.error} ${classes.textfield}`}
            onChange={handleChange}
            onBlur={validateEmail}
            placeholder="Email address"
          ></input>
          {!user.isValid && <p>⚠️ User with this email already exists.</p>}
          <input
            className={classes.textfield}
            type="password"
            name="password"
            onChange={handleChange}
            placeholder="Password"
          ></input>
          <button className={classes.btn} type="submit">
            Sign Up
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;













