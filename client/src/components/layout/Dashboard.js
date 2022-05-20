import React from 'react';
import style from '../../App.module.css';
import classes from './Dashboard.module.css';

const Dashboard = () => {
  return (
    <div className={ style.global_bg }>
      <div className={ classes.container }>
        This is home page
      </div>
    </div>
  );
};

export default Dashboard;