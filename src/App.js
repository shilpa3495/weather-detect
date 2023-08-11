import Home from "./Component/Home/Home";

import WeatherInfo from "./Component/WeatherInfo/WeatherInfo";
import { useSelector } from "react-redux";

function App() {
  const showInfo = useSelector((state) => state.weather.showInfo);
  return (
 
      <div className="App">{showInfo ? <WeatherInfo /> : <Home />}</div>
  );
}

export default App;
