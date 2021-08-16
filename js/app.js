class Gallery {
  constructor(imgArray) {
    this.imgArray = imgArray;
  }
  // method to render the img gallery w random parks from array of all parks
  
}

class Favorites {
  constructor(favParks) {
    this.favParks = favParks;
  }
  // method to add parks to favorites
  // method to remove parks from favorites
  // method to save favorites to storage

}

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