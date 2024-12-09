// interacciones con la tabla CITYZEN

let tablaCityzen = document.querySelector("#mitabla");
let frmCityzen = document.querySelector("#frmCityzen");
let nombreCityzen = document.querySelector("#TxtNombre");
let apellidoCityzen = document.querySelector("#TxtApellido");
let apodoCityzen = document.querySelector("#TxtApodo");
let emailCityzen = document.querySelector("#TxtEmail");
let fechanace = document.querySelector("#TxtFechaNacimiento");
let especieCityzen = document.querySelector(".especie");
let selectEspecies = document.querySelector("#especie");
let idFila = 0;
let accionForm = "";

//Llmamos el metodo de modal de boostrap
const frmCrearCityzen = new bootstrap.Modal(document.getElementById("frmCityzen"));
let btnNuevo = document.querySelector("#btnNuevo");

let api = "http://localhost:4100/api/cityzen/";

let APIespecies = "http://localhost:4100/api/especieCiudadano/";

function especies() {
  fetch(APIespecies + "listarTodasEspecies")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      res.especie.map((especie) => {
        let options =
          `
            <option value="${especie.idespecie_ciudadano}">${especie.nombre}</option>
            ` + "</br>";

        selectEspecies.innerHTML += options;
      });
    });
}

btnNuevo.addEventListener("click", () => {
  accionForm = "agregar";
  frmCrearCityzen.show();
});

const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

function listarCityzen() {
  fetch(api + "listarTodos")
    .then((res) => res.json())
    .then((res) => {
      res.cityzen.forEach((cityzen) => {
        let fila =
          ` <tr>
          <td>${cityzen.id}</td>
          <td>${cityzen.nombre}</td>
          <td>${cityzen.apellidos}</td>
          <td>${cityzen.apodo}</td>
          <td>${cityzen.email}</td>
          <td>${cityzen.fechanace.slice(0, 10)}</td>
          <td>${cityzen.especie}</td>
          <td><a type="button" class="btnEditar btn btn-success" onclick="obtenerID(${
            cityzen.id
          },'editar') "><i class="bi bi-pencil-square"></i></a></td>
          <td><a type="button" class="btnBorrar btn btn-danger" 
          onclick="obtenerID(${cityzen.id},'eliminar')"><i class="bi bi-trash"></i></a></td>
          </tr> ` + "</br>";

          tablaCityzen.innerHTML += fila;
      });
    });
}
// enviar datos por el formulario, el request lleva un payload que es la data de los formulario.
// metodo POST
frmCityzen.addEventListener("submit", (e) => {
  e.preventDefault(); // previene el evento por defecto de los formularios

  if (accionForm == "agregar") {
    fetch(api + "crearCiudadano", {
      method: "POST",
      // configuramos la cabecera, Header de peticion lleva una configuracin : contiene un archivo JS a JSON
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: nombreCityzen.value,
        apellidos: apellidoCityzen.value,
        email: emailCityzen.value,
        apodo: apodoCityzen.value,
        foto: "",
        fechanace: fechanace.value,
        especie: especieCityzen.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        location.reload();
        console.log(res);
      });
  } else if (accionForm == "editar") {
    fetch(api + "editarPorId/" + idFila + "", {
      method: "PUT",

      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: nombreCityzen.value,
        apellidos: apellidoCityzen.value,
        email: emailCityzen.value,
        apodo: apodoCityzen.value,
        foto: "",
        fechanace: fechanace.value,
        especie: especieCityzen.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      });
  }
});


// METODO EDITAR y borrar
function obtenerID(id, traerAccion) {

  // traemos el ID y la accion correspondiente del los botones Editar y Borrar
  if (traerAccion === "editar") {
    idFila = id;
    accionForm = "editar";
    fetch(api + "listarPorId/" + id + "", {})
      .then((res) => res.json())
      .then((res) => {
        res.cityzen.map((cityzen) => {
          nombreCityzen.value = cityzen.nombre;
          apellidoCityzen.value = cityzen.apellidos;
          emailCityzen.value = cityzen.email;
          apodoCityzen.value = cityzen.apodo;
          let fechaDb = new Date(cityzen.fechanace);
          const fechaFormateada = fechaDb.toLocaleDateString("es-CO", {
            timeZone: "UTC"
          });
          fechanace.value = fechaFormateada;
        });
      });
    frmCrearCityzen.show();


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
listarCityzen();
especies();
