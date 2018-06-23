 console.log(`weather module loaded`);

 const defaultCities = [`Miami`, `New York`, `Los Angeles`, `Chicago`];

const location = document.querySelector('.location');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weatherIcon');
const APPID = `c9a51511655beb8cd521d80f17f5bdb8`;
let weatherRequest;
let response;

export function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather, error);
    } else {
        location.innerHTML = `Geolocation is not supported by this browser.`;
    }
}

function error(){
    //console.log(`getCurrentPosition error`);
    let city = defaultCities[(Math.floor(Math.random() * (defaultCities.length)))];
    getWeather(null, city)

}

function getWeather(position, city=null) {

    let query;

    if(position){

        let lat = position.coords.latitude;
        let lon = position.coords.longitude;


        // For temperature in: Fahrenheit use units=imperial, Celsius use units=metric
    	// Temperature in Kelvin is used by default
    	//https://openweathermap.org/current#geo
        query = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&APPID=${APPID}`;
    }
    else {
        query = `http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${APPID}`;
    }
    //console.log(query);

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
    location.innerHTML = `${response.name}, ${response.sys["country"]} `;
    temperature.innerHTML = `${(response.main["temp"]).toString().slice(0,2)}°F`; //truncate decimal part
    displayWeatherIcon();

}

function displayWeatherIcon() {
	//https://openweathermap.org/weather-conditions
	 //weatherIcon.innerHTML = `<img src="http://openweathermap.org/img/w/${response.weather[0].icon}.png" alt="Weather Icon"/>`;
     //mapping openweather weather to icons https://erikflowers.github.io/weather-icons/api-list.html
     weatherIcon.innerHTML = `<i class="wi wi-owm-${response.weather[0].id}"></i>`

}
