let potentialFavs = JSON.parse(localStorage.getItem("favorites")) || [];
let potentialGallery = JSON.parse(localStorage.getItem("gallery")) || allParks;
let parkGallery = new Gallery(potentialGallery, potentialFavs);
parkGallery.renderFavorites();

function handleUnFavClick(evt) {
  console.log(evt.target.id);
  if (evt.target.id === "unfav") {
    let currentPark = evt.target.parentElement;
    let currentParkName = currentPark.querySelector("#name").textContent;
    console.log(currentParkName);
    parkGallery.removeFavorite(currentParkName);
    evt.target.id = "fav";
    evt.target.textContent = "Fav";
  }
  
  parkGallery.renderFavorites();
}

favsList.addEventListener("click", handleUnFavClick);