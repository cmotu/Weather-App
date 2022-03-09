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
  currentWeather.innerHTML = `${currentTemperature}`;
  let descriptionElement=document.querySelector("#description");
  descriptionElement.innerHTML=response.data.weather[0].description;
  let humidityElement=document.querySelector("#humidity");
  humidityElement.innerHTML=response.data.main.humidity;
  let windElement=document.querySelector("#wind");
  windElement.innerHTML=Math.round(response.data.wind.speed);
  let iconElement=document.querySelector("#icon");
  iconElement.setAttribute("src", 
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute(
    "alt", response.data.weather[0].description);
  
  celsiusTemperature=response.data.main.temp;
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

function showFahrenheit(event){
  event.preventDefault();
  let fahrenheitTemperature=(celsiusTemperature * 9) / 5 + 32;
  let temperatureElement=document.querySelector("#temperature-element");
  temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
}

function showCelsius(event){
  event.preventDefault();
  let temperatureElement=document.querySelector("#temperature-element");
  temperatureElement.innerHTML=Math.round(celsiusTemperature);
fahrenheitLink.classList.remove("active");
celsiusLink.classList.add("active");
}

let celsiusTemperature= null;

let celsiusLink=document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);