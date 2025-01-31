
const app = document.querySelector('.weather-app');
const temp = document.querySelector('.temp');
const dateOutput = document.querySelector('.date');
const timeOutput = document.querySelector('.time');
const conditionOutput = document.querySelector('.condition');
const nameOutput = document.querySelector('.name');
const icon = document.querySelector('.icon');
const cloudOutput = document.querySelector('.cloud');
const humidityOutput = document.querySelector('.humidity');
const windOutput = document.querySelector('.wind');
const form = document.getElementById('locationInput');
const search = document.querySelector('.search');
const btn = document.querySelector('.submit');
const cities = document.querySelectorAll('.city');

let cityInput = "London";
let apiKey = 'eac3232e886340578bc205914253001';
let apiEndpoint = 'http://api.weatherapi.com/v1/current.json';

cities.forEach((city) => {
  city.addEventListener('click', (e) => {
    cityInput = e.target.innerHTML;
    fetchWeatherData();
    app.style.opacity = "0"
  });
})

form.addEventListener('submit', (e) => {
  if(search.value.length == 0) {
    alert('Please type in a city name');
  } else {
    cityInput = search.value;
    fetchWeatherData();
    search.value = "";
    app.style.opacity = "0";
  }
  e.preventDefault();
});

function dayOfTheWeek(day, month, year) {
  const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  return weekday[new Date(`${day}/${month}/${year}`).getDay()];
};

function fetchWeatherData() {
  let url = `${apiEndpoint}?key=${apiKey}&q=${cityInput}`;
  fetch(url)
  .then(response => response.json())
  .then(data => {
    console.log(data);
    temp.innerHTML = data.current.temp_c + "&#176;";
    conditionOutput.innerHTML = data.current.condition.text;
    const date = data.location.localtime;
    const y = parseInt(date.substr(0,4));
    const m = parseInt(date.substr(5, 2));
    const d = parseInt(date.substr(8, 2));
    const time = date.substr(11);
    dateOutput.innerHTML = `${dayOfTheWeek(d, m, y)} ${d}, ${m} ${y}`;
    timeOutput.innerHTML = time;
    nameOutput.innerHTML = data.location.name;
    const iconId = data.current.condition.icon.substr("//cdn.weatherapi.com/weather/64x64/".length);
    icon.src = `https://cdn.weatherapi.com/weather/64x64/${iconId}`;
    cloudOutput.innerHTML = data.current.cloud + "%";
    humidityOutput.innerHTML = data.current.humidity + "%";
    windOutput.innerHTML = data.current.wind_kph + "km/h"

    let timeOfDay = "day";
    const code = data.current.condition.code;
    const temperature = data.current.temp_c;

    if(!data.current.is_day) {
      timeOfDay = "night";
    }

    if(temperature < 0) {
      app.style.backgroundImage = `url(./images/${timeOfDay}/snowy.jpg)`;
      btn.style.background = "#4d72aa";
      if(timeOfDay == "night") {
        btn.style.background = "#1b1b1b";
      }
    } else if(temperature < 15) {
      app.style.backgroundImage = `url(./images/${timeOfDay}/rain.jpg)`;
      btn.style.background = "#647d75";
      if(timeOfDay == "night") {
        btn.style.background = "#325c80";
      }
    } else if(temperature < 25) {
      app.style.backgroundImage = `url(./images/${timeOfDay}/cloudy.jpg)`;
      btn.style.background = "#fa6d1b";
      if(timeOfDay == "night") {
        btn.style.background = "#181e27";
      }
    } else {
      app.style.backgroundImage = `url(./images/${timeOfDay}/clear.jpg)`;
      btn.style.background = "#e5ba92";
      if(timeOfDay == "night") {
        btn.style.background = "#181e27";
      }
    }

    app.style.opacity = "1";
  })
  .catch(() => {
    alert('city not found ,please try again');
    app.style.opacity = "1"
  });
}

fetchWeatherData();
app.style.opacity = "1";
