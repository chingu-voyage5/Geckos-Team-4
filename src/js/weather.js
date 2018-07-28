console.log(`weather module loaded`);

const defaultCities = [`Miami, FL`, `New York, NY`, `Los Angeles, CA`, `Chicago, IL`, `Seattle, WA`];
const daysOfWeek = [`Sunday`, `Monday`, `Tuesday`, `Wednesday`, `Thursday`, `Friday`, `Saturday`];
const numberOfDays = 5;
// CURRENT WEATHER
const location = document.querySelector('.location');
const weather = document.querySelector('.weather');
const temperature = document.getElementById('temperature');
const weatherIcon = document.getElementById('weatherIcon');

// WEATHER FORECAST POPUP
const weatherPopup = document.querySelector('.weatherPopup');
const loc = document.getElementById('loc');
const tempUnit = document.getElementById('tempUnit');
const tempC = document.getElementById('tempC');
const tempF = document.getElementById('tempF');
const fullDayName = document.getElementById('fullDayName');
const desc = document.getElementById('desc');
const wIcon = document.getElementById('wIcon');
const temp = document.getElementById('temp');
const days = document.getElementById('days');

const body = document.querySelector('body');


const yahooApiServer = `https://query.yahooapis.com/v1/public/yql`; //For forecast use Yahoo Weather API
const yahooSelect = `select * from weather.forecast where woeid in (SELECT woeid FROM geo.places WHERE text=`;
let currentWeather;
let response;
let forecastList = [];
let tUnit="F";

export function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeather, error);
    } else {
        location.innerHTML = `Geolocation is not supported by this browser.`;
    }
}

function error(){
    let city = defaultCities[(Math.floor(Math.random() * (defaultCities.length)))];
    getWeather(null, city)

}

function getWeather(position, city=null) {

    let query;

    if(position){
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        query = `${yahooApiServer}?q=${yahooSelect}"(${lat},${lon})")&format=json`;
    }
    else {
        query = `${yahooApiServer}?q=${yahooSelect}"${city}")&format=json`;
    }


    // Weather Fetch
    fetch(query).then(function(resp) {
        return resp.json();
    }).then(function(respo){
        response = respo;
        processWeather();
    });
}


function processWeather(){

    currentWeather = response.query.results.channel.item.condition;
    location.innerHTML = response.query.results.channel.location.city.toUpperCase();
    temperature.innerHTML = `${currentWeather.temp}°` ; //truncate decimal part
    weatherIcon.innerHTML = `<i class="wi wi-yahoo-${currentWeather.code}"></i>`;

    let forecasts = response.query.results.channel.item.forecast;
    for(let day = 0; day < 5; day++){
        forecastList.push([forecasts[day].day, forecasts[day].code,
            {F: forecasts[day].high, C: FtoC(forecasts[day].high)},
            {F: forecasts[day].low, C: FtoC(forecasts[day].low)}, forecasts[day].text]);
    }

    fillForecastDays();

}

function getDayFromArray(day){
    for(let i = 0; i < daysOfWeek.length; i++){
        if(daysOfWeek[i].startsWith(day)){
            return daysOfWeek[i];
        }
    }
}

const FtoC = (tempf) => ((tempf - 32)/1.8).toString().slice(0,2);

function fillForecastDays(){
    for(let i = 0; i < numberOfDays; i++){
        let dayId = `day${i}`;
        let dayDiv = document.getElementById(dayId);
        let dayName = forecastList[i][0].toUpperCase();
        let dayIcon = forecastList[i][1];
        let dayHigh = forecastList[i][2][tUnit];
        let dayLow = forecastList[i][3][tUnit];

        dayDiv.innerHTML = `${dayName}<div><span class="prominent"><i class="wi wi-yahoo-${dayIcon}"></i> ${dayHigh}°</span> ${dayLow}°</div>`;
    }

}

weather.addEventListener("click",function(event){
    console.log("weather clicked");
    if(event.target.classList.contains("weatherPopup") == false){
        event.stopPropagation(); //to avoid event propagation to <body> element
        loc.innerHTML = response.query.results.channel.location.city;
        desc.innerHTML = currentWeather.text;
        wIcon.innerHTML = `<i class="wi wi-yahoo-${currentWeather.code}"></i>`;
        temp.innerHTML = `${(tUnit == "F") ? currentWeather.temp : FtoC(currentWeather.temp)}°`;
        weatherPopup.classList.add("show");

    }
});

body.addEventListener("click", function(event){
    if(weatherPopup.classList.contains("show")){
        weatherPopup.classList.remove("show");
    }
});

tempUnit.addEventListener("click", function(event){
    if(event.target.id == "tempC"){
        tempC.classList.add("prominent");
        tempF.classList.remove("prominent");
        tUnit = "C";
        temperature.innerHTML = `${FtoC(currentWeather.temp)}°` ;
        fillForecastDays();
        console.log(temp.innerHTML);
        temp.innerHTML = `${FtoC(currentWeather.temp)}°`;
        console.log(temp.innerHTML);

    }
    else if(event.target.id == "tempF"){
        tempF.classList.add("prominent");
        tempC.classList.remove("prominent");
        tUnit = "F";
        fillForecastDays();
        temp.innerHTML = `${currentWeather.temp}°`;
    }
    event.stopPropagation();
});


for(let i = 0; i < numberOfDays; i++){
    let dayId = `day${i}`;
    let dayDiv = document.getElementById(dayId);
    dayDiv.addEventListener("click",(function(index){
        return function(event){
            loc.innerHTML = `${response.query.results.channel.location.city} <span id="fullDayName">${getDayFromArray(forecastList[index][0])}</span>`;
            desc.innerHTML = forecastList[index][4];
            wIcon.innerHTML = `<i class="wi wi-yahoo-${forecastList[index][1]}"></i>`;
            temp.innerHTML = `<span>${forecastList[index][2][tUnit]}°<span id="templow"> ${forecastList[index][3][tUnit]}°</span></span>`;
            event.stopPropagation();  //to avoid event propagation to weather popup
        };
    })(i));
}
