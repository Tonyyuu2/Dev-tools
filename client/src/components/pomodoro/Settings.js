import React, { useContext } from "react";
import ReactSlider from "react-slider";
import Settingscontext from "./Settingscontext";
import "./slider.css";
import BackButton from "./BackButton"

import classes from "../pomodoro/Pomodoro.module.css";
import { FaMugHot, FaBrain, FaArrowLeft } from "react-icons/fa";



function Settings() {
  const settingsInfo = useContext(Settingscontext);

  return (
    <div className={classes.overall} style={{ textAlign: "center"}}>
      <div style={{textAlign:'center',marginTop:'-20px'}}>
      <button className={classes.btn_back} onClick={() => settingsInfo.setShowSettings(false)} >
        <FaArrowLeft className={classes.icon} />
        <BackButton/>
      </button>
      </div>
      <label className={classes.label}><FaBrain/> &nbsp;{settingsInfo.workMinutes}:00</label>
      <ReactSlider
        className={"slider"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={settingsInfo.workMinutes}
        onChange={(newValue) => settingsInfo.setWorkMinutes(newValue)}
        min={0.1}
        max={120}
      />
      <label className={classes.label}><FaMugHot/>&nbsp;{settingsInfo.breakMinutes}:00</label>
      <ReactSlider
        className={"slider red"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={settingsInfo.breakMinutes}
        onChange={(newValue) => settingsInfo.setBreakMinutes(newValue)}
        min={0.1}
        max={120}
      />
    </div>
  );
}

export default Settings;
