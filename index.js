// Weather app

const button = document.querySelector(".submit");
const input = document.querySelector("input");
const message = document.querySelector(".message");
const city = document.querySelector(".cityName");
const temp = document.querySelector(".temperature");
const img = document.createElement("img");
const wind = document.querySelector(".windSpeed");
const description = document.querySelector(".descriptionClouds");
const sunsetSunrise = document.querySelector(".sunsetSunrise");

const visibility = document.querySelector(".visibility");
// Function for optional task num 8

let map;
let latitude;
let longitude;

function initMap(latitude, longitude) {
  map = new google.maps.Map(document.getElementById("mapContainer"), {
    center: { lat: latitude, lng: longitude },
    zoom: 13,
  });
}

function printWeather(data) {
  // The chosen name
  city.innerHTML = data.name;
  // Tepmerature
  const roundTemperature = Math.round(data.main.temp);
  temp.innerHTML = ` ${roundTemperature} °`;
  // Icon for the weather type
  img.src = `
     https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png
     `;
  document.querySelector(".mainContainer").appendChild(img);
  // Wind speed
  wind.innerHTML = `Wind speed: ${data.wind.speed}`;
  //How clowdy it is
  description.innerHTML = data.weather[0].description;
  // When sunrise and sunset is
  // For sunrise
  const unixTimeSunrise = data.sys.sunrise;
  const milisecondsSunrise = unixTimeSunrise * 1000;
  const dateObjectSunrise = new Date(milisecondsSunrise);
  const humanFormatSunrise = dateObjectSunrise.toLocaleString("de-DE", {
    hour: "numeric",
    minute: "numeric",
  });

  // For sunset
  const unixTimeSunset = data.sys.sunset;
  const milisecondsSunset = unixTimeSunset * 1000;
  const dateObjectSunset = new Date(milisecondsSunset);
  const humanformatSunset = dateObjectSunset.toLocaleString("de-DE", {
    hour: "numeric",
    minute: "numeric",
  });

  sunsetSunrise.innerHTML = ` Sunrise at : ${humanFormatSunrise} and sunset at : ${humanformatSunset}`;

  // My feature : i add visibility
  visibility.innerHTML = `Visibility: ${data.visibility / 1000} km`;
}

button.addEventListener("click", () => {
  if (input.value === "") {
    message.innerHTML = "Remember to write city!";
  } else {
    message.innerHTML = "";
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=141f299896d9c32c851d3c2c2311a11e&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        printWeather(data);
        // Optional a map showing where the city is located
        initMap(data.coord.lat, data.coord.lon);
      });
  }
});

// Use my current position optional

const buttonCurrentPosition = document.getElementById("currentPosition");

buttonCurrentPosition.addEventListener("click", function () {
  navigator.geolocation.getCurrentPosition(function (geolocationPosition) {
    const longitudeTwo = geolocationPosition.coords.longitude;
    const latitudeTwo = geolocationPosition.coords.latitude;
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${latitudeTwo}&lon=${longitudeTwo}&appid=141f299896d9c32c851d3c2c2311a11e&units=metric`
    )
      .then((response) => response.json())
      .then((data) => {
        printWeather(data);
        initMap(latitudeTwo, longitudeTwo);
      });
  });
});
