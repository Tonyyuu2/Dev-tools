import styled from "styled-components";

const InfoContainer = styled.div`
  display: flex;
  align-items: center;
`;
const InfoLabel = styled.span`
  display: flex;
  flex-direction: column;
  font-size: 13px;
  padding-left: 7px;
  & span {
    font-size: 11px;
    text-transform: capitalize;
  }
`;

const InfoIcon = styled.img`
  width: 36px;
  height: 36px;
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