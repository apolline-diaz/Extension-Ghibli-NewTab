// Actualisation fond d'écran

function changeimg() {

    const images = [
        "chihiro008.jpg",
        "ged014.jpg",
        "karigurashi018.jpg",
        "kokurikozaka049.jpg",
        "ponyo032.jpg"
    ];
    
    const randomIndex = Math.floor(Math.random() * images.length);    
    document.getElementById("container").style.backgroundImage = `url('images/${images[randomIndex]}')`;
}

document.addEventListener("DOMContentLoaded", changeimg);



/*Actualisation fond d'écran

function changeimg(){
    
    let images = ["url('images/chihiro008.jpg')", "url('images/ged014.jpg')","url('images/karigurashi018.jpg')","url('images/kokurikozaka049.jpg')","url('images/ponyo032.jpg')"];

    let randomimg = Math.floor(Math.random() * images.length) +0;

    document.getElementById("container").style.backgroundImage=images[randomimg];

    };*/

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


