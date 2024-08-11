'use client'

import Image from "next/image";
//import "./styles.css";
import { useState } from 'react';
import axios from 'axios';

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
              .then((res) => {
                  console.log('res', res);
                  setMeteo({ data: res.data, loading: false, error: false });
              })
              .catch((error) => {
                  setMeteo({ ...weather, data: {}, error: true });
                  setInput('');
                  console.log('error', error);
              });
      }
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
          Application données météo&nbsp;
          {/* <code className="font-mono font-bold">src/app/page.js</code> */}
          <h1 className="app-name">
               Météo Application
            </h1>
            <div className="search-bar">
                <input
                    type="text"
                    className="ville-lookup"
                    placeholder="Le nom de la ville.."
                    name="query"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={search}
                />
            </div>
      </div>
      {meteo && meteo.data && meteo.data.main && (
                <div>
                    <div className="city-name">
                        <h2>
                            {meteo.data.name}, <span>{meteo.data.sys.country}</span>
                        </h2>
                    </div>
                    {/* <div className="date">
                        <span>{toDateFunction()}</span>
                    </div> */}
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
                        <p>{meteo.data.weather[0].description.toUpperCase()}</p>
                        <p>Vitesse du vent: {meteo.data.wind.speed}m/s</p>
                    </div>
                </div>
            )}
    </main>
  );
}
