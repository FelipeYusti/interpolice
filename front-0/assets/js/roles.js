// interacciones con la tabla aprendiz

let tablaRol = document.querySelector("#mitabla");
let frmRol = document.querySelector("#frmRol");
let nombreRol = document.querySelector("#nombreRol");

//Llmamos el metodo de modal de boostrap
const frmCrearRol = new bootstrap.Modal(document.getElementById("frmCrearRol"));
let btnNuevo = document.querySelector("#btnNuevo");

let api = "http://localhost:4100/api/roles/";

let accionForm = "";
btnNuevo.addEventListener("click", () => {
  accionForm = "agregar";
  frmCrearRol.show();
});

const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

function listarRoles() {
  fetch(api + "listarRoles")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      res.roles.forEach((rol) => {
        let fila =
          ` <tr>
          <td>${rol.idrol}</td>
          <td>${rol.nombre}</td>   
          <td><a type="button" class="btnEditar btn btn-success" onclick="obtenerID(${
            rol.idrol
          },'editar') " ><i class="bi bi-pencil-square"></i></a></td>
          <td><a type="button" class="btnBorrar btn btn-danger" onclick="obtenerID(${
            rol.idrol
          },'eliminar') "  ><i class="bi bi-trash"></i></a></td>
          </tr> ` + "</br>";

          tablaRol.innerHTML += fila;
      });
    });
}

frmRol.addEventListener("submit", (e) => {
  e.preventDefault(); // previene el evento por defecto de los formularios

  if (accionForm == "agregar") {
    fetch(api + "crearRol", {
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
    fetch(api + "editarRolPorId/" + idFila + "", {
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
        res.roles.map((roles) => {
          nombreRol.value = roles.nombre;
        });
      });
    frmCrearRol.show();


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
listarRoles();
