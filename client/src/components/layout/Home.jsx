import React from 'react';
import Layout from './Layout';
// import classes from './Dash.module.css';
import TodoList from '../to-do-list/TodoList';
import Pomodoro from '../pomodoro/Pomodoro';
import Weather from '../weather/Weather';
import Journal from '../journal/Journal';
import Login from "../spotify/Login";
import classes from "./Home.module.css"
import styles from "../../App.module.css"

const Home = () => {
  return (
    <>
    <div className={ styles.global_bg }>
      <div className={ classes.main_container }>
        <div className={ classes.main_column }>
          <div className={classes.row_1}>
          <div className={ classes.wt_container }>
            <div className={ classes.weather }>
              <Weather />
            </div>
            <div className={ classes.timer }>
              <Pomodoro />
            </div>
          </div>
          <div className={ classes.login }>
            <Login/>
          </div>
        </div>
          <div className={ classes.todo }>
            <TodoList />
          </div>
        </div>
            <div className={ classes.journal }>
              <Journal />
            </div>      
        </div>
      </div> 
    </>
  );
};

export default Home;

