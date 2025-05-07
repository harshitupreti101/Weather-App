document.addEventListener(`DOMContentLoaded`, ()=>{
    const cityInput = document.getElementById(`city-input`);
    const getWeatherBtn = document.getElementById(`get-weather-btn`);
    const weatherInfo = document.getElementById(`weather-info`);
    const cityNameDisplay = document.getElementById(`city-name`);
    const temperatureDisplay = document.getElementById(`temperature`);
    const descriptionDisplay = document.getElementById(`description`);
    const errorMessage = document.getElementById(`error-message`);

    const API_Key = "f5fe51a7c8c9d46a6ec3bf8991d60bad";

    getWeatherBtn.addEventListener(`click`,async ()=>{
        const  city = cityInput.value.trim();
        if (!city) return; 
        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError();
        }

    })

    async function fetchWeatherData(city) {
        const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_Key}`;
        const response = await fetch(url);
        console.log(`RESPONSE`,response);

        if (!(response.ok)) {
            throw new Error(`City Not Found`);
        }
        const data = await response.json();
        return data;
    }

    function displayWeatherData(data) {
        errorMessage.classList.add(`hidden`);
        const {name,main,weather} = data;
        cityNameDisplay.textContent = name;
        const tempInCelsius = (main.temp - 273.15).toFixed(1); 
        temperatureDisplay.textContent = `Temperature : ${tempInCelsius}`;
        descriptionDisplay.textContent = `Weather : ${weather[0].description}`;
        weatherInfo.classList.remove(`hidden`)
    }
    function showError () {
        errorMessage.classList.remove(`hidden`);
        weatherInfo.classList.add(`hidden`)
    }

})