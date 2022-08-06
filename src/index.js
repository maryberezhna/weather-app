let time = new Date();
let hour = time.getHours();
let minutes = time.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
} else {
  minutes = minutes;
}

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[time.getDay()];

function showTime() {
  return day + ", " + hour + ":" + minutes;
}

let placeTime = document.querySelector(".currentTime");
placeTime.innerHTML = showTime(time);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function showForecast(response) {
  let forecast = response.data.daily;
  console.log(forecast);
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = "";

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        ` <div class="col m-1 forecast-item">
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
      </div> `;
    }
  });
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastElement);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiUrlForecast = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={part}&appid=${apiKey}&units=metric`;
  axios.get(apiUrlForecast).then(showForecast);
}

function showTemperatura(response) {
  let temperature = Math.round(response.data.main.temp);
  let degree = document.querySelector("#temperatura");
  let cityupdated = document.querySelector("#city");
  let humidity = document.querySelector("#humudity-percent");
  let weatherIcon = document.querySelector("#weather-icon");
  let temperaturaDesc = document.querySelector("#temperatura-description");
  let wind = document.querySelector("#wind-speed");

  celciusDegree = response.data.main.temp;

  temperaturaDesc.innerHTML = ", " + response.data.weather[0].description;
  humidity.innerHTML = response.data.main.humidity + "%";
  degree.innerHTML = temperature;
  wind.innerHTML = Math.round(response.data.wind.speed) + " km/h";
  cityupdated.innerHTML = response.data.name;
  weatherIcon.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function showTemperaturaFarenheit(event) {
  event.preventDefault();
  let farenheitTempDegree = celciusDegree * 1.8 + 32;
  let degree = document.querySelector("#temperatura");
  degree.innerHTML = Math.round(farenheitTempDegree);
  celciusTemp.classList.remove("active");
  farenheitTemp.classList.add("active");
}

function showTemperaturaCelcius(event) {
  event.preventDefault();
  let degree = document.querySelector("#temperatura");
  degree.innerHTML = Math.round(celciusDegree);
  farenheitTemp.classList.remove("active");
  celciusTemp.classList.add("active");
}

let celciusDegree = null;

let farenheitTemp = document.querySelector("#farenheit");
farenheitTemp.addEventListener("click", showTemperaturaFarenheit);

let celciusTemp = document.querySelector("#celcius");
celciusTemp.addEventListener("click", showTemperaturaCelcius);

let apiKey = "a3b94ee5a0cbfd0dbf31cf8132624cce";
let units = "metric";
let apiUrl = "https://api.openweathermap.org/data/2.5/weather";

let form = document.querySelector("#form");
let submitButton = document.querySelector("#submit-button");

function changeCity(event) {
  event.preventDefault();
  let search = document.querySelector("#input");
  let city = document.querySelector("#city");
  city = search.value.toLowerCase();
  console.log(city);
  axios
    .get(apiUrl, {
      params: {
        q: city,
        appid: apiKey,
        units,
      },
    })
    .then(showTemperatura);
}

form.addEventListener("submit", changeCity);
submitButton.addEventListener("click", changeCity);

function knowLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showTemperatura);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(knowLocation);
  let loader = document.querySelector(".city strong");
  loader.classList.add("loader");
}

window.addEventListener("load", getCurrentPosition);
let buttonLocation = document.querySelector("#button");
buttonLocation.addEventListener("click", getCurrentPosition);
