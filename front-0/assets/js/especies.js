// interacciones con la tabla aprendiz

let tablaEspecie = document.querySelector("#mitabla");
let frmEspecie = document.querySelector("#frmEspecie");
let nombreEspecie = document.querySelector("#nombreEspecie");

//Llmamos el metodo de modal de boostrap
const frmCrearEspecie = new bootstrap.Modal(document.getElementById("frmCrearEspecie"));
let btnNuevo = document.querySelector("#btnNuevo");

let api = "http://localhost:4100/api/especieCiudadano/";

let accionForm = "";
btnNuevo.addEventListener("click", () => {
  accionForm = "agregar";
  frmCrearEspecie.show();
});

const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

function listarEspecie() {
  fetch(api + "listarTodasEspecies")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      res.especie.forEach((especie) => {
        let fila =
          ` <tr>
          <td>${especie.idespecie_ciudadano}</td>
          <td>${especie.nombre}</td>   
          <td><a type="button" class="btnEditar btn btn-success" onclick="obtenerID(${especie.idespecie_ciudadano},'editar') " ><i class="bi bi-pencil-square"></i></a></td>
          <td><a type="button" class="btnBorrar btn btn-danger" onclick="obtenerID(${especie.idespecie_ciudadano},'eliminar') "  ><i class="bi bi-trash"></i></a></td>
          </tr> ` + "</br>";

        tablaEspecie.innerHTML += fila;
      });
    });
}

frmEspecie.addEventListener("submit", (e) => {
  e.preventDefault(); // previene el evento por defecto de los formularios

  if (accionForm == "agregar") {
    fetch(api + "crearEspecie", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: nombreEspecie.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        location.reload();
      });
  } else if (accionForm == "editar") {
    fetch(api + "editarEspeciePorId/" + idFila + "", {
      method: "PUT",
      // configuramos la cabecera, Header de peticion lleva una configuracin : contiene un archivo JS a JSON
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombreEspecie: nombreEspecie.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        location.reload();
      });
  }
});
function obtenerID(id, traerAccion) {
  // traemos el ID y la accion correspondiente del los botones Editar y Borrar
  if (traerAccion === "editar") {
    idFila = id;
    accionForm = "editar";
    fetch(api + "listarPorId/" + id + "", {})
      .then((res) => res.json())
      .then((res) => {
        res.especie.map((especie) => {
          nombreEspecie.value = especie.nombre;
        });
      });
    frmCrearEspecie.show();
  } else if (traerAccion === "eliminar") {
    idFila = id;
    let respuesta = window.confirm(`Seguro que desea borrar el registro con el id: ${idFila}`);
    if (respuesta) {
      fetch(api + "borrarPorId/" + id + "", {
        method: "DELETE"
      })
        .then((res) => res.json())
        .then((res) => {
          console.log(res);
          location.reload();
        });
    }
  }
}
listarEspecie();
