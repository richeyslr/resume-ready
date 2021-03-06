localStorage.getItem("currentTheme") === "dark"
  ? enableDarkMode()
  : enableLightMode();
// either get favorites and all parks from local storage or set them to default
let potentialFavs = JSON.parse(localStorage.getItem("favorites")) || [];
let potentialGallery = JSON.parse(localStorage.getItem("gallery")) || allParks;
// make a new gallery instance either from saved data or default arrays
let parkGallery = new Gallery(potentialGallery, potentialFavs);
// use the renderFavorites funtion to render the favorites on the favorites page
parkGallery.renderFavorites();

// set the lat and long of the parks to "locations" used by google maps
let locations = parkGallery.favorites.map((item) => item.coordinates);
// let infoContent = parkGallery.favorites.map((park) => park.name);
let infoContent = parkGallery.favorites.map(
  (park) => `<div class="map-container">
<img src="${park.imgSrc}" class="map-img"/>
<div class="map-details">
<span><strong>${park.name}</strong></span>
<span class="map-city">${park.location}</span>
</div>
</div>`
);

let parkLabels = parkGallery.favorites
  .map((item) => item.name.charAt(0))
  .join("");
// console.log(labels);

// google maps api function to render a map on screen
function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 3,
    center: { lat: 39.83, lng: -95.58 },
  });
  // Create an array of alphabetical characters used to label the markers.
  const labels = parkLabels;
  // Add some markers to the map.
  // Note: The code uses the JavaScript Array.prototype.map() method to
  // create an array of markers based on a given "locations" array.
  // The map() method here has nothing to do with the Google Maps API.
  const markers = locations.map((location, i) => {
    return new google.maps.Marker({
      position: location,
      label: labels[i % labels.length],
      map,
    });
  });
  // Add a marker clusterer to manage the markers.
  new MarkerClusterer(map, markers, {
    imagePath: "./assets/markers/m",
  });
  for (let i = 0; i < markers.length; i++) {
    markers[i].addListener("click", () => {
      map.setZoom(10);
      map.setCenter(markers[i].getPosition());
    });
  }
  for (let i = 0; i < markers.length; i++) {
    markers[i].addListener("mouseover", () => {
      const infoWindow = new google.maps.InfoWindow({
        content: infoContent[i],
        map: map,
      });
      infoWindow.open(map, markers[i]);
      markers[i].addListener("mouseout", () => {
        infoWindow.close(map, markers[i]);
      });
    });
  }
}

// make a function to handle an unfavorite click on the favorites screen
function handleUnFavClick(evt) {
  evt.preventDefault();
  evt.stopPropagation();
  console.log(evt.target);
  // same as other event handler but only for unfavoriting
  if (evt.target.id === "unfav") {
    // let currentIcon = evt.target.querySelector("i");
    let currentPark = evt.target.parentElement.parentElement;
    console.log(currentPark);
    let currentParkName = currentPark.querySelector("#name").textContent;
    console.log(currentParkName);
    parkGallery.removeFavorite(currentParkName);
    evt.target.id = "fav";

    // evt.target.textContent = "Fav";
    // also update the locations based off the new arrays
    locations = parkGallery.favorites.map((item) => item.coordinates);
    parkLabels = parkGallery.favorites
      .map((item) => item.name.charAt(0))
      .join("");
    // remake the map on the page with updated locations
    initMap();
    // re render the favorites on the page
    parkGallery.renderFavorites();
  }
}

// add an event listener to the favsList container for clicking unfav
favsList.addEventListener("click", handleUnFavClick);
// call modal video player
$(".js-modal-btn").modalVideo();
