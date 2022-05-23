import React, { useContext, useState, useEffect, useRef } from "react";
import {
  CircularProgressbarWithChildren,
  buildStyles,
} from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import Playbutton from "./Playbutton";
import Pausebutton from "./Pausebutton";
import Settingsbutton from "./Settingsbutton";
import Settingscontext from "./Settingscontext";
import classes from "../pomodoro/Pomodoro.module.css";
import { Howl } from "howler";
import ding from "./sounds/Ding.mp3";

const hotpink = "#beaefb";
const green = "#02C39A";

function Timer() {
  const settingsInfo = useContext(Settingscontext);

  //state for mutable state for the timer
  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [mode, setMode] = useState("work");

  //variables that uses the useRef hook to access a reference to the current state
  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  //fn that negates 1 from the current secondsLeft state
  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    //fn that switches mode from work to break and renders its current time
    function switchMode() {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds =
        (nextMode === "work"
          ? settingsInfo.workMinutes
          : settingsInfo.breakMinutes) * 60;
      //sets the mode and mode reference when switchMode is triggered
      setMode(nextMode);
      modeRef.current = nextMode;
      //sets the time on render and sets the time reference on render when switchMode is triggered
      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }
    //class variable to play sound
    const sound = new Howl({
      src: [ding],
      volume: 0.5,
    });
    //sets the current time on render and sets the reference on render
    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);
    //set interval fn that triggers the tick fn if all conditions are not met
    const timer = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        sound.play();
        switchMode();
        return;
      }

      tick();
    }, 1000);

    return () => clearInterval(timer);
  }, [settingsInfo]);
  // variable that sets the number of seconds left 
  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;
      //value that will be used for the progress bar
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);
  //variable that sets the number of minutes left
  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;

  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div style={{ boxShadow: "0px 4px 7px -4px black", borderRadius: "100px" }}>
      <CircularProgressbarWithChildren
        value={percentage}
        styles={buildStyles({
          textColor: "#fff",
          pathColor: mode === "work" ? hotpink : green,
          tailColor: "rgb(0,0,255,0.2)",
        })}
      >
        <div className={classes.progresstime}>
          {mode === "work" ? `${minutes}:${seconds}` : `${minutes}:${seconds}`}
        </div>
        <div className={classes.buttonposition}>
          {isPaused ? (
            <Playbutton
              onClick={() => {
                setIsPaused(false);
                isPausedRef.current = false;
              }}
            />
          ) : (
            <Pausebutton
              onClick={() => {
                setIsPaused(true);
                isPausedRef.current = true;
              }}
            />
          )}
          <Settingsbutton onClick={() => settingsInfo.setShowSettings(true)} />
        </div>
      </CircularProgressbarWithChildren>
    </div>
  );
}

export default Timer;
