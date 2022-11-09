const API = "https://pokeapi.co/api/v2/pokemon/";

// https://pokeapi.co/api/v2/pokemon/1/

const img = document.querySelector(".pokemon");
const button = document.querySelector(".button1");
const namePokemon = document.querySelector(".name-pokemon")
const tipoPokemon = document.querySelector(".tipo");
const buttonSave = document.querySelector(".button2");
const nodoFavoritos = document.querySelector(".container-favoritos");
/* funcion random*/
const maximum = 151;
const minimum = 1;
const random = () => Math.floor(Math.random()*(maximum-minimum)+minimum);

let favorito = [];
/* fetch con asyncronismo */
async function llamadoApi(){
    /* Obteniendo imagen y nombre*/
    const response = await fetch(`${API}${random()}/`);
    const data = await response.json();

    var figura = data.sprites.other.dream_world.front_default;
    var nombre = data.species.name;
    var tipo = data.species.url;

    const res = await fetch(`${tipo}`);
    const dat = await res.json();
    tipoPoke= dat.egg_groups[0].name;
    
    namePokemon.textContent = nombre;
    img.src = figura;
    img.style = "width: 250px";
    tipoPokemon.textContent = `Type: ${tipoPoke}`
    tipoPokemon.translate = "yes";
    favorito.push = {nombre, figura};
}

function guardar(){
    
}

function mostrar(){
    console.log(favorito)
    console.log(favorito.push.nombre)

    const nombreFavorito = document.createElement("p");
    const imagenFavorito = document.createElement("img");
    const cardFavorito = document.createElement("div");
    cardFavorito.className = "card-favorito";

    nombreFavorito.innerText = favorito.push.nombre;
    imagenFavorito.src = favorito.push.figura;
    imagenFavorito.style = "width: 250px";

    cardFavorito.append(nombreFavorito, imagenFavorito)
    nodoFavoritos.append(cardFavorito);
}

// function eliminar(){
//     favorito
// }


window.addEventListener("load", llamadoApi);
button.addEventListener("click", llamadoApi);
buttonSave.addEventListener("click",mostrar);