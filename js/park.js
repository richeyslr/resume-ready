class Park {
  constructor(name, location, street, latitude, longitude, imgSrc) {
    this.name = name;
    this.location = location;
    this.street = street;
    this.coordinates = { lat: latitude, lng: longitude };
    // this.latitude = latitude;
    // this.longitude = longitude;
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

dummy.isFavorite = true;

console.log(dummy.isFavorite);
console.log(dummy.coordinates);
