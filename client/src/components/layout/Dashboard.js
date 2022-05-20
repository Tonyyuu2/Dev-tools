import React from 'react';
import { NavLink } from 'react-router-dom';
import style from '../../App.module.css';
import classes from './Dashboard.module.css'
import HomeLottie from './lottie-file/HomeLottie';


const Dashboard = () => {
  return (
    <div className={ style.global_bg }>
      <div className={ classes.container }>
        <div className={ classes.subContainer }>
          <div className={ classes.lottieContainer}>
          <h1 className={ classes.tagline}>" The <br/>  <bold className= {classes.taglineBold}> ultimate </bold> <br/><bold className= {classes.taglineProductivity}> productivity </bold> <br/> <bold className= {classes.taglineBoost}> boost </bold>" </h1>
            <HomeLottie/>
          </div>
          <li><NavLink to='/register'><button className={ classes.getStatedBtn}>Get Started</button></NavLink></li>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;