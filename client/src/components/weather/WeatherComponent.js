import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

const WidgetBody = styled.body`
  body {
    margin: 0px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(papayawhip, white);
  }
`;
const WeatherCondition = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  justify-content: space-between;
  margin: 30px auto;
`;
const Condition = styled.span`
  margin: 20px auto;
  font-size: 14px;
  & span {
    font-size: 28px;
  }
`;
const WeatherIcon = styled.img`
  width: 100px;
  height: 100px;
  margin: 5px auto;
`;
const Location = styled.span`
  font-size: 28px;
  font-weight: bold;
`;
const WeatherInfo = styled.span`
  font-size: 14px;
  font-weight: bold;
  margin: 20px 25px 10px;
  text-align: start;
  width: 90%;
`;
const WeatherInfoBlock = styled.div`
  display: flex;
  width: 90%;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  flex-wrap: wrap;
`;
const InfoContainer = styled.div`
  display: flex;
  margin: 5px 10px;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
`;
const InfoIcon = styled.img`
  width: 36px;
  height: 36px;
`;
const InfoLabel = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  margin: 15px;
  & span {
    font-size: 12px;
    text-transform: capitalize;
  }
`;
const Container = styled.div`
display: flex;
flex-direction: column;
margin: auto;
align-items: center;
box-shadow: 0 3px 6px 0 #555;
padding: 20px 10px
border-radius: 4px;
width 380px;
background-color: white;
`;
const WeatherLabel = styled.span`
  margin-top: 1rem;
  color: black;
  font-size: 20px;
  font-weight: bold;
  font-family: Montserrat;
`;
export const WeatherInfoIcons = {
  sunset: "/icons/temp.svg",
  sunrise: "/icons/temp.svg",
  humidity: "/icons/humidity.svg",
  wind: "/icons/wind.svg",
  pressure: "/icons/pressure.svg",
};

export const DynamicWeatherIcons = {
  "01d": "/icons/sunny.svg",
  "01n": "/icons/night.svg",
  "02d": "/icons/day.svg",
  "02n": "/icons/cloudy-night.svg",
  "03d": "/icons/cloudy.svg",
  "03n": "/icons/cloudy.svg",
  "04d": "/icons/perfect-day.svg",
  "04n": "/icons/cloudy-night.svg",
  "09d": "/icons/rain.svg",
  "09n": "/icons/rain-night.svg",
  "10d": "/icons/rain.svg",
  "10n": "/icons/rain-night.svg",
  "11d": "/icons/storm.svg",
  "11n": "/icons/storm.svg",
};

const WeatherInfoComponent = (props) => {
  const { name, value } = props;

  return (
    <Container>
      <WeatherLabel> Weather Widget</WeatherLabel>
      <InfoContainer>
        <InfoIcon src={WeatherInfoIcons[name]} />
        <InfoLabel>
          {value}
          <span>{name}</span>
        </InfoLabel>
      </InfoContainer>
    </Container>
  );
};

const API_KEY = "59f279ff6b522c6deef69f2062276988";

function WeatherComponent() {
  const [weather, setWeather] = useState();

  const day = weather?.weather[0].icon.includes("d");

  function timeConverter(timestamp) {
    return `${new Date(timestamp * 1000).getHours()}:${new Date(
      timestamp * 1000
    ).getMinutes()}`;
  }

  useEffect(() => {
    const fetchWeatherData = async () => {
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=coquitlam&APPID=${API_KEY}&units=metric`
      );
      console.log("response.data :", response.data);
      setWeather(response.data);
    };
    fetchWeatherData();
  }, []);

  return (
    <>
      <WidgetBody>
        <Container>
          <WeatherLabel>Weather</WeatherLabel>
          <WeatherCondition>
            <Condition>
              <span> {weather && `${weather.main.temp}°C`}</span>
              {weather && `  | ${weather.weather[0].description}`}
            </Condition>
            <WeatherIcon src={DynamicWeatherIcons[weather?.weather[0].icon]} />
          </WeatherCondition>
          <Location>
            {weather && `${weather.name}, ${weather.sys.country}`}
          </Location>
          <WeatherInfo>Weather Info</WeatherInfo>
          <WeatherInfoBlock>
            <WeatherInfoComponent
              name={day ? "sunset" : "sunrise"}
              value={`${timeConverter(
                weather?.sys[day ? "sunset" : "sunrise"]
              )}`}
            />
            <WeatherInfoComponent
              name="humidity"
              value={`${weather?.main.humidity} g.m-3`}
            />
            <WeatherInfoComponent
              name="wind"
              value={`${weather?.wind.speed} m/s`}
            />
            <WeatherInfoComponent
              name="pressure"
              value={`${weather?.main.pressure} psf`}
            />
          </WeatherInfoBlock>
        </Container>
      </WidgetBody>
    </>
  );
}

export default WeatherComponent;
