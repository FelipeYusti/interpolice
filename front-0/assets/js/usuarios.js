// interacciones con la tabla CITYZEN

let tablaUsuarios = document.querySelector("#mitabla");

let usuario = document.querySelector("#TxtUsuario");
let pass = document.querySelector("#TxtPass");
let frmUsuario = document.querySelector("#frmUsuario");
let rol = document.querySelector(".rol");
let selectRol = document.querySelector("#rol");
let accionForm = "";
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

btnNuevo.addEventListener("click", () => {
  accionForm = "agregar";
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
          <td>${usuario.rol}</td>
          <td><a type="button" class="btnEditar btn btn-success" onclick="obtenerID(${usuario.idusuarios},'editar') " ><i class="bi bi-pencil-square"></i></a></td>
          <td><a type="button" class="btnBorrar btn btn-danger" onclick="obtenerID(${usuario.idusuarios},'eliminar') "><i class="bi bi-trash"></i></a></td>
          </tr> ` + "</br>";

        tablaUsuarios.innerHTML += fila;
      });
    });
}

frmUsuario.addEventListener("submit", (e) => {
  e.preventDefault(); // previene el evento por defecto de los formularios

  if (accionForm === "agregar") {
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
    usuario.value = "";
    pass.value = "";
    location.reload();
  } else if (accionForm == "editar") {
    fetch(api + "editarPorId/" + idFila + "", {
      method: "PUT",
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
        res.usuarios.map((usuarios) => {
          usuario.value = usuarios.nombre;
          pass.value = usuarios.password;
        });
      });
    frmCrearUsuarios.show();
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
roles();
