// interacciones con la tabla CITYZEN

let tablaPersona = document.querySelector("#mitabla");
let frmCityzen = document.querySelector("#frmCityzen");
let nombreCityzen = document.querySelector("#TxtNombre");
let apellidoCityzen = document.querySelector("#TxtApellido");
let apodoCityzen = document.querySelector("#TxtApodo");
let emailCityzen = document.querySelector("#TxtEmail");
let fechanace = document.querySelector("#TxtFechaNacimiento");
let especieCityzen = document.querySelector(".especie");
let selectEspecies = document.querySelector("#especie");

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

let accion = "";
btnNuevo.addEventListener("click", () => {
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
      console.log(res);

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
          <td><a type="button" class="btnEditar btn btn-success"><i class="bi bi-pencil-square"></i></a></td>
          <td><a type="button" class="btnBorrar btn btn-danger"><i class="bi bi-trash"></i></a></td>
          </tr> ` + "</br>";

        tablaPersona.innerHTML += fila;
      });
    });
}
// enviar datos por el formulario, el request lleva un payload que es la data de los formulario.
// metodo POST
frmCityzen.addEventListener("submit", (e) => {
  e.preventDefault(); // previene el evento por defecto de los formularios

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
    
      console.log(res);
    });
    console.log("la especie es: "+especieCityzen.value);
  /* else if (accion == "editar") {
    fetch(api + "editarPorId" + idFila + "", {
      method: "POST",
      // configuramos la cabecera, Header de peticion lleva una configuracin : contiene un archivo JS a JSON
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        nombre: nombre.value,
        apellidos: apellido.value,
        email: email.value,
        apodo: apodo.value,
        foto: email.value,
        fechanace: fechanace.value,
        especie_ciudadano_idespecie_ciudadano: especieCityzen.value
      })
    })
      .then((res) => res.json())
      .then((res) => {
        alert("Exitosooooo!");
      });
  } */
});

on(document, "click", ".btnBorrar", (e) => {
  let fila = e.target.parentNode.parentNode.parentNode;
  let idFila = fila.firstElementChild.innerText;
  let respuesta = window.confirm(`Seguro que desea borrar el registro con el id: ${idFila}`);

  if (respuesta) {
    fetch(api + "borrarPorId/" + idFila + "", {
      method: "DELETE"
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        location.reload();
      });
  }
});

// METODO EDITAR

on(document, "click", ".btnEditar", (e) => {
  let fila = e.target.parentNode.parentNode.parentNode;
  let idFila = fila.firstElementChild.innerText;

  fetch(api + "editarPorId/" + idFila + "")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      location.reload();
    });
});
listarCityzen();
especies();
