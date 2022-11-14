const API = "https://pokeapi.co/api/v2/pokemon/";

// https://pokeapi.co/api/v2/pokemon/1/

const img = document.querySelector(".pokemon");
const siguiente = document.querySelector(".siguiente");
const namePokemon = document.querySelector(".name-pokemon")
const tipoPokemon = document.querySelector(".tipo");
const buttonSave = document.querySelector(".guardar");
const nodoFavoritos = document.querySelector(".container-favoritos");
const anterior = document.querySelector(".anterior");
const btnAleatorio = document.querySelector(".aleatorio");

/* elements bar*/
const pokePs = document.querySelector(".ps");
const pokeDmg = document.querySelector(".dmg");
const pokDfs = document.querySelector(".dfs");
const spAtack = document.querySelector(".sp-atack");
const pokeSpeed = document.querySelector(".speed");
const spDefen = document.querySelector(".sp-defense");


let favorito = [];
let pokemonNumero = 1
/* fetch con asyncronismo */
async function llamadoApi(){
    /* Obteniendo imagen y nombre*/
    const response = await fetch(`${API}${pokemonNumero}/`);
    const data = await response.json();

    /* obteniendo stats de pokemon*/
    [pokePs, pokeDmg, pokDfs, spAtack, pokeSpeed, spDefen].map(
        (node, index) => {
            node.style.width = `${data.stats[index].base_stat*100/230}%`
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
    img.className = "imagen-pokedex";
    tipoPokemon.textContent = `Type: ${tipoPoke}`
    tipoPokemon.translate = "yes";
    buttonSave.onclick = () => saveFavorites(nombre, figura, pokemonNumero);
}

/* funcion random*/
function showAleatoria(){
    const maximum = 500;
    const minimum = 1;
    const random = () => Math.floor(Math.random()*(maximum-minimum)+minimum);
    // console.log(random());
    pokemonNumero = random();
    llamadoApi();
    return pokemonNumero;
}

//funcion siguiente
function nextPokemon(){
    pokemonNumero += 1;
    if(pokemonNumero >= 501){
        pokemonNumero = 1;
        llamadoApi();
        // console.log(pokemonNumero);
    }else{
        llamadoApi();
        // console.log(pokemonNumero);
    }
    
}

//funcion anterior
function backPokemon(){
    let posicion = pokemonNumero - 1;
    if(posicion <= 0){
        pokemonNumero = 500;
        llamadoApi();
        // console.log(pokemonNumero);
    }else{
        pokemonNumero -= 1;
        llamadoApi();
        // console.log(pokemonNumero);
    }
}

function saveFavorites(nombre,figura){
    console.log("pokemon Guardado");
    // console.log(nombre, figura);
    favorito.push({nombre, figura, pokemonNumero});
    // console.log(favorito);
    showFavorites();
}

function showFavorites(){
    // console.log(favorito);
    // console.log("holi");
    nodoFavoritos.innerHTML = "";
    favorito.forEach((elemento)=>{
        // console.log(elemento);
        const nombreFavorito = document.createElement("p");
        const imagenFavorito = document.createElement("img");
        const cardFavorito = document.createElement("div");
        const btnVer = document.createElement("button");
        const btnDelete = document.createElement("button");
        const containerButtons = document.createElement("div");


        cardFavorito.className = "card-favorito";
        nombreFavorito.innerText = elemento.nombre;
        imagenFavorito.src = elemento.figura;
        imagenFavorito.style = 'width: 250px; max-height: 300px';
        // imagenFavorito.style = 'max-height: 300px';

        btnDelete.innerText = "Eliminar";
        btnDelete.classList = "button-favorito";
        btnDelete.onclick = () => deleteFavorito(elemento);

        btnVer.innerText = "Ver";
        btnVer.classList = "button-favorito";
        //ver pokemon guardado
        btnVer.onclick = () => {
            pokemonNumero = elemento.pokemonNumero;
            llamadoApi();
        }
        
        containerButtons.append(btnVer,btnDelete);
        cardFavorito.append(nombreFavorito, imagenFavorito, containerButtons)
        nodoFavoritos.append(cardFavorito);
    })
    
}

function deleteFavorito(elemento){
    const index = favorito.indexOf(elemento)
    // console.log(index);
    delete(favorito[index]);
    // console.log(favorito);
    showFavorites();
}


window.addEventListener("load", llamadoApi);
siguiente.addEventListener("click", nextPokemon);
anterior.addEventListener("click", backPokemon);
btnAleatorio.addEventListener("click", showAleatoria);
showFavorites();