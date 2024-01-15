// Actualisation fond d'écran
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
document.getElementById("changeBackground").addEventListener("click", changeimg);

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
