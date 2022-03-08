let currentTime = new Date();
function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];

  let currentDay = days[date.getDay()];
  let hour = date.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minute = date.getMinutes();
  if (minute < 10) {
    minute = `0${minute}`;
  }

  return `${currentDay} ${hour}:${minute}`;
}

function lookUp(event) {
  event.preventDefault();
  let cityElement = document.querySelector("#city-name");
  let cityInput = document.querySelector("#input");
  cityElement.innerHTML = cityInput.value;
}



let search = document.querySelector(".search");
search.addEventListener("submit", lookUp);

let date = document.querySelector("#date");
date.innerHTML = formatDate(currentTime);



function showTemperature(response) {
  let currentLocation = document.querySelector("#city-name");
  currentLocation.innerHTML = response.data.name;
  let currentTemperature = Math.round(response.data.main.temp);
  let currentWeather = document.querySelector("#temperature-element");
  currentWeather.innerHTML = `Currently ${currentTemperature}°C`;
  let currentDescription = response.data.weather[0].description;
  let localDescription = document.querySelector("#local-description");
  localDescription.innerHTML = `${currentDescription}`;
}
function showWeather(yourLocation) {
  let apiKey = "1a818352d138428def49a8bbe9fafa1c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${yourLocation}`;
  axios.get(`${apiUrl}&units=metric&appid=${apiKey}`).then(showTemperature);
}
function returnLocation(event) {
  event.preventDefault();
  let yourLocation = document.querySelector("#your-location").value;
  let currentLocation = document.querySelector("#current-location");
  currentLocation.innerHTML = `${yourLocation}`;
  showWeather(yourLocation);
}
let choosingLocation = document.querySelector("#location-form");
choosingLocation.addEventListener("submit", returnLocation);

function showTemp(response) {
    let apiKey = "1a818352d138428def49a8bbe9fafa1c";
    let apiUrl ="https://api.openweathermap.org/data/2.5/weather?q=";
    let temperature = Math.round(response.data.main.temp);
    let temperatureElement = document.querySelector("#temperature-element");
  temperatureElement.innerHTML = `${temperature}`;
axios.get(`${apiUrl}&appid=${apiKey}`).then(showTemp);}

function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "1a818352d138428def49a8bbe9fafa1c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemp);
}

function findGeolocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", findGeolocation);

