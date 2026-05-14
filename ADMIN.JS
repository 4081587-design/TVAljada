let datos = [];

async function cargar(){
  const res = await fetch("data.json");
  datos = await res.json();
  render();
}

function guardar(){

  const item = {
    archivo: document.getElementById("archivo").value,
    tipo: document.getElementById("tipo").value,
    duracion: parseInt(document.getElementById("duracion").value),
    inicio: document.getElementById("inicio").value,
    fin: document.getElementById("fin").value
  };

  datos.push(item);

  render();
  descargarJSON();
}

function render(){

  const lista = document.getElementById("lista");
  lista.innerHTML = "";

  datos.forEach((d, i) => {
    lista.innerHTML += `
      <li>${d.tipo} - ${d.archivo} (${d.duracion}s)</li>
    `;
  });
}

function descargarJSON(){

  const blob = new Blob([JSON.stringify(datos, null, 2)], {
    type: "application/json"
  });

  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "data.json";
  a.click();
}

cargar();