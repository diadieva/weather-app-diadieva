function formatDate(timestamp) {
let date = new Date(timestamp);
let hours = date.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}
let minutes = date.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[date.getDay()];
return `${day} ${hours}:${minutes}`;
}
function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(
            forecastDay.temp.max
          )}° </span>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "67463d90019f3c15672ebddc2b82fac3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

let currentTime = document.querySelector("#date");





let monthDayNumber = date.getDate();
if (monthDayNumber < 10) {
  monthDayNumber = `0${monthDayNumber}`;
}


let time = document.querySelector("h3");
time.innerHTML = `${day} ${monthDayNumber} ${month}, ${hours}:${minutes}`;

function displayTemperature(response) {
  let temperatureElement = document.querySelector("#temperature");
  let cityElement = document.querySelector("#city");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let dateElement = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
}
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#inputSearch").value;

  if (city) {
    searchCity(city);
  } else {
    city = null;
    alert("Please type a city");
  }
}
let searchForm = document.querySelector("#searchThings");
searchForm.addEventListener("submit", handleSubmit);

function findLocation(position) {
  let apiKey = "67463d90019f3c15672ebddc2b82fac3";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}
function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(findLocation);
}

let currentLocationButton = document.querySelector("#locationButton");
currentLocationButton.addEventListener("click", currentLocation);

function searchCity(city) {
  let apiKey = "67463d90019f3c15672ebddc2b82fac3";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
  //console.log(apiUrl);
  axios.get(apiUrl).then(showWeather);
}
searchCity("Kyiv");

function temperatureFah(event) {
  event.preventDefault();

  let tempCel = document.querySelector("#temperatureNumber");
  let currentTemp = 36;
  let tempFah = Math.round(currentTemp * 1.8 + 32);
  tempCel.innerHTML = tempFah;
}

function temperatureCel(event) {
  event.preventDefault();

  let tempCel = document.querySelector("#temperatureNumber");
  let currentTemp = 36;
  tempCel.innerHTML = currentTemp;
}

let tempFah = document.querySelector("#fahrenheit");
tempFah.addEventListener("click", temperatureFah);
let tempCel = document.querySelector("#celsius");
tempCel.addEventListener("click", temperatureCel);