const galleryContainer = document.querySelector("#gallery");
const favsList = document.querySelector("#favs-list");

class Gallery {
  constructor(imgArray, favorites) {
    this.imgArray = imgArray;
    this.favorites = favorites;
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
  saveToLocalStorage() {
    const galleryArr = JSON.stringify(this.imgArray);
    localStorage.setItem("gallery", galleryArr);
    const parkFavsArr = JSON.stringify(this.favorites);
    localStorage.setItem("favorites", parkFavsArr);
  }
  // make a function to render img array
  render() {
    let currentGallery = [...this.imgArray];
    this.shuffle(currentGallery);
    currentGallery.length = 8;
    // for (let park of currentGallery) {
    //   park.makeGalleryPost();
    // }
    for (let i = 0; i < currentGallery.length; i++) {
      let parent = document.createElement("div");
      parent.style.backgroundImage = `url(${currentGallery[i].imgSrc})`;
      parent.classList.add("gallery-post");
      let name = document.createElement("h5");
      let city = document.createElement("h6");
      let favButton = document.createElement("button");
      let mapButton = document.createElement("button");
      name.id = "name";
      if (!currentGallery[i].isFavorite) {
        favButton.id = "fav";
        favButton.textContent = "Fav";
      } else {
        favButton.id = "unfav";
        favButton.textContent = "Unfav";
      }
      mapButton.textContent = "Map";
      name.textContent = currentGallery[i].name;
      city.textContent = currentGallery[i].location;
      parent.append(name, city, favButton, mapButton);
      galleryContainer.append(parent);
    }
  }
  renderFavorites() {
    for (let i = 0; i < this.favorites.length; i++) {
      let parent = document.createElement("div");
      let imgelement = document.createElement("img");
      imgelement.src = this.favorites[i].imgSrc;
      parent.classList.add("favorites-post");
      let name = document.createElement("h5");
      let city = document.createElement("h6");
      let favButton = document.createElement("button");
      let mapButton = document.createElement("button");
      name.id = "name";
      favButton.id = "unfav";
      favButton.textContent = "Unfav";
      
      mapButton.textContent = "Map";
      name.textContent = this.favorites[i].name;
      city.textContent = this.favorites[i].location;
      parent.append(imgelement, name, city, favButton, mapButton);
      favsList.append(parent);
    }
  }
  addFavorite(parkName) {
    for (let i = 0; i < this.imgArray.length; i++) {
      if (this.imgArray[i].name === parkName) {
        this.imgArray[i].isFavorite = true;
        this.favorites.push(this.imgArray[i]);
      }
    }
    // parkGallery.imgArray = allParks;
    this.saveToLocalStorage();
  }
  removeFavorite(parkName) {
    for (let i = 0; i < this.favorites.length; i++) {
      if (this.favorites[i].name === parkName) {
        this.favorites.splice(i, 1);
      }
    }
    for (let i = 0; i < this.imgArray.length; i++) {
      if (this.imgArray[i].name === parkName) {
        this.imgArray[i].isFavorite = false;
      }
    }
    this.saveToLocalStorage();
  }


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

const allParks = [
  new Park(
    "Memphis Skatepark",
    "Memphis, TN",
    "2599 Avery Ave",
    35.1306,
    -89.9729,
    "./assets/imgs/MemphisSP-1.jpg"
  ),
  new Park(
    "Al Town D.I.Y Skatepark",
    "Memphis, TN",
    "849 Roland St",
    35.1229,
    -90.0088,
    "./assets/imgs/AlTownSP-1.jpg"
  ),
  new Park(
    "Society Memphis Skatepark and Coffee",
    "Memphis, TN",
    "583 Scott St",
    35.1483,
    -89.9673,
    "./assets/imgs/SocietySP-1.jpg"
  ),
  new Park(
    "Sixth Avenue Skatepark",
    "Nashville, TN",
    "601 4th Ave S",
    36.154,
    -86.77728,
    "./assets/imgs/SixthAveSP-1.jpg"
  ),
  new Park(
    "Two Rivers Skatepark",
    "Nashville, TN",
    "2320 2 Rivers Pkwy",
    36.1872,
    -86.6867,
    "./assets/imgs/TwoRiverSP-1.jpg"
  ),
  new Park(
    "Una Recreation Skatepark",
    "Nashville, TN",
    "136 Una Recreation Rd",
    36.0987,
    -86.6391,
    "./assets/imgs/UnaRecreationSP-1.jpg"
  ),
  new Park(
    "Pidgeon Park",
    "Hernando, MS",
    "3369 Hwy 51 S #3323",
    34.8132,
    -89.9933,
    "./assets/imgs/PidgeonPark-1.jpg"
  ),
  new Park(
    "Searcy Skatepark",
    "Searcy, AR",
    "1200 Higginson St",
    35.31684463474165,
    -91.72368374249136,
    "./assets/imgs/SearcySP-1.jpg"
  ),
  new Park(
    "Orlando Skatepark",
    "Orlando, FL",
    "400 Festival Way",
    28.850875933878193,
    -81.2631334386252,
    "./assets/imgs/OrlandoSP-1.jpg"
  ),
  new Park(
    "Providence Skatepark",
    "Riverview, FL",
    "5720 Providence Rd",
    28.094113481428565,
    -82.33797655952462,
    "./assets/imgs/ProvidenceSP-1.jpg"
  ),
  new Park(
    "Cocoa Beach Skatepark",
    "Cocoa Beach, FL",
    "1450 Minutemen Causeway",
    28.35160323475793,
    -80.5646149287963,
    "./assets/imgs/CocoaBeachSP-1.jpg"
  ),
  new Park(
    "Linda Vista Skatepark",
    "San Diego, CA",
    "6893 Osler St",
    32.94971554985608,
    -117.29241975718595,
    "./assets/imgs/LindaVistaSP-1.jpg"
  ),
  new Park(
    "Under the Bridge Skatepark",
    "San Fransisco, CA",
    "1369 Stevenson St",
    37.80079468041146,
    -122.45824856598398,
    "./assets/imgs/UnderTheBridgeSP-1.jpg"
  ),
  new Park(
    "Balboa Park Skatepark",
    "San Fransisco, CA",
    "Ocean Avenue &, San Jose Avenue",
    37.83550975252073,
    -122.47164891598402,
    "./assets/imgs/BalboaSP-1.jpg"
  ),
  new Park(
    "Skatepark at RFK Stadium",
    "Washington, DC",
    "1522 East Capitol St NE",
    39.18592636799639,
    -77.0123256806928,
    "./assets/imgs/SPatRFK-1.jpg"
  ),
  new Park(
    "Green Skate Lab",
    "Washington, DC",
    "2913 20th St NE",
    38.954446503138705,
    -76.9902723798381,
    "./assets/imgs/GreenSkateLab-1.jpg"
  ),
  new Park(
    "FDR Skatepark",
    "Philadelphia, PA",
    "Broad &, Pattison Ave",
    40.033628944149996,
    -75.19025825951357,
    "./assets/imgs/fdrpark.jpg"
  ),
  new Park(
    "Gray's Ferry Crescent Skatepark",
    "Philadelphia, PA",
    "3600 Grays Ferry Ave",
    39.882047274987315,
    -75.16950885430737,
    "./assets/imgs/GraysFerryCrescentSP-1.jpg"
  ),
];

