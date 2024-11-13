// modulo para administrar la info de los ciudadanos

const express = require("express");

const bcrypt = require("bcryptjs"); // instanciamos la libreria bcrypt para encriptar la password

const bd = require("./bd.js"); // instanciamos la  conexion de la base de datos

const usuario = express();

usuario.get("/api/usuario/listarUsuarios", (req, res) => {
  let consulta = "SELECT * FROM usuarios";
  bd.query(consulta, (error, usuarios) => {
    if (error) {
      res.send({
        status: "Error",
        message: "Ocurrio un error en la consulta",
        error: error
      });
    } else {
      res.send({
        status: "Ok",
        message: "¡Consulta Exitosa !",
        usuarios: usuarios
      });
    }
  });
});

usuario.get("/api/usuario/listarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "SELECT * FROM usuarios WHERE idusuarios  = ?";
  bd.query(consulta, [id], (error, usuarios) => {
    if (error) {
      res.send({
        status: "Error",
        message: "Ocurrio un error en la consulta",
        error: error
      });
    } else {
      res.send({
        status: "Ok",
        message: "¡Consulta Exitosa !",
        usuarios: usuarios
      });
    }
  });
});

usuario.post("/api/usuario/crearUsuario", (req, res) => {
  let formDatosUsuario = {
    nombre: req.body.nombre,
    password: bcrypt.hashSync(req.body.pass,10),
    rol_idrol: req.body.rol_idrol
  };

  let consulta = "INSERT INTO usuarios SET ? ";

  bd.query(consulta, [formDatosUsuario], (error, usuarios) => {
    if (error) {
      res.send({
        status: "Error",
        message: "Ocurrio un error en la consulta",
        error: error
      });
    } else {
      res.send({
        status: "Ok",
        message: "¡Consulta Exitosa !",
        usuarios: usuarios
      });
    }
  });
});
usuario.delete("/api/usuario/borrarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "DELETE FROM usuarios WHERE idusuarios = ? ";
  bd.query(consulta, [id], (error, usuarios) => {
    if (error) {
      res.send({
        Status: "Error",
        Mensaje: "Ocurrio un error en la consulta !",
        error: error
      });
    } else {
      res.send({
        Status: "Ok",
        Mensaje: "Registro borrado con exito !",
        usuarios: usuarios
      });
    }
  });
});
usuario.put("/api/usuario/editarPorId/:id", (req, res) => {
  let id = req.params.id;
  let formDatosUsuario = {
    nombre: req.body.nombre,
    rol_idrol: req.body.rol_idrol,
    password: req.body.pass
  };
  let consulta = "UPDATE usuarios SET ? WHERE idusuarios  = ?";
  bd.query(consulta, [formDatosUsuario, id], (error, usuarios) => {
    if (error) {
      res.send({
        status: "Error",
        message: "Ocurrio un error en la consulta",
        error: error
      });
    } else {
      res.send({
        status: "Ok",
        message: "¡Consulta Exitosa !",
        usuarios: usuarios
      });
    }
  });
});

module.exports = usuario;
