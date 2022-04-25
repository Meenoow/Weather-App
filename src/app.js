function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
  
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
  
    return `${day} ${hours}:${minutes}`;
  }
  
  function searchLocation(position) {
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    let units ="metric";
    let apiKey = "0d55405ea37f9b16a55f03b2fb1326a2";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=
    ${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;
    axios.get(apiUrl).then(displayWeather);
  }
  
  function getCurrentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  function init(city) {
    let apiKey = "0d55405ea37f9b16a55f03b2fb1326a2";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=
   ${city}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayWeather);
  }
  
  function search(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    init(city);
  }

  function showFahrenheitTemp(event) {
    event.preventDefault();
    let fahrenheitTemperature = (celsiusTemperature * 9) /5 + 32;
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
  }

  let fahrenheitLink = document.querySelector("#fahrenheit-link");
  fahrenheitLink.addEventListener("click", showFahrenheitTemp);
  
  function convertToCelsius(event) {
    event.preventDefault();
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = 13;
  }

  function showCelsiusTemp(event) {
   event.preventDefault();
   let temperatureElement = document.querySelector("#temperature");
   temperatureElement.innerHTML = Math.round(celsiusTemperature);
  }
  
  let celsiusLink = document.querySelector("#celsius-link");
  celsiusLink.addEventListener("click", showCelsiusTemp);

let celsiusTemperature = null

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
forecast.forEach(function(forecastDay, index) {
  if (index <6) {
  forecastHTML = 
forecastHTML + 
`
<div class="col-2"> 
  <div class="weather-forecast-date">${formatDay
    (forecastDay.dt)}</div>
    <img 
    src="http://openweathermap.org/img/wn/${forecastDay.weather
    [0].icon}@2x.png"
    alt=""
    width="36"/>
    <br>
    <div class="weather-forecast-temp">
      <span clas="weather-forecast-temp-max">${Math.round(forecastDay.temp.max)}˚</span> 
      <span class="weather-forecast-temp-min">${Math.round(forecastDay.temp.min)}˚ </span>
  </div>
</div>
`;}
});

forecastHTML = forecastHTML + `</div>`;
forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "0d55405ea37f9b16a55f03b2fb1326a2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", search);

  function displayWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
      celsiusTemperature
    );
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#wind").innerHTML = Math.round(
      response.data.wind.speed
    );
    document.querySelector("#description").innerHTML = response.data.weather[0].description;

    let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);

  
  celsiusTemperature = response.data.main.temp;
  getForecast(response.data.coord);
  }

  let currentLocationButton = document.querySelector("#current-location-button");
  currentLocationButton.addEventListener("click", getCurrentLocation);

  init("New York");
  displayForecast();
  
  