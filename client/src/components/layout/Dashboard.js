import React from 'react';
import Layout from './Layout';
import classes from './Dash.module.css';
import TodoList from '../to-do-list/TodoList';
import Pomodoro from '../pomodoro/Pomodoro';
import Weather from '../weather/Weather';
import Journal from '../journal/Journal';

const Dashboard = () => {
  return (
    <>
      
      <div className={ `${classes.main_container}` }>
        {/* <div className={ classes.weather }><Weather /></div>
        <div className={ classes.timer }><Pomodoro /></div>
        <div className={ classes.journal }><Journal /></div>
        <div className={ classes.todo }><TodoList /></div> */}
      </div>
    </>

  );
};

export default Dashboard;