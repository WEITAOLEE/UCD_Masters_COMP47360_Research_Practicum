import React, { useState, useEffect } from 'react';
import styles from './WeatherCard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faTemperatureHigh, faTint, faWind, faCloudRain, faSnowflake } from '@fortawesome/free-solid-svg-icons';


export const WeatherCard = () => {

  function convertTime(time) {
    // Convert the time to New York time
    const nyOffset = -4; // New York is 4 hours behind Irish time
    const date = new Date((time + nyOffset * 3600) * 1000);

    // Get hours, minutes, and seconds
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');

    // Convert to 12-hour format
    const meridiem = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12 || 12;

    // Format the time
    const readableTime = `${hours.toString().padStart(2, '0')}:${minutes} ${meridiem}`;
    return readableTime;
  }


  function WeatherDisplay({ currentWeather }) {
    if (!currentWeather) {
      return <div>Loading weather data...</div>;
    }

    const today = (
      <div className={styles.today}>
        Today: <img src={`http://openweathermap.org/img/wn/${currentWeather.current.weather[0].icon}@2x.png`}
          className={styles.weatherIcon}
          alt={`${currentWeather.current.weather[0].description}`} />
      </div>
    );
    

    const time = convertTime(currentWeather.current.dt);
    const temp = `Current Temperature: ${currentWeather.current.temp}°C`;
    const feels_like = `Feels Like: ${currentWeather.current.feels_like}°C`;
    const humidity = `Humidity: ${currentWeather.current.humidity} %`;
    const wind_speed = `Wind Speed: ${currentWeather.current.wind_speed} m/s`;
    var rain = 'Rain: 0 mm';
    if (currentWeather.current.rain === undefined) {
      rain = 'Rain: 0 mm';
    }
    else {
      rain = `Rain: ${currentWeather.current.rain['1h']} mm`;
    }
    var snow = 'Snow: 0 mm';
    if (currentWeather.current.snow === undefined) {
      snow = 'Snow: 0 mm';
    }
    else {
      snow = `Snow: ${currentWeather.current.snow['1h']} mm`;
    }

    return (
      <div className={styles.currentWeather}>
        {today} {/* Render the current weather icon */}
        <div className={styles.weatherItem}>
          <FontAwesomeIcon icon={faClock} />
          {time}
        </div>
        <div className={styles.weatherItem}>
          <FontAwesomeIcon icon={faTemperatureHigh} />
          {temp}
        </div>
        <div className={styles.weatherItem}>
          <FontAwesomeIcon icon={faTint} />
          {humidity}
        </div>
        <div className={styles.weatherItem}>
          <FontAwesomeIcon icon={faWind} />
          {wind_speed}
        </div>
        <div className={styles.weatherItem}>
          <FontAwesomeIcon icon={faCloudRain} />
          {rain}
        </div>
        <div className={styles.weatherItem}>
          <FontAwesomeIcon icon={faSnowflake} />
          {snow}
        </div>
      </div>
    );
  }


  const [currentWeather, setCurrentWeather] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const owUri = 'https://api.openweathermap.org/data/3.0/onecall?';
        const owLat = 40.7834300;
        const owLon = -73.9662500;
        const owKey = '0b1cf2b24bd3ed36a449501ff15b4131';

        const response = await fetch(`${owUri}lat=${owLat}&lon=${owLon}&units=metric&exclude=minutely,hourly,daily,alerts&appid=${owKey}`);

        if (response.ok) {
          const weatherData = await response.json();
          //console.log('Connected to OpenWeather and data collected successfully');
          //console.log(weatherData);
          setCurrentWeather(weatherData);
        } else {
          console.error('Failed to fetch weather data:', response.statusText);
        }
      } catch (error) {
        console.error('Error while fetching weather data:', error);
      }
    };

    fetchWeatherData();
  }, []);

  return (
    <div className={styles.weatherData}>
      {/* Render the weather display component */}
      <WeatherDisplay currentWeather={currentWeather} />
    </div>
  );
}
