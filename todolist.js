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

// Event listener pour la touche 'Entrer'
document.addEventListener('keydown', (event) => {
  if (inputBox.value && event.key=== 'Enter') {
      addTask();
  }
}); 

showTask();
