import "./Timer.scss"
import Pomodoro from "../pomodoro/Pomodoro"
import styled from "styled-components"
import Weather from "../weather/Weather"

const WeatherAndPomodoroDiv = styled.div`
  display: flex;
  align-items: center;
  margin-left: 20rem;
`


const Timer = () => {
  return(
    <>
    <WeatherAndPomodoroDiv>
    <Weather/>
    <Pomodoro />
    </WeatherAndPomodoroDiv>
    </>
  )
}

export default Timer;
