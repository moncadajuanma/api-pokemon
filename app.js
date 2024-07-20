const url = "https://pokeapi.co/api/v2/pokemon/";

for (let index = 1; index < 26; index++) {
  fetch(url + index)
    .then((response) => response.json())
    .then((data) => console.log(data))
    .catch((error) => console.error("Error al obtener usuarios:", error));
}

const mostrarDatos = (data) => {
  const div = document.createElement("div")
  div.classList.add("list-pokemon")
  
};
