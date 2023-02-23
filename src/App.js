import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=caa85974e790c7e874500901d0770929`;

  const searchLocation = (event) => {
    if (event.key === 'Enter' || 'click') {
      axios.get(url).then((res) => {
        setData(res.data);
        console.log(res.data);
      });
      setLocation('');
    }
  };

  return (
    <div className="app">
      <div className="header">
        <h2>Weather App</h2>
      </div>
      <div className="search">
        <input
          value={location}
          onChange={(event) => setLocation(event.target.value)}
          placeholder="Enter Location"
          type="text"
        />
        <button onClick={searchLocation} className="btn" type="submit">
          Search
        </button>
      </div>

      {data.name !== undefined && (
        <div className="container">
          <div className="top">
            <div className="location">
              <p>{data.name}</p>
            </div>
            <div className="temp">
              {data.main ? <h1>{data.main.temp.toFixed()}°C</h1> : null}
            </div>
            <div className="desc">
              {data.weather ? <p>{data.weather[0].main}</p> : null}
              <img
              src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
              alt="" width="200rem"
            />
            </div>
          </div>

          <div className="bottom">
            <div className="feels">
              {data.main ? (
                <p className="bold">{data.main.feels_like.toFixed()}°C</p>
              ) : null}
              <p>Feels like</p>
            </div>
            <div className="humidity">
              {data.main ? <p className="bold">{data.main.humidity}%</p> : null}
              <p>Humidity</p>
            </div>
            <div className="wind">
              {data.wind ? <p className="bold">{data.wind.speed} MPH</p> : null}
              <p>Wind Speed</p>
            </div>
          </div>
        </div>
      )}
      
      <footer className='footer'>All rights reserved ©2023 Aruna Priyankara</footer>
    </div>
  );
}

export default App;
