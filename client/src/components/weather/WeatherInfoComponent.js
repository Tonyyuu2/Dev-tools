import styled from "styled-components";

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: -0.5em;

  
`;
const InfoLabel = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 15px;
  padding-left: 2px;
  padding-top: 2px;
  & span {
    font-size: 13px;
    text-transform: capitalize;
    padding-top: 3px;
  }
`;

const InfoIcon = styled.img`
  width: 37px;
  height: 37px;
`;

export const WeatherInfoIcons = {
  sunset: "/icons/temp.svg",
  sunrise: "/icons/temp.svg",
  humidity: "/icons/humidity.svg",
  wind: "/icons/wind.svg",
  pressure: "/icons/pressure.svg",
};

const WeatherInfoComponent = (props) => {
  const { name, value } = props;

  return (
    <InfoContainer>
      <InfoIcon src={WeatherInfoIcons[name]}/>
      <InfoLabel>
        {value}
        <span>{name}</span>
      </InfoLabel>
    </InfoContainer>
  );
};
export default WeatherInfoComponent;