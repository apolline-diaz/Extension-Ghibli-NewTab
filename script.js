// Actualisation fond d'écran et cadran synopsis

const dataMoviesImages = [
    { title : "Castle in the Sky", image : "images/laputa036.jpg" },
    { title : "Grave of the Fireflies", image : "images/thumbravefi.jpeg" },
    { title : "My Neighbor Totoro", image : "images/totoro025.jpg" },
    { title : "Kiki\'s Delivery Service", image : "images/majo002.jpg" },
    { title : "Only Yesterday", image : "images/omoide026.jpg" },
    { title : "Porco Rosso", image : "images/porco007.jpg" },
    { title : "Pom Poko", image : "images/tanuki035.jpg" },
    { title : "Whisper of the Heart", image : "images/mimi033.jpg" },
    { title : "Princess Mononoke", image : "images/mononoke010.jpg" },
    { title : "My Neighbors the Yamadas", image : "images/yamada004.jpg" },
    { title : "Spirited Away", image : "images/chiriro008.jpg" },
    { title : "The Cat Returns", image : "images/baron022.jpg" },
    { title : "Howl\'s Moving Castle", image : "images/howl011.jpg" },
    { title : "Tales from Earthsea", image : "images/ged020.jpg" },
    { title : "Ponyo", image : "images/ponyo038.jpg" },
    { title : "Arrietty", image : "images/karigurashi001.jpg" },
    { title : "From Up on Poppy Hill", image : "images/kokurikozaka049.jpg" },
    { title : "The Wind Rises", image : "images/kaze1.jpg" },
    { title : "The Tale of the Princess Kaguya", image : "images/kaguyahime004.jpg" },
    { title : "When Marnie Was There", image : "images/marnie021.jpg" },
    { title : "The Red Turtle", image : "images/redturtle021.jpg" },
    { title : "Earwig and the Witch", image : "images/aya003.jpg" },
  ];

  const app = document.getElementById('movieDatas');

  async function fetchData() {
    try {
      const response = await fetch('https://ghibliapi.vercel.app/films');
      const data = await response.json();
  
      if (response.ok) {
        const randomIndex = Math.floor(Math.random() * data.length);
        const randomMovie = data[randomIndex];
        const matchingImage = dataMoviesImages.find(movie => movie.title === randomMovie.title);
  
        if (matchingImage) {
          const card = createCard(randomMovie);
          app.appendChild(card);
          document.body.style.backgroundImage = `url(${matchingImage.image})`;
        } else {
          throw new Error('Matching image not found for title:', randomMovie.title);
        }
      } else {
        throw new Error('Network response was not ok.');
      }
    } catch (error) {
      showError('Gah, it\'s not working!');
      console.error(error.message);
    }
  }
  
  function createCard(movie) {
    const card = document.createElement('div');
    card.setAttribute('class', 'box');
  
    const h1 = document.createElement('h1');
    h1.textContent = movie.title;
  
    const p = document.createElement('p');
    p.textContent = `${movie.description}...`;
  
    h1.addEventListener('click', function () {
      p.style.display = (p.style.display === 'none') ? 'block' : 'none';
    });
  
    card.appendChild(h1);
    card.appendChild(p);
  
    return card;
  }
  
  function showError(message) {
    const errorMessage = document.createElement('marque');
    errorMessage.textContent = message;
    app.appendChild(errorMessage);
  }
  
  fetchData();

  document.getElementById("changeBackground").addEventListener("click", changeMovie);

