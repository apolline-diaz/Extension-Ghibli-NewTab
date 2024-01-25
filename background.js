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
  { title: "The Tale of the Princess Kaguya", image: "images/kaguyahime004.jpg",},
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
