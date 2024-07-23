const url = "https://pokeapi.co/api/v2/pokemon/";
const itemsPerPage = 20;
let currentPage = 1;

let btnPrevious = document.getElementById("previous");
let btnNext = document.getElementById("next");

const fetchPokemons =  (page) => {
  let start = (page - 1) * itemsPerPage + 1;
  let end = page * itemsPerPage;

  for (let index = start; index <= end; index++) {
    fetch(url + index)
      .then((response) => response.json())
      .then((data) => mostrarDatos(data))
      .catch((error) => console.error("Error al obtener Pokémon:", error));
  }
};

const mostrarDatos = (data) => {

    const div = document.createElement("div");
    div.classList.add("pokemon");
    
    let tipos = data.types.map((type) => 
      `<p class="${type.type.name} type">${type.type.name}</p>`);
      tipos = tipos.join("");
  
    let powers = data.stats.map((stat) => 
      `<p class="stats">${stat.stat.name}: ${stat.base_stat}</p>`);
      powers = powers.join("")
  
    let id = data.id;
    let idString = id.toString();
  
    if (idString.length == 1) id = "00" + idString;
    if (idString.length == 2) id = "0" + idString;
  
    div.innerHTML = `
      <p class="id-back">${id}</p>
      <img src= ${data.sprites.other["official-artwork"].front_default} alt=" Pokemon ${data.name}" />
      <div class="info-pokemon">
        <div class="name-pokemon">
          <p class="id">${id}</p>
          <p class="name">${data.name}</p>
        </div>
        <div class="types-pokemon">
          ${tipos}
        </div>
        <div class="stats-pokemon">
          <p class="stats">Peso: ${(data.weight)/10} kg</p>
          <p class="stats">Altura: ${(data.height)/10} m</p>
        </div>
        <div class="stats-powers powers">
          ${powers}
        </div>
      </div>`;
      document.getElementById("lista-pokemon").append(div);
  }


const updatePagination = () => {
  document.getElementById("lista-pokemon").innerHTML = ""; // Limpiar la lista antes de agregar nuevos elementos
  fetchPokemons(currentPage);
};

btnPrevious.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage--;
    updatePagination();
  }
});

btnNext.addEventListener("click", () => {
  currentPage++;
  updatePagination();
});

// Inicializar la primera página
updatePagination();






// const url = "https://pokeapi.co/api/v2/pokemon/";
// pokemonStart = 1
// pokemonEnd = 50

// let btnPrevius = document.getElementById("previus");
// let btnNext = document.getElementById("next");

//   for (let index = pokemonStart; index <= pokemonEnd; index++) {
//     fetch(url + index)
//       .then((response) => response.json())
//       .then((data) => mostrarDatos(data))
//       .catch((error) => console.error("Error al obtener usuarios:", error));
//   }

// const mostrarDatos = (data) => {
//   const div = document.createElement("div");
//   div.classList.add("pokemon");
  
//   let tipos = data.types.map((type) => 
//     `<p class="${type.type.name} type">${type.type.name}</p>`);
//     tipos = tipos.join("");

//   let powers = data.stats.map((stat) => 
//     `<p class="stats">${stat.stat.name}: ${stat.base_stat}</p>`);
//     powers = powers.join("")

//   let id = data.id;
//   let idString = id.toString();

//   if (idString.length == 1) id = "00" + idString;
//   if (idString.length == 2) id = "0" + idString;

//   div.innerHTML = `
//     <p class="id-back">${id}</p>
//     <img src= ${data.sprites.other["official-artwork"].front_default} alt=" Pokemon ${data.name}" />
//     <div class="info-pokemon">
//       <div class="name-pokemon">
//         <p class="id">${id}</p>
//         <p class="name">${data.name}</p>
//       </div>
//       <div class="types-pokemon">
//         ${tipos}
//       </div>
//       <div class="stats-pokemon">
//         <p class="stats">Peso: ${(data.weight)/10} kg</p>
//         <p class="stats">Altura: ${(data.height)/10} m</p>
//       </div>
//       <div class="stats-powers powers">
//         ${powers}
//       </div>
//     </div>`;
//     document.getElementById("lista-pokemon").append(div);
// }

// const previusPage = () => {
//   pokemonStart -= 20;
//   pokemonEnd -= 20;
// }

// const nextPage = () => {
//   pokemonStart += 20;
//   pokemonEnd += 20;
// }

// const clear = () => {
//   div.innerHTML = "";
// }

// btnNext.addEventListener("click", nextPage);
// btnPrevius.addEventListener("click", previusPage);

