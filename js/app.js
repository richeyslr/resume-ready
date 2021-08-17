const galleryContainer = document.querySelector("#gallery");

class Gallery {
  constructor(imgArray) {
    this.imgArray = imgArray;
  }
  // method to render the img gallery w random parks from array of all parks
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }

  // make a function to render img array
  render() {
    let currentGallery = this.imgArray;
    this.shuffle(currentGallery);
    currentGallery.length = 8;
    for (let park of currentGallery) {
      park.makeGalleryPost();
    }
  }
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
  makeGalleryPost() {
    let parent = document.createElement("div");
    parent.style.backgroundImage = `url(${this.imgSrc})`;
    parent.classList.add("gallery-post");
    let name = document.createElement("h5");
    let city = document.createElement("h6");
    let favButton = document.createElement("button");
    let mapButton = document.createElement("button");
    favButton.textContent = "Fav";
    mapButton.textContent = "Map";
    name.textContent = this.name;
    city.textContent = this.location;
    parent.append(name, city, favButton, mapButton);
    galleryContainer.append(parent);
  }
}
