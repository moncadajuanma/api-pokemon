const url = "https://pokeapi.co/api/v2/pokemon/";
pokemonStart = 1;
let pokemonPorPagina = 20;
pokemonEnd = pokemonPorPagina;
let btnPrevius = document.getElementById("previous");
let btnNext = document.getElementById("next");

const  fetchPokemon = async (pokemonStart, pokemonEnd) => {
  for (let index = pokemonStart; index <= pokemonEnd; index++) {
    await fetch(url + index)
      .then((response) => response.json())
      .then((data) => mostrarDatos(data))
      .catch((error) => console.error("Error al obtener usuarios:", error));
  }
};

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

  div.innerHTML = `
    <p class="id-back">${id}</p>
    <img src= ${data.sprites.other["official-artwork"].front_default
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

const previusPage = () => {
  if (pokemonStart > 1) {
    clear();
    pokemonStart = pokemonStart - pokemonPorPagina;
    pokemonEnd = pokemonEnd - pokemonPorPagina;
    document.addEventListener('load', fetchPokemon(pokemonStart, pokemonEnd));
  } else {Swal.fire({
    position: "center",
    icon: "warning",
    title: "Has llegado al comienzo de la lista de Pokemones",
    showConfirmButton: false,
    timer: 1000
  });};
};

const nextPage = () => {
  if (pokemonEnd <= 1025) {
    clear();
    pokemonStart = pokemonStart + pokemonPorPagina;
    pokemonEnd = pokemonEnd + pokemonPorPagina;
    document.addEventListener('load', fetchPokemon(pokemonStart, pokemonEnd));
  } else {Swal.fire({
    position: "center",
    icon: "warning",
    title: "Has llegado al final de la lista de Pokemones",
    showConfirmButton: false,
    timer: 1000
  });};
};

const clear = () => {
  document.getElementById("lista-pokemon").innerHTML = "";
};

document.addEventListener('load', fetchPokemon(pokemonStart, pokemonEnd));

btnNext.addEventListener("click", nextPage);
btnPrevius.addEventListener("click", previusPage);
