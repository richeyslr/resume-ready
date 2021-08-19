// get global references to containers
const galleryContainer = document.querySelector("#gallery");
const favsList = document.querySelector("#favs-list");

// create an object for the gallery of parks that takes 2 arrays, one to hold the array of all parks and one to hold array of favorite parks
class Gallery {
  constructor(imgArray, favorites) {
    this.imgArray = imgArray;
    this.favorites = favorites;
  }
  // method to shuffle array of all parks to randomize their position in the array
  shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * i);
      const temp = array[i];
      array[i] = array[j];
      array[j] = temp;
    }
  }
  // method to save both the imgArray and the favorites array to local storage
  saveToLocalStorage() {
    // stringify the array contents and set it in local storage
    const galleryArr = JSON.stringify(this.imgArray);
    localStorage.setItem("gallery", galleryArr);
    const parkFavsArr = JSON.stringify(this.favorites);
    localStorage.setItem("favorites", parkFavsArr);
  }
  // make a function to render img array to the gallery page with 8 images
  render() {
    // get a reference to the entire array of parks
    let currentGallery = [...this.imgArray];
    // shuffle the array of all parks
    this.shuffle(currentGallery);
    // change the length of the current parks being shown to 8
    currentGallery.length = 8;

    // for each park in the array create a div with a background image from the imgSrc of the park
    for (let i = 0; i < currentGallery.length; i++) {
      let parent = document.createElement("div");
      parent.style.backgroundImage = `url(${currentGallery[i].imgSrc})`;
      parent.classList.add("gallery-post");
      let overlay = document.createElement("div");
      overlay.classList.add("content-overlay");
      let details = document.createElement("div");
      details.classList.add("content-details");
      let name = document.createElement("h5");
      let city = document.createElement("h6");
      // add buttons to each park for favoriting and watching a video of the park
      let favButton = document.createElement("button");
      let vidButton = document.createElement("button");
      let favIcon = document.createElement("i");
      let vidIcon = document.createElement("i");
      // console.log(currentGallery[i].vidID);
      vidButton.classList.add("js-modal-btn");
      vidButton.setAttribute("data-video-id", currentGallery[i].vidID);
      vidButton.setAttribute("aria-label", "View park on YouTube");
      vidIcon.classList.add("fas", "fa-video");
      favButton.setAttribute("aria-label", "Fav/Unfav");
      name.id = "name";
      favIcon.classList.add("fa-heart");
      if (!currentGallery[i].isFavorite) {
        favButton.id = "fav";
        favIcon.classList.add("far");
        // favButton.textContent = "Fav";
      } else {
        favButton.id = "unfav";
        favIcon.classList.add("fas");
        // favButton.textContent = "Unfav";
      }
      // mapButton.textContent = "Watch Video";
      name.textContent = currentGallery[i].name;
      city.textContent = currentGallery[i].location;
      vidButton.append(vidIcon);
      favButton.append(favIcon);
      details.append(name, city, favButton, vidButton);
      // parent.append(overlay, name, city, favButton, mapButton);
      parent.append(overlay, details);
      galleryContainer.append(parent);
    }
  }
  renderFavorites() {
    // clear the current favsList div
    favsList.innerHTML = "";
    // for each park in the favorites list add it to the favs-list container
    for (let i = 0; i < this.favorites.length; i++) {
      let parent = document.createElement("div");
      let imgelement = document.createElement("img");
      imgelement.src = this.favorites[i].imgSrc;
      parent.classList.add("favorites-post");
      let name = document.createElement("h5");
      let city = document.createElement("h6");
      let favButton = document.createElement("button");
      let mapButton = document.createElement("button");
      mapButton.classList.add("js-modal-btn");
      mapButton.setAttribute("data-video-id", this.favorites[i].vidID);
      name.id = "name";
      favButton.id = "unfav";
      favButton.textContent = "Unfav";

      mapButton.textContent = "Watch Video";
      name.textContent = this.favorites[i].name;
      city.textContent = this.favorites[i].location;
      parent.append(imgelement, name, city, favButton, mapButton);
      favsList.append(parent);
    }
  }
  // method to add parks to favorites list
  addFavorite(parkName) {
    // get the park name and loop through the array of all parks to find a matching park name
    for (let i = 0; i < this.imgArray.length; i++) {
      if (this.imgArray[i].name === parkName) {
        // change the park's isFavorite property
        this.imgArray[i].isFavorite = true;
        // push the park into the favorites array
        this.favorites.push(this.imgArray[i]);
      }
    }
    // update local storage
    this.saveToLocalStorage();
  }
  // method to remove parks from favorites array
  removeFavorite(parkName) {
    // check for the name in the favorites array and splice it
    for (let i = 0; i < this.favorites.length; i++) {
      if (this.favorites[i].name === parkName) {
        this.favorites.splice(i, 1);
      }
    }
    // check for the name in the array of all parks and change its isFavorite property back to false
    for (let i = 0; i < this.imgArray.length; i++) {
      if (this.imgArray[i].name === parkName) {
        this.imgArray[i].isFavorite = false;
      }
    }
    // update local storage
    this.saveToLocalStorage();
  }
}
// make a class for an instance of a skatepark with all neccessary parameters
class Park {
  constructor(name, location, street, latitude, longitude, imgSrc, vidID) {
    this.name = name;
    this.location = location;
    this.street = street;
    this.coordinates = { lat: latitude, lng: longitude };
    this.imgSrc = imgSrc;
    this.vidID = vidID;
  }
  isFavorite = false;
}

