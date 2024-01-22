// Actualisation fond d'écran et cadran synopsis

const DATA_MOVIES_IMAGES = [
  { title: "Castle in the Sky", image: "images/laputa036.jpg" },
  { title: "Grave of the Fireflies", image: "images/thumbravefi.jpeg" },
  { title: "My Neighbor Totoro", image: "images/totoro025.jpg" },
  { title: "Kiki's Delivery Service", image: "images/majo002.jpg" },
  { title: "Only Yesterday", image: "images/omoide026.jpg" },
  { title: "Porco Rosso", image: "images/porco007.jpg" },
  { title: "Pom Poko", image: "images/tanuki035.jpg" },
  { title: "Whisper of the Heart", image: "images/mimi033.jpg" },
  { title: "Princess Mononoke", image: "images/mononoke010.jpg" },
  { title: "My Neighbors the Yamadas", image: "images/yamada004.jpg" },
  { title: "Spirited Away", image: "images/chihiro043.jpg" },
  { title: "The Cat Returns", image: "images/baron022.jpg" },
  { title: "Howl's Moving Castle", image: "images/howl011.jpg" },
  { title: "Tales from Earthsea", image: "images/ged020.jpg" },
  { title: "Ponyo", image: "images/ponyo038.jpg" },
  { title: "Arrietty", image: "images/karigurashi001.jpg" },
  { title: "From Up on Poppy Hill", image: "images/kokurikozaka049.jpg" },
  { title: "The Wind Rises", image: "images/kaze1.jpg" },
  {
    title: "The Tale of the Princess Kaguya",
    image: "images/kaguyahime004.jpg",
  },
  { title: "When Marnie Was There", image: "images/marnie021.jpg" },
  { title: "The Red Turtle", image: "images/redturtle021.jpg" },
  { title: "Earwig and the Witch", image: "images/aya003.jpg" },
];

let previousNumber = null;
let randomIndex = null;
let response = null
let data = null
let currentCard = null;

const app = document.getElementById("movieDatas");
fetchAndPopulateLocalStorageWithMovies()

function fetchAndPopulateLocalStorageWithMovies() {
  return fetch("https://ghibliapi.vercel.app/films").then(resp => resp.json()).then((data) => {
    localStorage.setItem("movies", JSON.stringify(data));
  });
}

async function fetchData() {
  try {
      if (!localStorage.getItem("movies")) {
          await fetchAndPopulateLocalStorageWithMovies();
      }

      const resp = localStorage.getItem("movies");
      data = JSON.parse(resp);

      response = response || await fetch("https://ghibliapi.vercel.app/films");
      data = data || await response.json();

    if (response.ok) {
      do {
        randomIndex = Math.floor(Math.random() * data.length);
      } while (previousNumber === randomIndex);

      previousNumber = randomIndex;

      const randomMovie = data[randomIndex];
      const matchingImage = DATA_MOVIES_IMAGES.find(
        (movie) => movie.title === randomMovie.title
      );

      if (matchingImage) {
        const card = createCard(randomMovie);
        app.appendChild(card);
        document.body.style.backgroundImage = `url(${matchingImage.image})`;
        currentCard = card;
      } else {
        throw new Error(
          "Matching image not found for title:",
          randomMovie.title
        );
      }
    } else {
      throw new Error("Network response was not ok.");
    }
  } catch (error) {
    showError(`Gah, it's not working! ${error.message}`);
    console.error(error);
}
}

function createCard(movie) {
  const card = document.createElement("div");
  card.setAttribute("class", "box");

  const h1 = document.createElement("h1");
  h1.textContent = movie.title;

  const p = document.createElement("p");
  p.textContent = `${movie.description}...`;

  const googleSearchLink = document.createElement("a");
  googleSearchLink.setAttribute(
    "href",
    `https://www.google.com/search?q=${movie.title}`
  );
  googleSearchLink.setAttribute("target", "_blank");
  googleSearchLink.textContent = `See more`;
  googleSearchLink.classList.add("search-button"); // Ajoutez cette ligne pour ajouter une classe
  googleSearchLink.style.position = "absolute";
  googleSearchLink.style.bottom = "0";
  googleSearchLink.style.right = "5px";
  googleSearchLink.style.color = "white";

  h1.addEventListener("click", function () {
    p.style.display = p.style.display === "none" ? "block" : "none";
    h1.style.paddingRight = "75px";
  });

  card.appendChild(h1);
  card.appendChild(p);
  card.appendChild(googleSearchLink);

  return card;
}

function showError(message) {
  const errorMessage = document.createElement("marque");
  errorMessage.textContent = message;
  app.appendChild(errorMessage);
}

fetchData();

// Bouton changement de fond d'écran

document
  .getElementById("changeBackground")
  .addEventListener("click", function () {
    if (currentCard) {
      app.removeChild(currentCard);
    }
    fetchData();
  });

//Automatisation Date

const date = document.getElementById("date");
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

const today = new Date();

const weekDays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const allMonths = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

date.innerHTML = today.getDate() + " " + allMonths[today.getMonth()];
// day.innerHTML= weekDays[today.getDay()];
// month.innerHTML = allMonths[today.getMonth()];
year.innerHTML = today.getFullYear();

//Automatisation Horloge

let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");

setInterval(() => {
  let currentTime = new Date();

  // Ajouter une fonction pour formater les nombres avec des zéros devant si nécessaire
  const formatNumber = (num) => (num < 10 ? "0" + num : num);

  hrs.innerHTML = formatNumber(currentTime.getHours());
  min.innerHTML = formatNumber(currentTime.getMinutes());
  sec.innerHTML = formatNumber(currentTime.getSeconds());
}, 1000);

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
  } else {
    var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
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

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display = "none";
  }
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

// To Do list

const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
  if (inputBox.value === "") {
    alert("you've always something to do, add it!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData(); // à chaque fois que l'on rajoute une task, ça sauvegarde
}

const element = document.getElementById("myBtn");
element.addEventListener("click", addTask);

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("checked");
      saveData();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
    }
  },
  false
);

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
}
showTask();

//Bouton lecteur Audio

document.addEventListener("DOMContentLoaded", function () {
  const audioPlayer = document.getElementById("audioPlayer");
  const playButton = document.getElementById("playButton");

  playButton.addEventListener("click", function () {
    if (audioPlayer.paused) {
      audioPlayer.play();
    } else {
      audioPlayer.pause();
    }
  });

  audioPlayer.addEventListener("play", function () {
    audioPlayer.style.display = "block";
    playButton.style.display = "none";
  });

  audioPlayer.addEventListener("pause", function () {
    audioPlayer.style.display = "none";
    playButton.style.display = "block";
  });
});

// Event listener pour la touche 'Entrer'
document.addEventListener('keydown', (event) => {
  if (inputBox.value && event.key=== 'Enter') {
      addTask();
  }
}); 

// Event listener pour la touche 'Entrer'
document.addEventListener('keydown', (event) => {
  if (searchBox.value && event.key=== 'Enter') {
      checkWeatherByCity(searchBox.value);
  }
});
