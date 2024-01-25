// Météo

const apiKey = "205fe95868c98ce3ff001e304e78b5cf";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; //unités = métrique

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeatherByCity(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
    setTimeout(() => {
      document.querySelector(".error").style.display = "none";
    }, 3000); // Cela masquera le message d'erreur après 3 secondes
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "images/mist.png";
    }
  }
  searchBox.value = "";//non fonctionnel, tentative de clear l'input après recherche

}

async function checkWeatherByLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      const response = await fetch(
        `${apiUrl}&lat=${latitude}&lon=${longitude}&appid=${apiKey}`
      );
      handleWeatherResponse(response);
    }, showError);
  } else {
    showError("Geolocation is not supported by this browser.");
  }
}

function showError(message) {
  document.querySelector(".error").innerHTML = message;
  document.querySelector(".error").style.display = "block";
  document.querySelector(".weather").style.display = "none";
}

async function handleWeatherResponse(response) {
  if (response.status == 404) {
    showError("City not found");
  } else {
    try {
      const data = await response.json();

      document.querySelector(".city").innerHTML = data.name;
      document.querySelector(".temp").innerHTML =
        Math.round(data.main.temp) + "°c";

      if (data.weather[0].main == "Clouds") {
        weatherIcon.src = "images/clouds.png";
      } else if (data.weather[0].main == "Clear") {
        weatherIcon.src = "images/clear.png";
      } else if (data.weather[0].main == "Rain") {
        weatherIcon.src = "images/rain.png";
      } else if (data.weather[0].main == "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
      } else if (data.weather[0].main == "Mist") {
        weatherIcon.src = "images/mist.png";
      }

      document.querySelector(".weather").style.display = "block";
      document.querySelector(".error").style.display = "none";
    } catch (error) {
      console.error("Error parsing JSON:", error);
      showError("Error fetching weather data");
    }
  }
}

checkWeatherByLocation();

searchBtn.addEventListener("click", () => {
  checkWeatherByCity(searchBox.value);
});

// Event listener pour la touche 'Entrer'
document.addEventListener('keydown', (event) => {
  if (searchBox.value && event.key=== 'Enter') {
      checkWeatherByCity(searchBox.value);
  }
});
