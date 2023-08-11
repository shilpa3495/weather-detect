import { useEffect, useState } from "react";
import { useDispatch, useSelector} from "react-redux";
import { getWeatherData, setShowInfo } from "../../utils/weatherSlice";
import  useDebounced  from "../../utils/useDebounced";
import "./Home.css";
import axios from "axios";

const Home = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();

  const debouncedInputTerm = useDebounced(input, 300);

  const getCity = (e) => {
    setInput(e.target.value);
  };

  const handleLocation = async () => {
    try {
      const response = await axios.get("https://ipapi.co/json/");
      const cityName = response.data.city;
      setInput(cityName);
    } catch (error) {
      console.error("Error fetching location:", error);
    }
  };

  useEffect(() => {
    const apiKey = process.env.REACT_APP_OPENWEATHER_API_KEY;
    if (debouncedInputTerm.length>=3) {
      dispatch(getWeatherData({debouncedInputTerm, apiKey}));
      setInput("")
      dispatch(setShowInfo(true))
    }
  }, [debouncedInputTerm]);


  return (
    <div className="weather-app-container">
      <div className="weather-header-container">Weather App</div>
      <div className="weather-body-container">
        <input
          type="text"
          placeholder="Enter city name"
          value={input}
          onChange={getCity}
        />
        <div className="weather-or-text">
          <span>or</span>
        </div>
        <button onClick={handleLocation} className="weather-button-container">
          Get Device Location
        </button>
      </div>
    </div>
  );
};

export default Home;
