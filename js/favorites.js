let potentialFavs = JSON.parse(localStorage.getItem("favorites")) || [];
let potentialGallery = JSON.parse(localStorage.getItem("gallery")) || allParks;
let parkGallery = new Gallery(potentialGallery, potentialFavs);
parkGallery.renderFavorites();