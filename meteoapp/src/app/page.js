'use client'

import Image from "next/image";
import { useState } from 'react';
import axios from 'axios';
import "./styles.css";

const URL = 'https://api.openweathermap.org/data/2.5/weather';
const API_KEY = '7363b6f39c6a94e29aab8070c131232f';

export default function MeteApp() {
  const [input, setInput] = useState('');
  const [meteo, setMeteo] = useState({
      data: {},
      loading: false,
      error: false,
  });

  const search = async (e) => {
      if (e.key === 'Enter') {
          e.preventDefault();
          setInput('');
          setMeteo({ ...meteo, loading: true });
          const url = URL;
          const api_key = API_KEY;
          await axios
              .get(url, {
                  params: {
                      q: input,
                      units: 'metric',
                      appid: api_key,
                      lang: 'fr',
                  },
              })
              .then(res => {
                  console.log('res', res);
                  setMeteo({ data: res.data, loading: false, error: false });
              })
              .catch(error => {
                  setMeteo({ ...meteo, data: {}, error: true });
                  setInput('');
                  console.log('error', error);
              });
      }
  }
  return (
      <div className="app">
            <h1 className="app-name">
               Météo Application
            </h1>
            <div className="lookup-bar">
                <input
                    type="text"
                    className="ville-lookup"
                    placeholder="Le nom de la ville.."
                    name="query"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                    onKeyDown={search}
                />
            </div>
            <div className="meteo-card">
              {meteo && meteo.data && meteo.data.main && (
                <div>
                    <div className="ville-nom">
                        <h2>
                            {meteo.data.name}, <span>{meteo.data.sys.country}</span>
                        </h2>
                    </div>
                    <div className="icon-temp">
                        <img
                            className=""
                            src={`https://openweathermap.org/img/wn/${meteo.data.weather[0].icon}@2x.png`}
                            alt={meteo.data.weather[0].description}
                        />
                        {Math.round(meteo.data.main.temp)}
                        <sup className="deg">°C</sup>
                    </div>
                    <div className="des-wind">
                        <p>{meteo.data.weather[0].description}</p>
                        <p>Vitesse du vent: {meteo.data.wind.speed}m/s</p>
                    </div>
                </div>
              )}
            </div>
            
      </div>
  );
}
