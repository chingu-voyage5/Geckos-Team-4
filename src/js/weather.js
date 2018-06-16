console.log(`weather module`);
// import Skycons from './skycons';

const location = document.querySelector('.weather');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weatherIcon');
let weatherRequest;
let response;

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather);
    } else {
        console.log('else');
        location.innerHTML = `Geolocation is not supported by this browser.`;
    }
}

function getWeather(position) {

    let lat = position.coords.latitude;
    let lon = position.coords.longitude;

    // For temperature in Fahrenheit use units=imperial
    // For temperature in Celsius use units=metric
    // Temperature in Kelvin is used by default
    let query = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&APPID=c9a51511655beb8cd521d80f17f5bdb8`;
    console.log(query);

    weatherRequest = new XMLHttpRequest();

    weatherRequest.open('GET', query, true);

    weatherRequest.onload = displayWeather;

    weatherRequest.send();
    //Do not send requests more than 1 time per 10 minutes from one device/one API key.

}

function displayWeather() {
    if (weatherRequest.readyState != 4) {
        return;
    }

    if (weatherRequest.status != 200 || weatherRequest.responseText === "") {
        console.log(`Weather error`);
        return;
    }

    response = JSON.parse(weatherRequest.responseText);
    //console.log(response);
    location.innerHTML = `${response.name} , ${response.sys["country"]} `;
    temperature.innerHTML = `${response.main["temp"]}°F`;
    let description = response.weather[0].main;
    displayWeatherIcon(description);

}

function displayWeatherIcon(description) {
    // https://www.npmjs.com/package/skycons
    // var skycons = new Skycons({"color": "pink"});
    // skycons.add("icon1", Skycons.PARTLY_CLOUDY_DAY);
    // skycons.play();
    //https://openweathermap.org/weather-conditions
    weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${response.weather[0].icon}.png" alt="Weather Icon"/>`;

}

document.onload = getLocation();