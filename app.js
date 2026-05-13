const pantalla = document.getElementById("pantalla");

let contenido = [];
let actual = 0;

async function cargarJSON(){

  const respuesta = await fetch("data.json");

  contenido = await respuesta.json();

  iniciarRotacion();
}

function iniciarRotacion(){

  if(contenido.length === 0) return;

  mostrarContenido(contenido[actual]);
}

function mostrarContenido(item){

  pantalla.innerHTML = "";

  const ahora = new Date();

  const inicio = new Date(item.inicio);
  const fin = new Date(item.fin);

  if(ahora < inicio || ahora > fin){

    siguiente();
    return;
  }

  if(item.tipo === "imagen"){

    const img = document.createElement("img");

    img.src = item.archivo;

    pantalla.appendChild(img);
  }

  if(item.tipo === "video"){

    const video = document.createElement("video");

    video.src = item.archivo;

    video.autoplay = true;
    video.muted = true;

    pantalla.appendChild(video);
  }

  setTimeout(() => {

    siguiente();

  }, item.duracion * 1000);
}

function siguiente(){

  actual++;

  if(actual >= contenido.length){

    actual = 0;
  }

  mostrarContenido(contenido[actual]);
}

cargarJSON();