import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import WeatherInfoComponent from "./WeatherInfoComponent";

const WeatherCondition = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
`;
const Condition = styled.span`
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 12px;
  padding-top: 10px;
  padding-bottom: 10px;
  & span {
    font-weight: bold;
    font-size: 25px;
  }
`;
const WeatherIcon = styled.img`
  width: 80px;
`;
const Location = styled.span`
  font-size: 14px;
`;

const WeatherInfoBlock = styled.div`
  display: flex;
`;
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: left;
  box-shadow: 0 3px 6px 0 #555;
  padding: 20px;
  border-radius: 4px;
  background-color: white;
  line-height: 16px;
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

const API_KEY = "59f279ff6b522c6deef69f2062276988";

function Weather() {
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
      <Container>
        <Location>
          {weather && `${weather.name}`}
          <Condition>
            <span> {weather && `${Math.ceil(weather.main.temp)}°C`}</span>
          </Condition>
        </Location>
        <WeatherIcon src={DynamicWeatherIcons[weather?.weather[0].icon]} />
          <Condition>
            {weather && ` ${weather.weather[0].description}`}
          </Condition>
        <WeatherCondition>
          <WeatherInfoBlock>
            <WeatherInfoComponent
            value={`${timeConverter(
              weather?.sys[day ? "sunset" : "sunrise"]
            )}`}
              name={day ? "sunset" : "sunrise"}
            />
          </WeatherInfoBlock>
        </WeatherCondition>
      </Container>
    </>
  );
}

export default Weather;