/*

// Actualisation fond d'écran et cadran synopsis
let nombrePrecedent = null;
let nouveauNombre = null;

function changeimg() {

    const images = [
        "chihiro008.jpg",
        "ged014.jpg",
        "karigurashi018.jpg",
        "kokurikozaka049.jpg",
        "ponyo032.jpg",
        "kaze1.jpg",
        "mononoke010.jpg",
        "mononoke023.jpg",
        "nausicaa002.jpg",
        "nausicaa046.jpg",
        "tanuki010.jpg",
        "tanuki028.jpg",
        "tanuki035.jpg",
        "totoro024.jpg",
        "totoro025.jpg",
        "totoro037.jpg"
    ];

    do  {
        nouveauNombre = Math.floor(Math.random() * images.length);
        } while (nouveauNombre === nombrePrecedent);
        
        console.log(nombrePrecedent);
        console.log(nouveauNombre);
        
        nombrePrecedent = nouveauNombre;
        
        // const randomIndex = Math.floor(Math.random() * images.length);    
        document.getElementById("container").style.backgroundImage = `url('images/${images[nouveauNombre]}')`;

    }

document.addEventListener("DOMContentLoaded", changeimg);
document.getElementById("changeBackground").addEventListener("click", changeimg);*/


//Automatisation Date

const date = document.getElementById("date");
const day = document.getElementById("day");
const month = document.getElementById("month");
const year = document.getElementById("year");

const today = new Date();

const weekDays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const allMonths = ["January","February","March","April","May","June","July","August","September","October","November","December"];

date.innerHTML = today.getDate();
day.innerHTML = weekDays[today.getDay()];
month.innerHTML = allMonths[today.getMonth()];
year.innerHTML = today.getFullYear();

//Automatisation Horaire

let hrs = document.getElementById("hrs");
let min = document.getElementById("min");
let sec = document.getElementById("sec");

setInterval(()=>{
    let currentTime = new Date();

    hrs.innerHTML = currentTime.getHours();
    min.innerHTML = currentTime.getMinutes();
    sec.innerHTML = currentTime.getSeconds();

},1000)

// Météo 

    const apiKey="205fe95868c98ce3ff001e304e78b5cf";
    const apiUrl= "https://api.openweathermap.org/data/2.5/weather?units=metric&q="; //unités = métrique
    
    const searchBox = document.querySelector(".search input");
    const searchBtn = document.querySelector(".search button");
    const weatherIcon = document.querySelector(".weather-icon");

    async function checkWeather(city){
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
 
        if(response.status == 404){
            document.querySelector(".error").style.display="block";
            document.querySelector(".weather").style.display="none";
        }else{

            var data = await response.json();

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";

    if(data.weather[0].main == "Clouds"){
        weatherIcon.src = "images/clouds.png";         
    }
    else if(data.weather[0].main == "Clear"){
        weatherIcon.src = "images/clear.png";         
    }
    else if(data.weather[0].main == "Rain"){
        weatherIcon.src = "images/rain.png";         
    }
    else if(data.weather[0].main == "Drizzle"){
        weatherIcon.src = "images/drizzle.png";         
    }
    else if(data.weather[0].main == "Mist"){
        weatherIcon.src = "images/mist.png";         
    }

    document.querySelector(".weather").style.display = "block";
    document.querySelector(".error").style.display="none";

        }
        
    }

    searchBtn.addEventListener("click", ()=> {
        checkWeather(searchBox.value);
    })

    checkWeather();

    // Citation et informations sur le film

    /*function getData() {
        const response = await fetch('https://ghibliapi.vercel.app/films')
        const data = await response.json()
      }

    // Begin accessing JSON data here
    var data = JSON.parse(this.response)

    data.forEach((movie) => {
    // Log each movie's title
    console.log(movie.title)
    })*/







    /*const apiUrlGhibli = "https://ghibliapi.vercel.app/films" ;
    
    async function checkImage(titleMovie){
        const response = await fetch(apiUrlGhibli + title}`);
 
        if(response.status == 404){
            document.querySelector(".error").style.display="block";
            document.querySelector(".weather").style.display="none";
        }else{

            var data = await response.json();
        }
    }

 

    document.querySelector(".title").innerHTML = data.name;
    document.querySelector(".release_date").innerHTML = data.release_date;


    if(data.title[0].main == "My Neighbor Totoro"){
        weatherIcon.src = "images/totoro.png";         
    }*/