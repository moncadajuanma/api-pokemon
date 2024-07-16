const url = "https://pokeapi.co/api/v2/pokemon/";

for (let index = 1; index < 21; index++) {
  fetch(url + index)
    .then((response) => response.json())
    .then((data) => mostrarDatos(data))
    .catch((error) => console.error("Error al obtener usuarios:", error));
}

const mostrarDatos = (data) => {
  console.log(data);
};
