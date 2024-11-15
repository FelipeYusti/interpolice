// interacciones con la tabla aprendiz

let tablaPersona = document.querySelector("#mitabla");
let frmDelito = document.querySelector("#frmTipoDelito");
let nombreDelito = document.querySelector("#TxtTipoDelito");
let gradoDelito = document.querySelector("#grado");
let selectGrado = document.querySelector(".grado");

//Llmamos el metodo de modal de boostrap
const frmCrearDelito = new bootstrap.Modal(document.getElementById("frmCrearDelito"));
let btnNuevo = document.querySelector("#btnNuevo");

let api = "http://localhost:4100/api/delito/";

let APIgrado = "http://localhost:4100/api/grado/";

function grados() {
  fetch(APIgrado + "listarGrados")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      res.grados.map((grados) => {
        let options =
          `
            <option value="${grados.id}">${grados.grado}</option>
            ` + "</br>";

        selectGrado.innerHTML += options;
      });
    });
}
let accionForm = "";
btnNuevo.addEventListener("click", () => {
  accionForm = "agregar";
  frmCrearDelito.show();
});

const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

function listarDelitos() {
  fetch(api + "listarTodosDelitos")
    .then((res) => res.json())
    .then((res) => {
      res.delitos.forEach((delitos) => {
        let fila =
          ` <tr>
          <td>${delitos.idtipo_delito}</td>
          <td>${delitos.delito}</td> 
          <td>${delitos.grado}</td>   
          <td><a type="button" class="btnEditar btn btn-success" onclick="obtenerID(${delitos.idtipo_delito},'editar')"  ><i class="bi bi-pencil-square"></i></a></td>
          <td><a type="button" class="btnBorrar btn btn-danger" onclick="obtenerID(${delitos.idtipo_delito},'eliminar')" ><i class="bi bi-trash"></i></a></td>
          </tr> ` + "</br>";

        tablaPersona.innerHTML += fila;
      });
    });
}

frmDelito.addEventListener("submit", (e) => {
  e.preventDefault(); // previene el evento por defecto de los formularios

  if (accionForm === "agregar") {
    fetch(api + "crearDelito", {
      method: "POST",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        delito: nombreDelito.value,
        grado_id: gradoDelito.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        location.reload();
      });
  } else if (accionForm == "editar") {
    fetch(api + "editarPorId/" + idFila + "", {
      method: "PUT",
      // configuramos la cabecera, Header de peticion lleva una configuracin : contiene un archivo JS a JSON
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        delito: nombreDelito.value,
        grado_id: gradoDelito.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        location.reload();
      });
  }
});

// Metodo de UPDATE Y DELETE
function obtenerID(id, traerAccion) {
  // traemos el ID y la accion correspondiente del los botones Editar y Borrar
  if (traerAccion === "editar") {
    idFila = id;
    accionForm = "editar";

    fetch(api + "listarPorId/" + id + "", {})
      .then((res) => res.json())
      .then((res) => {
        res.delitos.map((delitos) => {
          nombreDelito.value = delitos.delito;

        });
      });
    frmCrearDelito.show();
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
listarDelitos();
grados();