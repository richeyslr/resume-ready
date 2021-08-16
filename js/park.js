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
  39.9543,
  -75.1657,
  "img/lovepark.img"
);

function initMap() {
  // The location of Uluru
  const uluru = dummy.coordinates;
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

console.log(dummy.coordinates);
