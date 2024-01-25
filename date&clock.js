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
