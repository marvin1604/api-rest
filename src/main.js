const API = "https://pokeapi.co/api/v2/pokemon/";

// https://pokeapi.co/api/v2/pokemon/1/

const img = document.querySelector(".pokemon");
const button = document.querySelector(".button1");
const namePokemon = document.querySelector(".name-pokemon")
const tipoPokemon = document.querySelector(".tipo");
const buttonSave = document.querySelector(".button2");
const nodoFavoritos = document.querySelector(".container-favoritos");

/* elements bar*/
const pokePs = document.querySelector(".ps");
const pokeDmg = document.querySelector(".dmg");
const pokDfs = document.querySelector(".dfs");
const spAtack = document.querySelector(".sp-atack");
const pokeSpeed = document.querySelector(".speed");
const spDefen = document.querySelector(".sp-defense");






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

    // console.log(data.sprites);
    /* obteniendo stats de pokemon*/
    [pokePs, pokeDmg, pokDfs, spAtack, pokeSpeed, spDefen].map(
        (node, index) => {
            node.style.width = `${data.stats[index].base_stat*100/170}%`
            node.textContent = data.stats[index].base_stat;
        }
        )


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

    buttonSave.onclick = () => saveFavorites(nombre, figura);
}


function saveFavorites(nombre,figura){
    console.log("pokemon Guardado");
    // console.log(nombre, figura);
    favorito.push({nombre, figura})
    // console.log(favorito);
    showFavorites();
}

function showFavorites(){
    console.log(favorito);
    console.log("holi");
    favorito.forEach((elemento)=>{
        console.log(elemento);
        const nombreFavorito = document.createElement("p");
        const imagenFavorito = document.createElement("img");
        const cardFavorito = document.createElement("div");
        cardFavorito.className = "card-favorito";

        nombreFavorito.innerText = elemento.nombre;
        imagenFavorito.src = elemento.figura;
        imagenFavorito.style = "width: 250px";

        cardFavorito.append(nombreFavorito, imagenFavorito)
        nodoFavoritos.append(cardFavorito);
    })
    
}

// function eliminar(){
//     favorito
// }


window.addEventListener("load", llamadoApi);
button.addEventListener("click", llamadoApi); 
showFavorites();
// buttonSave.addEventListener("click",saveFavorites);