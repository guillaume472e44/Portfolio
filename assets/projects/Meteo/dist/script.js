"use strict";
// **** **** **** ****
// **** **** **** **** Index
// **** **** **** ****
const index = [
    {
        wmoRange: [0, 2],
        description: "Clear",
        day: "./ressources/icons/clear-day.svg",
        night: "./ressources/icons/clear-night.svg",
    },
    {
        wmoRange: [3, 4],
        description: "Cloudy",
        day: "./ressources/icons/partly-cloudy-day.svg",
        night: "./ressources/icons/partly-cloudy-night.svg",
    },
    {
        wmoRange: [5, 6],
        description: "Haze",
        day: "./ressources/icons/haze-day.svg",
        night: "./ressources/icons/haze-night.svg",
    },
    {
        wmoRange: [7, 9],
        description: "Dust",
        day: "./ressources/icons/dust-day.svg",
        night: "./ressources/icons/dust-night.svg",
    },
    {
        wmoRange: [10, 19],
        description: "Mist",
        day: "./ressources/icons/mist.svg",
        night: "./ressources/icons/mist.svg",
    },
    {
        wmoRange: [20, 29],
        description: "Precipitations",
        day: "./ressources/icons/partly-cloudy-day-sleet.svg",
        night: "./ressources/icons/partly-cloudy-night-sleet.svg",
    },
    {
        wmoRange: [30, 39],
        description: "Dust-wind",
        day: "./ressources/icons/dust-wind.svg",
        night: "./ressources/icons/dust-wind.svg",
    },
    {
        wmoRange: [40, 49],
        description: "Fog",
        day: "./ressources/icons/partly-cloudy-day-fog.svg",
        night: "./ressources/icons/partly-cloudy-night-fog.svg",
    },
    {
        wmoRange: [50, 59],
        description: "Drizzle",
        day: "./ressources/icons/partly-cloudy-day-drizzle.svg",
        night: "./ressources/icons/partly-cloudy-night-drizzle.svg",
    },
    {
        wmoRange: [60, 69],
        description: "Rain",
        day: "./ressources/icons/partly-cloudy-day-rain.svg",
        night: "./ressources/icons/partly-cloudy-night-rain.svg",
    },
    {
        wmoRange: [70, 79],
        description: "Snowflakes",
        day: "./ressources/icons/partly-cloudy-day-snow.svg",
        night: "./ressources/icons/partly-cloudy-night-snow.svg",
    },
    {
        wmoRange: [80, 92],
        description: "Rain-shower",
        day: "./ressources/icons/rain.svg",
        night: "./ressources/icons/rain.svg",
    },
    {
        wmoRange: [93, 94],
        description: "Snow",
        day: "./ressources/icons/snow.svg",
        night: "./ressources/icons/snow.svg",
    },
    {
        wmoRange: [95, 99],
        description: "Thunderstorm",
        day: "./ressources/icons/thunderstorms.svg",
        night: "./ressources/icons/thunderstorms.svg",
    },
];
// **** **** **** ****
// **** **** **** **** Dom Refs
// **** **** **** ****
const weatherImg_big = document.getElementById("weather-img");
const form = document.querySelector("form");
const userInput = form.querySelector("input");
const city = document.getElementById("city");
const context = document.getElementById("context");
const temperature = document.getElementById("temperature");
const currentMin = document.getElementById("currentMin");
const currentMax = document.getElementById("currentMax");
const currentDate = document.getElementById("currentDate");
const sunrise = document.getElementById("sunrise");
const sunset = document.getElementById("sunset");
const forecast = document.querySelectorAll(".forecast");
// **** **** **** ****
// **** **** **** **** formulaire
// **** **** **** ****
form.addEventListener("submit", handleSubmit);
function handleSubmit(e) {
    e.preventDefault();
    if (!userInput.value)
        return;
    loadingDisplay();
    getLocation(userInput.value);
}
// **** **** **** ****
// **** **** **** **** Appels API
// **** **** **** ****
// fonction générique appel API
async function getAPIData(requestURL) {
    try {
        const response = await fetch(requestURL);
        if (!response.ok) {
            throw new Error(`Erreur ${response.status}`);
        }
        return await response.json();
    }
    catch (error) {
        return { errorMsg: error };
    }
}
async function getLocation(request) {
    const data = await getAPIData(`https://data.geopf.fr/geocodage/search?q=${request}&limit=1`);
    if (data.features) {
        populateLocationUI(data.features[0].properties);
        getDatas(data.features[0].geometry.coordinates);
    }
    else if (data.errorMsg) {
        const invalidRequest = {
            city: data.errorMsg.message,
            context: "Requête invalide",
        };
        populateLocationUI(invalidRequest);
        errorDisplay();
    }
}
function populateLocationUI(properties) {
    city.textContent = properties.city;
    context.textContent = properties.context;
}
async function getDatas(location) {
    const data = await getAPIData(`https://api.open-meteo.com/v1/forecast?latitude=${location[1]}&longitude=${location[0]}&daily=temperature_2m_max,temperature_2m_min,sunrise,sunset,weather_code&models=meteofrance_seamless&current=temperature_2m,is_day,weather_code&timezone=auto`);
    populateCurrentUI({
        time: data.current.time,
        temperature: Math.round(data.current.temperature_2m).toString(),
        weather_code: data.current.weather_code,
        min: Math.round(data.daily.temperature_2m_min[0]).toString(),
        max: Math.round(data.daily.temperature_2m_max[0]).toString(),
        sunrise: data.daily.sunrise[0],
        sunset: data.daily.sunset[0],
        isDay: data.current.is_day,
    });
    populateForecastUI({
        time: data.daily.time,
        weather_code: data.daily.weather_code,
        min: data.daily.temperature_2m_min,
        max: data.daily.temperature_2m_max,
    });
}
function populateCurrentUI(currentData) {
    weatherImg_big.src = getWeatherImg({
        wmo_code: currentData.weather_code,
        isDay: currentData.isDay,
    });
    currentDate.textContent = new Date().toLocaleString().split(" ")[0];
    temperature.textContent = currentData.temperature;
    currentMin.textContent = currentData.min;
    currentMax.textContent = currentData.max;
    sunrise.textContent = currentData.sunrise.split("T")[1];
    sunset.textContent = currentData.sunset.split("T")[1];
}
function populateForecastUI(forecastData) {
    forecast.forEach((el, index) => {
        const forecastDate = el.children[0];
        const weatherImg_tiny = el.children[1];
        const forecastTemperature = el.children[2];
        forecastDate.textContent = formatDate(forecastData.time[index]);
        weatherImg_tiny.src = getWeatherImg({
            wmo_code: forecastData.weather_code[index],
        });
        forecastTemperature.textContent =
            Math.round((forecastData.min[index] + forecastData.max[index]) / 2).toString() + "°";
    });
    function formatDate(date) {
        const split = date.split("-");
        return `${split[2]}/${split[1]}`;
    }
}
function getWeatherImg(weatherData) {
    const found = index.find((obj) => weatherData.wmo_code >= obj.wmoRange[0] &&
        weatherData.wmo_code <= obj.wmoRange[1]);
    if (found) {
        return weatherData.isDay === 0 ? found.night : found.day;
    }
    else
        return "./ressources/browser.svg";
}
// **** **** **** **** affichage chargement
function loadingDisplay() {
    weatherImg_big.src = "./ressources/loader.svg";
    city.textContent = "";
    context.textContent = "";
    temperature.textContent = "";
    currentMin.textContent = "";
    currentMax.textContent = "";
    sunrise.textContent = "";
    sunset.textContent = "";
    forecast.forEach((el) => {
        const forecastDate = el.children[0];
        const weatherImg_tiny = el.children[1];
        const forecastTemperature = el.children[2];
        forecastDate.textContent = "";
        weatherImg_tiny.src = "./ressources/loader.svg";
        forecastTemperature.textContent = "";
    });
}
// **** **** **** **** affichage erreur
function errorDisplay() {
    weatherImg_big.src = "./ressources/browser.svg";
    weatherImg_big.style.transform = "scale(50%)";
    forecast.forEach((el) => {
        const weatherImg_tiny = el.children[1];
        weatherImg_tiny.src = "./ressources/browser.svg";
        weatherImg_tiny.style.transform = "scale(75%)";
    });
}
// **** **** **** **** affichage au lancement
getLocation("Paris");
