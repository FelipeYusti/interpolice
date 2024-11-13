// modulo para administrar la info de los ciudadanos

const express = require("express");

const bd = require("./bd.js"); // instanciamos la  conexion de la base de datos

const delito = express();

delito.get("/api/delito/listarTodosDelitos", (req, res) => {
  let consulta = "SELECT * FROM tipo_delito";
  bd.query(consulta, (error, delitos) => {
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
        delitos: delitos
      });
    }
  });
});

delito.get("/api/delito/listarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "SELECT * FROM tipo_delito WHERE idtipo_delito = ?";
  bd.query(consulta, [id], (error, delitos) => {
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
        delitos: delitos
      });
    }
  });
});

delito.post("/api/delito/crearDelito", (req, res) => {
  /* req.body. */
  let formDatosDelito = {
    delito: req.body.delito
  };

  let consulta = "INSERT INTO tipo_delito SET ? ";
  bd.query(consulta, [formDatosDelito], (error, delito) => {
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
        delito: delito
      });
    }
  });
});
delito.delete("/api/delito/borrarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "DELETE FROM tipo_delito WHERE idtipo_delito = ? ";
  bd.query(consulta, [id], (error, respuesta) => {
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
        respuesta: respuesta
      });
    }
  });
});
delito.put("/api/delito/editarPorId/:id", (req, res) => {
  let id = req.params.id;
  let formDatosDelito = {
    delito: req.body.delito
  };
  let consulta = "UPDATE tipo_delito SET ? WHERE idtipo_delito = ?";
  bd.query(consulta, [formDatosDelito, id], (error, respuesta) => {
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
        respuesta: respuesta
      });
    }
  });
});

module.exports = delito;
