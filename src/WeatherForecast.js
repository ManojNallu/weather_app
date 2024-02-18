import React, { useEffect, useState } from "react";
import { Card, CardHeader } from "react-bootstrap";
import "./weather.css";
import { FaCloudSun } from "react-icons/fa";
import { IoIosSunny } from "react-icons/io";
import {
    BsCloudSunFill,
    BsClouds,
    BsCloudsFill,
    BsCloudDrizzleFill,
    BsCloudSnowFill,
    BsSnow,
} from "react-icons/bs";

const WeatherForecast = ({ coordinates }) => {
    const [dailyForecast, setDailyForecast] = useState([]);

    useEffect(() => {
        const apiKey = "98b576af2442059a776a24a53df893fc";

        if (coordinates) {
            const { lat, lon } = coordinates;

            fetch(
                `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&cnt=40&appid=${apiKey}`
            )
                .then((response) => response.json())
                .then((data) => {
                    const groupedByDate = data.list.reduce(
                        (acc, entry) => {
                            const date = new Date(entry.dt * 1000).toLocaleDateString();
                            acc[date] = acc[date] || [];
                            acc[date].push(entry);
                            return acc;
                        },
                        {}
                    );

                    const currentDate = new Date().toLocaleDateString();
                    const filteredForecastArray = Object.entries(groupedByDate)
                        .map(([date, entries]) => ({
                            date,
                            entries,
                        }))
                        .filter((forecast) => forecast.date !== currentDate);

                    setDailyForecast(filteredForecastArray);
                })
                .catch((error) => console.error("Error fetching data:", error));
        }
    }, [coordinates]);

    const convertKelvinToCelsius = (kelvin) => {
        return kelvin - 273.15;
    };

    const renderWeatherIcon = (description) => {
        switch (description.toLowerCase()) {
            case "clear sky":
                return <IoIosSunny style={{ color: "orange" }} />;
            case "few clouds":
                return <FaCloudSun style={{ color: "black" }} />;
            case "overcast clouds":
                return <BsCloudsFill />;
            case "scattered clouds":
                return <BsCloudSunFill />;
            case "broken clouds":
                return <BsClouds />;
            case "light rain":
            case "moderate rain":
            case "rain":
                return <BsCloudDrizzleFill />;

            case "light snow":
                return <BsCloudSnowFill />;
            case "snow":
                return <BsSnow />;
            default:
                return <IoIosSunny />;
        }
    };

    const getBackgroundColor = (description) => {
        switch (description.toLowerCase()) {
            case "clear sky":
                return "rgba(255, 245, 157, 0.5)";
            case "few clouds":
                return "lightblue";
            case "scattered clouds":
            case "broken clouds":
            case "overcast clouds":
                return "rgba(128, 128, 128, 0.5)";
            case "light rain":
            case "moderate rain":
            case "rain":
                return "skyblue";
            case "light snow":
            case "snow":
                return "aqua";
            default:
                return "transparent";
        }
    };

    const convertHpaToInHg = (hPa) => {
        const conversionFactor = 0.02953;
        return (hPa * conversionFactor).toFixed(2);
    };

    return (
        <>
            <span style={{ color: "white" }}>5-Day Weather Forecast</span>
            <div className="ForeCast_Container">
                {dailyForecast.map((day, index) => (
                    <Card key={index} className="ForeCast_Data">
                        <CardHeader
                            className="Card_Header"
                            style={{
                                backgroundColor: getBackgroundColor(
                                    day.entries[0].weather[0].description
                                ),
                            }}
                        >
                            <div style={{ display: "flex", justifyContent: "space-between" }}>
                                <span>
                                    {day.entries[0].weather[0].description ===
                                        "overcast clouds" ||
                                        day.entries[0].weather[0].description === "scattered clouds"
                                        ? "Cloudy"
                                        : day.entries[0].weather[0].description}
                                </span>

                                <span>{day.entries[0].dt_txt.split(" ")[0]}</span>
                            </div>

                            <div className="temp_Icons">
                                <span style={{ fontSize: "35px", margin: "5px 20px 0 0" }}>
                                    {renderWeatherIcon(day.entries[0].weather[0].description)}
                                </span>

                                <span style={{ fontSize: "30px", margin: "5px 0 0 10px" }}>
                                    {Math.floor(convertKelvinToCelsius(day.entries[0].main.temp))}
                                    °
                                </span>
                            </div>
                        </CardHeader>

                        <Card.Body className="forecast_details">
                            <div className="weather-info">
                                <span>Humidity </span>
                                <span>Wind </span>
                                <span>Pressure </span>
                            </div>
                            <div className="seperators">
                                <span>:</span>
                                <span>:</span>
                                <span>:</span>
                            </div>

                            <div className="weather-values">
                                <span>{day.entries[0].main.humidity}%</span>
                                <span>{day.entries[0].wind.speed.toFixed(2)}mph</span>
                                <span>{convertHpaToInHg(day.entries[0].main.pressure)}in</span>
                            </div>
                        </Card.Body>
                    </Card>
                ))}
            </div>
        </>
    );
};

export default WeatherForecast;
