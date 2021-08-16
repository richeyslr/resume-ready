class Park {
  constructor(name, location, street, latitude, longitude, imgSrc) {
    this.name = name;
    this.location = location;
    this.street = street;
    this.coordinates = { lat: latitude, lng: longitude };
    this.imgSrc = imgSrc;
  }
  isFavorite = false;
}

let dummy = new Park(
  "Love Park",
  "Philly, PA",
  "some street",
  443,
  221,
  "img/lovepark.img"
);

function initMap() {
  // The location of Uluru
  const uluru = { lat: -25.344, lng: 131.036 };
  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 4,
    center: uluru,
  });
  // The marker, positioned at Uluru
  const marker = new google.maps.Marker({
    position: uluru,
    map: map,
  });
}

// dummy.isFavorite = true;

// console.log(dummy.isFavorite);
// console.log(dummy.coordinates);
