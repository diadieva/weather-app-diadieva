let now = new Date();
let currentTime = document.querySelector("#date");

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
  "December"
];

let month = months[now.getMonth()];

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let day = days[now.getDay()];

let monthDayNumber = now.getDate();
if (monthDayNumber < 10) {
  monthDayNumber = `0${monthDayNumber}`;
}

let hours = now.getHours();
if (hours < 10) {
  hours = `0${hours}`;
}

let minutes = now.getMinutes();
if (minutes < 10) {
  minutes = `0${minutes}`;
}
let time = document.querySelector("h3");
time.innerHTML = `${day} ${monthDayNumber} ${month}, ${hours}:${minutes}`;

function showWeather(response) {
  let city = response.data.name;
  let cityElement = document.querySelector("#location");
  cityElement.innerHTML = city;
  let temperature = Math.round(response.data.main.temp);
  let tempElement = document.querySelector("#temperatureNumber");
  tempElement.innerHTML = temperature;
  let humidity = response.data.main.humidity;
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = humidity;
  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = wind;
  let description = response.data.weather[0].main;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = description;
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
