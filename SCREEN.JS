const pantalla = document.getElementById("pantalla");

let contenido = [];
let actual = 0;

async function cargarJSON(){
  const res = await fetch("data.json");
  contenido = await res.json();
  play();
}

function play(){
  if(contenido.length === 0) return;
  mostrar(contenido[actual]);
}

function mostrar(item){

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

    setTimeout(siguiente, item.duracion * 1000);
  }

  if(item.tipo === "video"){
    const video = document.createElement("video");
    video.src = item.archivo;
    video.autoplay = true;
    video.muted = true;
    video.playsInline = true;

    video.onended = siguiente;

    pantalla.appendChild(video);
  }
}

function siguiente(){
  actual++;

  if(actual >= contenido.length){
    actual = 0;
  }

  mostrar(contenido[actual]);
}

cargarJSON();