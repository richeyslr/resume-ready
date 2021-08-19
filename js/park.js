// either get favorites and all parks from local storage or set them to default
let potentialFavs = JSON.parse(localStorage.getItem("favorites")) || [];
let potentialGallery = JSON.parse(localStorage.getItem("gallery")) || allParks;
// create a new gallery instance using either default or locally stored arrays
let parkGallery = new Gallery(potentialGallery, potentialFavs);
// call the render method to render the gallery on the gallery page
parkGallery.render();

// create an event handler for the click of the favorite or unfavorite button
function handleFavClick(evt) {
  console.log(evt.target);
  // prevent the default event handle things from happening
  evt.preventDefault();
  // check to see if target is a fav or unfav button
  if (evt.target.id === "fav") {
    // if its a fav button use the addFavorite method of the gallery
    let currentIcon = evt.target.querySelector("i");
    console.log(currentIcon);
    let currentPark = evt.target.parentElement;
    let currentParkName = currentPark.querySelector("#name").textContent;
    console.log(currentParkName);
    parkGallery.addFavorite(currentParkName);
    evt.target.id = "unfav";
    currentIcon.classList.replace("far", "fas");
    // evt.target.textContent = "Unfav";
  } else if (evt.target.id === "unfav") {
    // if its a fav button use the removeFavorite method of the gallery
    let currentIcon = evt.target.querySelector("i");
    console.log(currentIcon);
    let currentPark = evt.target.parentElement;
    let currentParkName = currentPark.querySelector("#name").textContent;
    console.log(currentParkName);
    parkGallery.removeFavorite(currentParkName);
    evt.target.id = "fav";
    currentIcon.classList.replace("fas", "far");
    // evt.target.textContent = "Fav";
  }
}

// add the code to make modal work
$(".js-modal-btn").modalVideo();

// add an event listener to the gallery container
galleryContainer.addEventListener("click", handleFavClick);
