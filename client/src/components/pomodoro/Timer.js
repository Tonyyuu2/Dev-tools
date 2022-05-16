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

const hotpink = "#FF69B4";
const green = "#00FF00";

function Timer() {
  const settingsInfo = useContext(Settingscontext);

  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(0);
  const [mode, setMode] = useState("work");

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);
  const modeRef = useRef(mode);

  function tick() {
    secondsLeftRef.current--;
    setSecondsLeft(secondsLeftRef.current);
  }

  useEffect(() => {
    function switchMode() {
      const nextMode = modeRef.current === "work" ? "break" : "work";
      const nextSeconds =
        (nextMode === "work"
          ? settingsInfo.workMinutes
          : settingsInfo.breakMinutes) * 60;

      setMode(nextMode);
      modeRef.current = nextMode;

      setSecondsLeft(nextSeconds);
      secondsLeftRef.current = nextSeconds;
    }

    secondsLeftRef.current = settingsInfo.workMinutes * 60;
    setSecondsLeft(secondsLeftRef.current);

    const timer = setInterval(() => {
      if (isPausedRef.current) {
        return;
      }
      if (secondsLeftRef.current === 0) {
        return switchMode();
      }

      tick();
    }, 1000);

    return () => clearInterval(timer);
  }, [settingsInfo]);

  const totalSeconds =
    mode === "work"
      ? settingsInfo.workMinutes * 60
      : settingsInfo.breakMinutes * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;

  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div>
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