// array of all parks where park instances are created
const allParks = [
  new Park(
    "Memphis Skatepark",
    "Memphis, TN",
    "2599 Avery Ave",
    35.1306,
    -89.9729,
    "./assets/imgs/MemphisSP-1.jpg",
    "vcb7lXiq1Ts"
  ),
  new Park(
    "Al Town D.I.Y Skatepark",
    "Memphis, TN",
    "849 Roland St",
    35.1229,
    -90.0088,
    "./assets/imgs/AlTownSP-1.jpg",
    "e_45MwNrb48"
  ),
  new Park(
    "Society Memphis Skatepark and Coffee",
    "Memphis, TN",
    "583 Scott St",
    35.1483,
    -89.9673,
    "./assets/imgs/SocietySP-1.jpg",
    "Cr6pVxsVI6E"
  ),
  new Park(
    "Sixth Avenue Skatepark",
    "Nashville, TN",
    "601 4th Ave S",
    36.154,
    -86.77728,
    "./assets/imgs/SixthAveSP-1.jpg",
    "CMOxaIkxwwk"
  ),
  new Park(
    "Two Rivers Skatepark",
    "Nashville, TN",
    "2320 2 Rivers Pkwy",
    36.1872,
    -86.6867,
    "./assets/imgs/TwoRiverSP-1.jpg",
    "Xbnzh4Wv9dE"
  ),
  new Park(
    "Una Recreation Skatepark",
    "Nashville, TN",
    "136 Una Recreation Rd",
    36.0987,
    -86.6391,
    "./assets/imgs/UnaRecreationSP-1.jpg",
    "hxpnlwt5KfM"
  ),
  new Park(
    "Pidgeon Park",
    "Hernando, MS",
    "3369 Hwy 51 S #3323",
    34.8132,
    -89.9933,
    "./assets/imgs/PidgeonPark-1.jpg",
    "MN1yYC0Gj78"
  ),
  new Park(
    "Searcy Skatepark",
    "Searcy, AR",
    "1200 Higginson St",
    35.31684463474165,
    -91.72368374249136,
    "./assets/imgs/SearcySP-1.jpg",
    "5btQn78xnzE"
  ),
  new Park(
    "Orlando Skatepark",
    "Orlando, FL",
    "400 Festival Way",
    28.850875933878193,
    -81.2631334386252,
    "./assets/imgs/OrlandoSP-1.jpg",
    "P7oGKPyO0-w"
  ),
  new Park(
    "Providence Skatepark",
    "Riverview, FL",
    "5720 Providence Rd",
    28.094113481428565,
    -82.33797655952462,
    "./assets/imgs/ProvidenceSP-1.jpg",
    "PI11As4Oo6I"
  ),
  new Park(
    "Cocoa Beach Skatepark",
    "Cocoa Beach, FL",
    "1450 Minutemen Causeway",
    28.35160323475793,
    -80.5646149287963,
    "./assets/imgs/CocoaBeachSP-1.jpg",
    "Nbu9_kTTjGA"
  ),
  new Park(
    "Linda Vista Skatepark",
    "San Diego, CA",
    "6893 Osler St",
    32.94971554985608,
    -117.29241975718595,
    "./assets/imgs/LindaVistaSP-1.jpg",
    "BjQ_KZTk8Nc"
  ),
  new Park(
    "Under the Bridge Skatepark",
    "San Fransisco, CA",
    "1369 Stevenson St",
    37.80079468041146,
    -122.45824856598398,
    "./assets/imgs/UnderTheBridgeSP-1.jpg",
    "l_iE2eTJ8J4"
  ),
  new Park(
    "Balboa Park Skatepark",
    "San Fransisco, CA",
    "Ocean Avenue &, San Jose Avenue",
    37.83550975252073,
    -122.47164891598402,
    "./assets/imgs/BalboaSP-1.jpg",
    "N0JuEf-8oiQ"
  ),
  new Park(
    "Skatepark at RFK Stadium",
    "Washington, DC",
    "1522 East Capitol St NE",
    39.18592636799639,
    -77.0123256806928,
    "./assets/imgs/SPatRFK-1.jpg",
    "lLrbzLuKAKs"
  ),
  new Park(
    "Green Skate Lab",
    "Washington, DC",
    "2913 20th St NE",
    38.954446503138705,
    -76.9902723798381,
    "./assets/imgs/GreenSkateLab-1.jpg",
    "5LSNvjNzT1Y"
  ),
  new Park(
    "FDR Skatepark",
    "Philadelphia, PA",
    "Broad &, Pattison Ave",
    40.033628944149996,
    -75.19025825951357,
    "./assets/imgs/fdrpark.jpg",
    "3SCc4MRQ2QU"
  ),
  new Park(
    "Gray's Ferry Crescent Skatepark",
    "Philadelphia, PA",
    "3600 Grays Ferry Ave",
    39.882047274987315,
    -75.16950885430737,
    "./assets/imgs/GraysFerryCrescentSP-1.jpg",
    "oAFNofAYgbQ"
  ),
  new Park(
    "Forest Grove Skatepark",
    "Forest Grove, OR",
    "2725 Main St",
    45.52880112060759,
    -123.11150210206321,
    "./assets/imgs/ForestGroveSP-1.jpg",
    "cDJ8ciLqG4w"
  ),
  new Park(
    "Burnside Skatepark",
    "Portland, OR",
    "SE 2nd Ave",
    45.52325170027452,
    -122.66374460391074,
    "./assets/imgs/BurnsideSP-1.jpg",
    "rfXROiJUwzE"
  ),
  new Park(
    "Denver Skatepark",
    "Denver, CO",
    "2205 19th St",
    39.759780231777135,
    -105.00286499056854,
    "./assets/imgs/DenverSP-1.jpg",
    "w8Z68Vo96ZI"
  ),
  new Park(
    "Vans Skatepark",
    "Huntington Beach, CA",
    "7471 Center Ave",
    33.743026870482595,
    -117.9987036274477,
    "./assets/imgs/VansSP-1.jpg",
    "Vpvis28YCPA"
  ),
  new Park(
    "Les Coleman Skatepark",
    "New York, NY",
    "62 Monroe St & Pike St",
    40.711611534160774,
    -73.99261905985696,
    "./assets/imgs/LesColemanSP-1.jpg",
    "hu4kXyi_J0Y"
  ),
  new Park(
    "Skatepark of Tampa",
    "Tampa, FL",
    "4215 E Columbus Dr",
    27.966329929941804,
    -82.4104119295115,
    "./assets/imgs/SPofTampa-1.jpg",
    "PlGRE5HMQgo"
  ),
];

// setting up theme switcher

const themeToggle = document.querySelector("#theme-toggle");

const enableDarkMode = () => {
  document.body.classList.remove("flavor-light");
  document.body.classList.add("flavor-dark");
  localStorage.setItem('dark', 'dark');
};

const enableLightMode = () => {
  document.body.classList.remove("flavor-dark");
  document.body.classList.add("flavor-light");
  localStorage.removeItem('dark');
};

themeToggle.addEventListener("click", () => {
  document.body.classList.contains("flavor-light")
    ? enableDarkMode()
    : enableLightMode();
});
