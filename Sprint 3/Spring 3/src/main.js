//Get elements General
const typeSelect = document.getElementById("type");
const statusSelect = document.getElementById("status");
const propertiesInput = document.getElementById("properties");
const btnFind = document.getElementById("btnFind");
const containerCards = document.getElementById("containerCards");

let realState = [];
let data = [];
let favoritos = JSON.parse(sessionStorage.getItem("favoritos")) || [];
let dataFiltered = [];

const getData = async () => {
  const API_URL = "http://localhost:3000";
  const response = await fetch(`${API_URL}/RealState`);
  data = await response.json();
  realState = data;
  renderCards();
  console.log(data);
};

getData();

const handleSearch = () => {
  let query = typeSelect.value;
  let query2 = propertiesInput.value;
  filterArray(query, query2);
  renderCards();
};

const filterArray = (text, frase) => {
  realState = data.filter(
    (element) =>
      element.type.includes(text) &&
      element.ubication.toLowerCase().includes(frase.toLowerCase())
  );
  console.log(realState);
};

btnFind.addEventListener("click", handleSearch);

const renderCards = () => {
  containerCards.innerHTML = "";
  realState.forEach((item) => {
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

document.addEventListener("click", ({ target }) => {
  if (target.classList.contains("btnFavorites")) {
    const saveFav = realState.find(
      (item) => item.id == target.getAttribute("data-id")
    );
    const elementExist = favoritos.some((item) => item.id === saveFav.id);
    console.log(elementExist);
    if (elementExist == false) {
      favoritos.push(saveFav);
      sessionStorage.setItem("favoritos", JSON.stringify(favoritos));
    }
  }
});
