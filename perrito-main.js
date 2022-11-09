console.log("a codear")
const API = "https://api.thedogapi.com/v1/images/search";

const img = document.querySelector(".perrito");
const button = document.querySelector(".button");

fetch(API)
    .then(response => response.json())
    .then(data =>{
        llamadoApi();

    })

const llamadoApi = () =>{
    img.src = data[0].url;
    img.style = "width: 500px"
}

window.addEventListener("load", llamadoApi);
button.addEventListener("click", llamadoApi);