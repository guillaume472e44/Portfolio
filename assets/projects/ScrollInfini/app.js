// Access Key
import ACCESS_KEY from "./index.js";

// paramètres de base : afficher la première page de results, recherche de photos aléatoires
let page = 1;
let search = "random";
const errorMsg = document.querySelector(".error_message");
const photoContainer = document.querySelector(".photos_container");

// fonction récupération d'élements REST API
async function getPhotos() {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?page=${page}&per_page=30&query=${search}&client_id=${ACCESS_KEY}`
    );
    // vérif erreur chargement
    if (!response.ok) {
      throw new Error(`Error ${response.status}, ${response.statusText}`);
    }

    const responseData = await response.json();

    if (!responseData.total) {
      photoContainer.textContent = "";
      throw new Error("aucun résultat...");
    }

    responseData.results.forEach((element) => {
      createImg(element.urls.small, element.alt_description);
    });
  } catch (error) {
    console.log(error);
    errorMsg.textContent = `${error}`;
  }
}
getPhotos();
// fonction de création des images
function createImg(url, alt_description) {
  const img = document.createElement("img");
  img.src = url;
  img.alt = alt_description;
  img.title = alt_description;
  photoContainer.appendChild(img);
}

// intersection observer permettant de surveiller la position de la page
const watcher = document.querySelector(".intersection_watcher");

// si on arrive en bas de page, on incrémente la variable page et on relance requête API
const handleIntersect = (entries) => {
  // window.scrollY > window.innerHeight vérifie si on a scroller au moins une hauteur de viewport
  if (entries[0].isIntersecting && window.scrollY > window.innerHeight) {
    page++;
    getPhotos();
  }
};

// options facultative de l'intersectionObserver
const options = {
  root: null,
  threshold: 0,
  rootMargin: "10% 0px", // rajoute 10% de la hauteur du viewport et déclencle l'observer avant qu'il ne soit visible
};
// création d'une instance d'intersectionObserver. observation du watcher définit plus haut
new IntersectionObserver(handleIntersect, options).observe(watcher);

// search input
const form = document.querySelector("form");
const searchInput = document.querySelector("#search");
form.addEventListener("submit", searchPhotos);
function searchPhotos(e) {
  e.preventDefault();
  if (!searchInput.value) {
    errorMsg.textContent = "Ce champs ne peut être vide";
    return;
  }
  errorMsg.textContent = "";
  photoContainer.textContent = "";
  search = searchInput.value;
  page = 1;
  getPhotos();
}

// fonction permettant de remonter en haut de la page
const returnToTop = document.querySelector(".topBtn");
returnToTop.addEventListener("click", handleScroll);

function handleScroll() {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth",
  });
}
