// interacciones con la tabla CITYZEN

let tablaUsuarios = document.querySelector("#mitabla");

let usuario = document.querySelector("#TxtUsuario");
let pass = document.querySelector("#TxtPass");
let frmUsuario = document.querySelector("#frmUsuario");
let rol = document.querySelector(".rol");
let selectRol = document.querySelector("#rol");

//Llmamos el metodo de modal de boostrap
const frmCrearUsuarios = new bootstrap.Modal(document.getElementById("frmCrearUsuario"));
let btnNuevo = document.querySelector("#btnNuevo");

let api = "http://localhost:4100/api/usuario/";

let APIroles = "http://localhost:4100/api/roles/";

function roles() {
  fetch(APIroles + "listarRoles")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
      res.roles.map((rol) => {
        let options =
          `
            <option value="${rol.idrol}">${rol.nombre}</option>
            ` + "</br>";

        selectRol.innerHTML += options;
      });
    });
}

let accion = "";
btnNuevo.addEventListener("click", () => {
  frmCrearUsuarios.show();
});

const on = (element, event, selector, handler) => {
  element.addEventListener(event, (e) => {
    if (e.target.closest(selector)) {
      handler(e);
    }
  });
};

function listarCityzen() {
  fetch(api + "listarUsuarios")
    .then((res) => res.json())
    .then((res) => {
      console.log(res);

      res.usuarios.forEach((usuario) => {
        let fila =
          ` <tr>
          <td>${usuario.idusuarios}</td>
          <td>${usuario.nombre}</td>
          <td>${usuario.rol_idrol}</td>
          <td><a type="button" class="btnEditar btn btn-success"><i class="bi bi-pencil-square"></i></a></td>
          <td><a type="button" class="btnBorrar btn btn-danger"><i class="bi bi-trash"></i></a></td>
          </tr> ` + "</br>";

        tablaUsuarios.innerHTML += fila;
      });
    });
}

frmUsuario.addEventListener("submit", (e) => {
  e.preventDefault(); // previene el evento por defecto de los formularios

  fetch(api + "crearUsuario", {
    method: "POST",
    // configuramos la cabecera, Header de peticion lleva una configuracin : contiene un archivo JS a JSON
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      nombre: usuario.value,
      pass: pass.value,
      rol_idrol: rol.value
    })
  })
    .then((res) => res.json())
    .then((res) => {
      console.log(res);
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
listarCityzen();
roles();
