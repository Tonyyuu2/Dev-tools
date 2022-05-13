import React, { useContext } from "react";
import ReactSlider from "react-slider";
import Settingscontext from "./Settingscontext";
import "./slider.css";
import BackButton from "./BackButton"

function Settings() {
  const settingsInfo = useContext(Settingscontext);

  return (
    <div style={{ textAlign: "left" }}>
      <label>work: {settingsInfo.workMinutes}:00</label>
      <ReactSlider
        className={"slider"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={settingsInfo.workMinutes}
        onChange={(newValue) => settingsInfo.setWorkMinutes(newValue)}
        min={1}
        max={120}
      />
      <label>break: {settingsInfo.breakMinutes}:00</label>
      <ReactSlider
        className={"slider red"}
        thumbClassName={"thumb"}
        trackClassName={"track"}
        value={settingsInfo.breakMinutes}
        onChange={(newValue) => settingsInfo.setBreakMinutes(newValue)}
        min={1}
        max={120}
      />

      <div style={{textAlign:'center', marginTop:'20px'}}>
      <BackButton onClick={() => settingsInfo.setShowSettings(false)}/>
      </div>
    </div>
  );
}

export default Settings;
