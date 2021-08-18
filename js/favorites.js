let potentialFavs = JSON.parse(localStorage.getItem("favorites")) || [];
let potentialGallery = JSON.parse(localStorage.getItem("gallery")) || allParks;
let parkGallery = new Gallery(potentialGallery, potentialFavs);
parkGallery.renderFavorites();

let locations = parkGallery.favorites.map((item) => item.coordinates);
// console.log(testmap);
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: { lat: 39.83, lng: -95.58 },
  });
  // Create an array of alphabetical characters used to label the markers.
  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  // Add some markers to the map.
  // Note: The code uses the JavaScript Array.prototype.map() method to
  // create an array of markers based on a given "locations" array.
  // The map() method here has nothing to do with the Google Maps API.
  const markers = locations.map((location, i) => {
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length],
    });
  });
  // Add a marker clusterer to manage the markers.
  new MarkerClusterer(map, markers, {
    imagePath: "./assets/markers/m",
  });
}

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
  // document.getElementById("map").innerHTML = "";
  locations = parkGallery.favorites.map((item) => item.coordinates);
  initMap();
  parkGallery.renderFavorites();
}

// const handleUnfavorite = (evt) => {
//   console.log(evt.target.id);
//   if (evt.target.id === "unfav") {
//     let currentPark = evt.target.parentElement;
//     let currentParkName = currentPark.querySelector("#name").textContent;
//     console.log(currentParkName);
//     parkGallery.removeFavorite(currentParkName);
//     evt.target.id = "fav";
//     evt.target.textContent = "Fav";
//   }

//   parkGallery.renderFavorites();
// };

favsList.addEventListener("click", handleUnFavClick);
