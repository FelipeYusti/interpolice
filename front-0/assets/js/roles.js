// interacciones con la tabla aprendiz

let tablaPersona = document.querySelector("#mitabla");
let frmRol = document.querySelector("#frmRol");
let nombreRol = document.querySelector("#nombreRol");

//Llmamos el metodo de modal de boostrap
const frmCrearRol = new bootstrap.Modal(document.getElementById("frmCrearRol"));
let btnNuevo = document.querySelector("#btnNuevo");

let api = "http://localhost:4100/api/roles/";

let accion = "";
btnNuevo.addEventListener("click", () => {
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
          <td><a type="button" class="btnEditar btn btn-success"><i class="bi bi-pencil-square"></i></a></td>
          <td><a type="button" class="btnBorrar btn btn-danger"><i class="bi bi-trash"></i></a></td>
          </tr> ` + "</br>";

        tablaPersona.innerHTML += fila;
      });
    });
}

frmRol.addEventListener("submit", (e) => {
  e.preventDefault(); // previene el evento por defecto de los formularios

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
      location.reload();
    });

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
listarRoles();
