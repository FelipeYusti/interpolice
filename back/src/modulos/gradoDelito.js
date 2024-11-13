// modulo para administrar la info de los ciudadanos

const express = require("express");

const bd = require("./bd.js"); // instanciamos la  conexion de la base de datos

const grado = express();

grado.get("/api/grado/listarGrados", (req, res) => {
  let consulta = "SELECT * FROM grado_delito";
  bd.query(consulta, (error, grados) => {
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
        grados: grados
      });
    }
  });
});

grado.get("/api/grado/listarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "SELECT * FROM grado_delito WHERE id  = ?";
  bd.query(consulta, [id], (error, grados) => {
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
        grados: grados
      });
    }
  });
});

grado.post("/api/grado/crearGrado", (req, res) => {
  let formDatosDeGrado = {
    grado: req.body.nombre
  };

  let consulta = "INSERT INTO grado_delito SET ? ";
  bd.query(consulta, [formDatosDeGrado], (error, grados) => {
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
        grados: grados
      });
    }
  });
});
grado.delete("/api/grado/borrarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "DELETE FROM grado_delito WHERE id = ? ";
  bd.query(consulta, [id], (error, grados) => {
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
        grados: grados
      });
    }
  });
});
grado.put("/api/grado/editarRolPorId/:id", (req, res) => {
  let id = req.params.id;
  let formDatosDeGrado = {
    grado: req.body.gradoDelito
  };
  let consulta = "UPDATE grado_delito SET ? WHERE id = ?";
  bd.query(consulta, [formDatosDeGrado, id], (error, grados) => {
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
        grados: grados
      });
    }
  });
});

module.exports = grado;
