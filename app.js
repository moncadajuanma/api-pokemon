const url = "https://pokeapi.co/api/v2/pokemon/";
let pokemonStart = 1;
let pokemonPorPagina = 20;
let pokemonEnd = pokemonPorPagina;
const btnPrevius = document.getElementById("previous");
const btnNext = document.getElementById("next");
const p = document.createElement("p");
const btnHeader = document.querySelectorAll(".btn-header");

const fetchPokemon = async (pokemonStart, pokemonEnd) => {
  for (let index = pokemonStart; index <= pokemonEnd; index++) {
    await fetch(url + index)
      .then((response) => response.json())
      .then((data) => mostrarDatos(data))
      .catch((error) => alert("Error al obtener usuarios: " + error));
  }
};

// Funcion que crea todas las tarjetas de pokemon
const mostrarDatos = (data) => {
  const div = document.createElement("div");
  div.classList.add("pokemon");

  let tipos = data.types.map(
    (type) => `<p class="${type.type.name} type">${type.type.name}</p>`
  );
  tipos = tipos.join("");

  let powers = data.stats.map(
    (stat) => `<p class="stats">${stat.stat.name}: ${stat.base_stat}</p>`
  );
  powers = powers.join("");

  let id = data.id;
  let idString = id.toString();
  if (idString.length == 1) id = "00" + idString;
  if (idString.length == 2) id = "0" + idString;
  // Creamos tarjeta del pokemon
  div.innerHTML = `
    <p class="id-back">${id}</p>
    <img src= ${
      data.sprites.other["official-artwork"].front_default
    } alt=" Pokemon ${data.name}" />
    <div class="info-pokemon">
      <div class="name-pokemon">
        <p class="id">${id}</p>
        <p class="name">${data.name}</p>
      </div>
      <div class="types-pokemon">
        ${tipos}
      </div>
      <div class="stats-pokemon">
        <p class="stats">Peso: ${data.weight / 10} kg</p>
        <p class="stats">Altura: ${data.height / 10} m</p>
      </div>
      <div class="stats-powers powers">
        ${powers}
      </div>
    </div>`;
  document.getElementById("lista-pokemon").append(div);
};

// Funcion para retroceder pagina
const previusPage = () => {
  if (pokemonStart > 1) {
    clear();
    disablePrevious();
    pokemonStart = pokemonStart - pokemonPorPagina;
    pokemonEnd = pokemonEnd - pokemonPorPagina;
    p.innerHTML = `Pokemon del ${pokemonStart} al ${pokemonEnd}`;
    document.addEventListener(
      "DOMContentLoad",
      fetchPokemon(pokemonStart, pokemonEnd)
    );
  } else {
    btnPrevius.disable = true;
    btnNext.disable = false;
  }
};

// Funcion para avanzar pagina
const nextPage = () => {
  if (pokemonEnd < 1025) {
    clear();
    disableNext();
    pokemonStart = pokemonStart + pokemonPorPagina;
    pokemonEnd = pokemonEnd + pokemonPorPagina;
    p.innerHTML = `Pokemon del ${pokemonStart} al ${pokemonEnd}`;
    document.addEventListener(
      "DOMContentLoad",
      fetchPokemon(pokemonStart, pokemonEnd)
    );
  } else {
    btnPrevius.disable = false;
    btnNext.disable = true;
  }
};

// Funcion para inactivar boton Anterior
const disablePrevious = () => {
  btnPrevius.disable = false;
  btnNext.disable = false;
};

// Funcion para inactivar boton Siguiente
const disableNext = () => {
  btnPrevius.disable = false;
  btnNext.disable = false;
};

// Funcion para limpiar pagina
const clear = () => {
  document.getElementById("lista-pokemon").innerHTML = "";
};

// Inicializa contador de pagina
p.innerHTML = `Pokemon del ${pokemonStart} al ${pokemonEnd}`;
p.classList.add("contador");
document.getElementById("text-contador").append(p);

// Inicializa carga de pokemon
document.addEventListener(
  "DOMContentLoad",
  fetchPokemon(pokemonStart, pokemonEnd)
);

// Eventos de captura de botones de avanzar y retroceder pagina
btnNext.addEventListener("click", nextPage);
btnPrevius.addEventListener("click", previusPage);

// Evento botones de tipos de Pokemon
btnHeader.forEach((btn) =>
  btn.addEventListener("click", (event) => {
    const btnId = event.currentTarget.id;
    console.log(btnId);

    document.getElementById("lista-pokemon").innerHTML = "";

    for (let index = pokemonStart; index <= pokemonEnd; index++) {
      fetch(url + index)
        .then((response) => response.json())
        .then((data) => {
          const tipos = data.types.map(
            (type) => type.type.name
          );
          if (btnId === "ver-todos") {
            mostrarDatos(data);
          }
          else 
          if (tipos.some(tipo => tipo.includes(btnId))){
            mostrarDatos(data);
          }
        })
        .catch((error) => alert("Error al obtener usuarios: " + error));
    }
  })
);
