const url = "https://pokeapi.co/api/v2/pokemon/";

for (let index = 1; index <= 10; index++) {
  fetch(url + index)
    .then((response) => response.json())
    .then((data) => mostrarDatos(data))
    .catch((error) => console.error("Error al obtener usuarios:", error));
}

const mostrarDatos = (data) => {
  const div = document.createElement("div");
  div.classList.add("pokemon");
  
  let tipos = data.types.map((type) => 
    `<p class="${type.type.name} type">${type.type.name}</p>`);
  tipos = tipos.join("");

  let powers = data.stats.map((stat) => 
    `<p class="stats">${stat.stat.name}: ${stat.base_stat}</p>`);
  
  powers = powers.join("")
  console.log(powers);

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
        <p class="stats">${powers}</p>
        
      </div>
    </div>`;
    document.getElementById("lista-pokemon").append(div);
}
