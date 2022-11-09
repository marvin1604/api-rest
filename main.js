console.log("a codear")
const API = "https://pokeapi.co/api/v2/pokemon/";

// https://pokeapi.co/api/v2/pokemon/1/

const img = document.querySelector(".pokemon");
const button = document.querySelector(".button");
const namePokemon = document.querySelector(".name-pokemon")
const tipoPokemon = document.querySelector(".tipo");
/* Fetch con Promesas */

// const llamadoApi = () =>{
//     fetch(API)
//     .then(response => response.json())
//     .then(data =>{
//         const figura = data.card_images[0].image_url;
//         img.src = figura;
//         img.style = "width: 320px";
//     })
// }
const maximum = 151;
const minimum = 1;
const random = () => Math.floor(Math.random()*(maximum-minimum)+minimum);
/* fetch con asyncronismo */
async function llamadoApi(){
    const response = await fetch(`${API}${random()}/`);
    const data = await response.json();
    const figura = data.sprites.other.dream_world.front_default;
    const nombre = data.species.name;
    const tipo = data.species.url;

    const res = await fetch(`${tipo}`);
    const dat = await res.json();
    tipoPoke= dat.egg_groups[0].name;
    
    namePokemon.textContent = nombre;
    img.src = figura;
    img.style = "width: 250px";
    tipoPokemon.textContent = `Type: ${tipoPoke}`
    tipoPokemon.translate = "yes";
}

window.addEventListener("load", llamadoApi);
button.addEventListener("click", llamadoApi);