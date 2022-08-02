let time = new Date();
var hour = time.getHours();
var minutes = time.getMinutes();
if (minutes < 10) {
  minutes = "0" + minutes;
} else {
  minutes = minutes;
}

var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var day = days[time.getDay()];

function showTime() {
  return day + ", " + hour + ":" + minutes;
}

let placeTime = document.querySelector(".currentTime");
placeTime.innerHTML = showTime(time);

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
