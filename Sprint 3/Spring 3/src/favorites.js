let favoritos = JSON.parse(sessionStorage.getItem("favoritos")) || [];
console.log(favoritos);
const containerCards = document.getElementsByClassName("contenedor")[0];
const renderCards = () => {
  containerCards.innerHTML = "";
  favoritos.forEach((item) => {
    containerCards.innerHTML += `
      <article class="card">
        <figure id="propertyImage">
            <img src="${item.image}" alt="Rentas" class="cardImage">
        </figure>
        <div class="card__description">
          <div class="description__name">
              <p>Name:</p>
              <p>Ubication:</p>
              <p>Area:</p>
              <p>Rooms:</p>
              <p>Bathrooms:</p>
              <p>Type:</p>
              <p>Category:</p>
              <p>Price:</p>
              <p>Parking Lot:</p>
          </div>
          <div class="description__details">
              <p>${item.name}</p>
              <p>${item.ubication}</p>
              <p>${item.area}</p>
              <p>${item.rooms}</p>
              <p>${item.bathrooms}</p>
              <p>${item.type}</p>
              <p>${item.category}</p>
              <p>${item.price}</p>
              <p>${item.parkingLot}</p>
          </div>
        </div>
        <div class="actions">
          <button class="btnDetails" data-id="${item.id}">Show Details</button>
          <button class="btnFavorites" data-id="${item.id}">Favorites</button>
        </div>
        </article>
    `;
  });
};
renderCards();
document.addEventListener("DOMContentLoaded", renderCards);
