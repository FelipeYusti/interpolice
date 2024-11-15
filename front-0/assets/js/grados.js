// interacciones con la tabla aprendiz

let tablaPersona = document.querySelector("#mitabla");
let frmGrado = document.querySelector("#frmGrado");
let nombreRol = document.querySelector("#nombreGrado");

//Llmamos el metodo de modal de boostrap
const frmCrearGrado = new bootstrap.Modal(document.getElementById("frmCrearGrado"));
let btnNuevo = document.querySelector("#btnNuevo");

let api = "http://localhost:4100/api/grado/";

let accionForm = "";
btnNuevo.addEventListener("click", () => {
  accionForm = "agregar";
  frmCrearGrado.show();
});

const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

function listarGrados() {
  fetch(api + "listarGrados")
    .then((res) => res.json())
    .then((res) => {
      

      res.grados.forEach((grados) => {
        let fila =
          ` <tr>
          <td>${grados.id}</td>
          <td>${grados.grado}</td>   
          <td><a type="button" class="btnEditar btn btn-success" onclick="obtenerID(${
            grados.id
          },'editar') " ><i class="bi bi-pencil-square"></i></a></td>
          <td><a type="button" class="btnBorrar btn btn-danger" onclick="obtenerID(${
            grados.id
          },'eliminar') "  ><i class="bi bi-trash"></i></a></td>
          </tr> ` + "</br>";

        tablaPersona.innerHTML += fila;
      });
    });
}

frmGrado.addEventListener("submit", (e) => {
  e.preventDefault(); // previene el evento por defecto de los formularios

  if (accionForm == "agregar") {
    fetch(api + "crearGrado", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: nombreRol.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        location.reload();
      });
  } else if (accionForm == "editar") {
    fetch(api + "editarPorId" + idFila + "", {
      method: "PUT",
      // configuramos la cabecera, Header de peticion lleva una configuracin : contiene un archivo JS a JSON
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: nombreRol.value
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
        res.grados.map((grados) => {
          nombreGrado.value = grados.grado;
        });
      });
      frmCrearGrado.show();


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
listarGrados();
