import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import { Card } from "react-bootstrap";
import "./weather.css";
import WeatherForecast from "./WeatherForecast";
import CoordinationLocationName from "./CordinateLocationName";
import { FaCloud } from "react-icons/fa";
import { FadeLoader } from "react-spinners";

const WeatherApp = () => {
  const [data, setData] = useState({
    cloud_pct: 0,
    temp: 0,
    feels_like: 0,
    humidity: 0,
    min_temp: 0,
    max_temp: 0,
    wind_speed: 0,
    sunrise: 0,
    sunset: 0,
  });
  const [location, setLocation] = useState("");
  const [cityName, setCityName] = useState("");
  const [loading, setLoading] = useState(false);
  const [coordinates, setCoordinates] = useState({
    lat: 0,
    lon: 0,
  });
  const [currentDate, setCurrentDate] = useState("");

  const handleInput = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setLoading(true);

    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": "fff63cae23msh5b9d66738e66ddbp146fd2jsne08780577083",
        "X-RapidAPI-Host": "weather-by-api-ninjas.p.rapidapi.com",
      },
    };

    fetch(
      `https://weather-by-api-ninjas.p.rapidapi.com/v1/weather?city=${location}`,
      options
    )
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setData(result);
        setCityName(location);
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    const currentDate = new Date().toLocaleDateString();
    setCurrentDate(currentDate);
  }, []);

  const convertTimestampToTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const hours = date.getHours().toString().padStart(2, "0");
    const minutes = date.getMinutes().toString().padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="Search_Bar">
          <input
            type="text"
            id="myInput"
            placeholder="Enter City Name..."
            value={location}
            onChange={handleInput}
          />
          <button type="submit" className="search_button">
            Search
          </button>
        </div>

        {loading && (
          <div className="spinner-container">
            <FadeLoader
              color="#36d7b7"
              cssOverride={{
                display: "block",
                borderColor: "transparent",
              }}
              height={15}
              radius={25}
              speedMultiplier={1}
              width={16}
            />
          </div>
        )}

        {cityName && !loading && (
          <div>
            <h1 className="cityName">{cityName.toUpperCase()}</h1>
            <p className="curr_Date">{currentDate}</p>
            <div className="Today_Temp_Details">
              <div className="temp">
                <FaCloud style={{ fontSize: "140px" }} />
                <span>{data.temp}°C</span>
              </div>

              <Card className="Temp_Deatils">
                <div className="column" style={{ marginRight: "25px" }}>
                  <div className="detail">
                    <p className="value">{data.max_temp}°C</p>
                    <span className="label">MaxTemp</span>
                  </div>
                  <div className="detail">
                    <p className="value">{data.min_temp}°C</p>
                    <span className="label">MinTemp</span>
                  </div>
                </div>

                <div className="column" style={{ marginRight: "35px" }}>
                  <div className="detail">
                    <p className="value">{data.cloud_pct}%</p>
                    <span className="label">Cloud</span>
                  </div>
                  <div className="detail">
                    <p className="value">{data.wind_speed}</p>
                    <span className="label">Wind</span>
                  </div>
                </div>

                <div className="column">
                  <div className="detail">
                    <p className="value">
                      {convertTimestampToTime(data.sunrise)}
                    </p>
                    <span className="label">Sunrise</span>
                  </div>
                  <div className="detail">
                    <p className="value">
                      {convertTimestampToTime(data.sunset)}
                    </p>
                    <span className="label">Sunset</span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        )}
      </form>
      <CoordinationLocationName
        cityName={cityName}
        onCoordinatesChange={setCoordinates}
      />
      <WeatherForecast coordinates={coordinates} />
    </div>
  );
};

export default WeatherApp;
