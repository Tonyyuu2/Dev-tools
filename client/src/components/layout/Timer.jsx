import "./Timer.scss"
import Pomodoro from "../pomodoro/Pomodoro"
import styled from "styled-components"
import Weather from "../weather/Weather"
import Journal from "../journal/Journal"

const WeatherAndPomodoroDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20rem;
`


const Timer = () => {
  return(
    <>
    {/* <Weather/>
    <Pomodoro /> */}
    <Journal/>
    </>
  )
}

export default Timer;
