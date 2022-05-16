import "./slider.css";
import Timer from "./Timer";
import Settings from "./Settings";
import Settingscontext from "./Settingscontext";
import { useState } from "react";

import classes from "../pomodoro/Pomodoro.module.css";

function Pomodoro() {

  const [showSettings, setShowSettings] = useState(false);
  const [workMinutes, setWorkMinutes] = useState(45);
  const [breakMinutes, setBreakMinutes] = useState(15);

  return (
    <div className={classes.overall}>
      <Settingscontext.Provider value={{
        showSettings,
        workMinutes,
        breakMinutes,
        setShowSettings,
        setWorkMinutes,
        setBreakMinutes,
      } }>
        { showSettings ? <Settings /> : <Timer /> }
      </Settingscontext.Provider>
    </div>
  );
}
export default Pomodoro;
