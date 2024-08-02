import React, { useState } from "react";

const api = {
  key: "166307cb0dd22871cdcb8f1c22d85bfb",
  base: "https://api.openweathermap.org/data/2.5/",
};

const Weather = () => {
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState({});

  const search = (evt) => {
    if (evt.key === "Enter") {
      fetch(`${api.base}weather?q=${query}&units=metric&APPID=${api.key}`)
        .then((res) => res.json())
        .then((result) => {
          setWeather(result);
          setQuery("");
        });
    }
  };

  const dateBuilder = (d) => {
    let months = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
  };

  return (
    <main className="bg-slate-200 w-full h-screen flex flex-col items-center p-4 sm:p-6 lg:p-8">
      <div className="w-full flex justify-center mt-6 sm:mt-8 lg:mt-10">
        <input
          type="text"
          placeholder="Search Your Weather..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={search}
          className="w-3/4 sm:w-2/3 lg:w-1/2 rounded-full p-3 px-4 text-base sm:text-xl lg:text-2xl shadow-lg focus:outline-none hover:outline-none active:outline-none font-semibold"
        />
      </div>

      {typeof weather.main != "undefined" ? (
        <div className="text-center mt-6 sm:mt-8 lg:mt-10">
          <div className="text-slate-700 text-2xl sm:text-3xl lg:text-4xl font-semibold">
            {weather.name}, {weather.sys.country}
          </div>
          <div className="text-lg sm:text-xl lg:text-2xl text-slate-700 font-semibold mt-2 sm:mt-4 lg:mt-6">
            {dateBuilder(new Date())}
          </div>
          <div className="flex items-center justify-center mt-4 sm:mt-6 lg:mt-8 h-32 sm:h-44 lg:h-48 w-3/4 sm:w-2/3 lg:w-80 mx-auto bg-white text-slate-700 text-5xl sm:text-6xl lg:text-8xl font-bold shadow-md rounded-3xl">
            {Math.round(weather.main.temp)}°C
          </div>
          <div className="text-slate-700 font-bold text-lg sm:text-xl lg:text-2xl mt-4 sm:mt-5 lg:mt-6">
            {weather.weather[0].main}
          </div>
        </div>
      ) : (
        ""
      )}
    </main>
  );
};

export default Weather;
