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

let date = document.querySelector("#date");
date.innerHTML = formatDate(currentTime);

function showTemperature(response) {
  let currentLocation = document.querySelector("#city-name");
  currentLocation.innerHTML = response.data.name;
  let currentTemperature = Math.round(response.data.main.temp);
  let currentWeather = document.querySelector("#temperature-element");
  currentWeather.innerHTML = `Currently ${currentTemperature}°C`;
}
function showWeather(currentLocation) {
  let apiKey = "1a818352d138428def49a8bbe9fafa1c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${currentLocation}`;
  console.log(`${apiUrl}&units=metric&appid=${apiKey}`);
  axios.get(`${apiUrl}&units=metric&appid=${apiKey}`).then(showTemperature);
}
function returnLocation(event) {
  event.preventDefault();
  let yourLocation = document.querySelector("#input").value;
  let currentLocation = document.querySelector("#city-name");
  currentLocation.innerHTML = `${yourLocation}`;
  showWeather(yourLocation);
}
let choosingLocation = document.querySelector("#search");
choosingLocation.addEventListener("submit", returnLocation);

function showPosition(position) {
  let longitude = position.coords.longitude;
  let latitude = position.coords.latitude;
  let apiKey = "1a818352d138428def49a8bbe9fafa1c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
  console.log(apiUrl);

  axios.get(apiUrl).then(showTemperature);
}

function findGeolocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}
let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", findGeolocation);


