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

function getForecast(coordinates){
  let apiKey = "1a818352d138428def49a8bbe9fafa1c";
let apiUrl=`https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayForecast);
}


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
  iconElement.setAttribute(
  "src", 
  `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
  iconElement.setAttribute(
    "alt", response.data.weather[0].description);
  
  celsiusTemperature=response.data.main.temp;
getForecast(response.data.coord);
  
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
  

  axios.get(apiUrl).then(showTemperature);
}

function findGeolocation() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentButton = document.querySelector("#current-button");
currentButton.addEventListener("click", findGeolocation);

function showFahrenheit(event){
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let fahrenheitTemperature=(celsiusTemperature * 9) / 5 + 32;
  let temperatureElement=document.querySelector("#temperature-element");
  temperatureElement.innerHTML=Math.round(fahrenheitTemperature);
  
}

function showCelsius(event){
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement=document.querySelector("#temperature-element");
  temperatureElement.innerHTML=Math.round(celsiusTemperature);


}

let celsiusTemperature= null;

let celsiusLink=document.querySelector("#celsius");
celsiusLink.addEventListener("click", showCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", showFahrenheit);


function formatDay(timestamp){
let date=new Date(timestamp * 1000);
let day=date.getDay();
let days=["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
return days[day];
}
function displayForecast(response){
  let forecast=response.data.daily;
  let forecastElement=document.querySelector("#forecast");
let forecastHTML=`<div class="row">`;

forecast.forEach(function(forecastDay, index) {
  if (index <4){
forecastHTML=
   forecastHTML + 
   `<div class="col">
                    <div class="weather-forecast-date">
                     ${formatDay(forecastDay.dt)}</div>
                    <img src="https://openweathermap.org/img/wn/${forecastDay.weather[0].icon}@2x.png" width="50" alt="">
                    <div class="weather-forecast-temperature">
                    <span class="weather-forecast-temperature-max">
                    ${Math.round(forecastDay.temp.max)}°
                </span><span class="weather-forecast-temperature-min">
                    ${Math.round(forecastDay.temp.min)}°</span>
                
                </div>
            </div>`;

  }
})


forecastHTML= forecastHTML+`</div>`;
forecastElement.innerHTML=forecastHTML;}


  
  
