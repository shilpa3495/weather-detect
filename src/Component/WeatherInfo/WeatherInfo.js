import { useDispatch, useSelector } from "react-redux";
import { imageUrl } from "../../utils/constant";
import { setShowInfo } from "../../utils/weatherSlice";
import LocationImage from "../../assets/location.png";
import TemperatureImage from "../../assets/temperature.png";
import HumidityImage from "../../assets/humidity.png";
import ArrowImage from "../../assets/arrow.png";
import "./WeatherInfo.css";

const WeatherInfo = () => {
  const weather = useSelector((state) => state?.weather?.weather);
  const loading = useSelector((state) => state?.weather?.loading);
  const error = useSelector((state) => state?.weather?.error);

  const dispatch = useDispatch();

  if (loading) {
    return <h2>{loading}</h2>;
  }

  function getTemperatureIntoCelssius(temp) {
    return parseInt(temp - 273.15);
  }

  return (
    <div className="weather-app-container">
      <div className="weather-header-container weather-info-header-container">
        <img src={ArrowImage} onClick={() => dispatch(setShowInfo(false))} />
        Weather App
      </div>
      {error !== null ? (
        <h2  className="weather-info-error">{error}</h2>
      ) : (
        <>
          <div className="weather-body-container">
            <div className="weather-info-container">
              <img
                className="weather-info-image"
                src={`${imageUrl}/${weather?.weather[0]?.icon}@2x.png`}
                alt="weather-img"
              />

              <h2 className="weather-info-temperature">
                {getTemperatureIntoCelssius(weather?.main?.temp)}
                <sup>°</sup>C
              </h2>
              <p className="weather-info-type"> {weather?.weather[0]?.main}</p>
              <div className="weather-location-container">
                <img src={LocationImage} alt="location-image" />{" "}
                <p className="weather-info-city">{weather?.name}</p>
              </div>
            </div>
          </div>

          <ul className="weather-info-footer-container">
            <li className="weather-info-feel-container">
              <img src={TemperatureImage} alt="feels-image" />
              <div>
                {getTemperatureIntoCelssius(weather?.main?.feels_like)}
                <sup>°</sup>C
                <div className="weather-info-li-text"> Feels like</div>
              </div>
            </li>
            <li className="weather-info-humidity-container">
              <img src={HumidityImage} alt="feels-image" />
              <div>
                {weather?.main?.humidity}%
                <div className="weather-info-li-text">Humidity</div>
              </div>
            </li>
          </ul>
        </>
      )}
    </div>
  );
};

export default WeatherInfo;
