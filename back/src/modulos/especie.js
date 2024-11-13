// modulo para administrar la info de los ciudadanos

const express = require("express");

const bd = require("./bd.js"); // instanciamos la  conexion de la base de datos

const especieCiudadano = express();

especieCiudadano.get("/api/especieCiudadano/listarTodasEspecies", (req, res) => {
  let consulta = "SELECT * FROM especie_ciudadano";
  bd.query(consulta, (error, especie) => {
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
        especie: especie
      });
    }
  });
});

especieCiudadano.get("/api/especieCiudadano/listarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "SELECT * FROM especie_ciudadano WHERE idespecie_ciudadano  = ?";
  bd.query(consulta, [id], (error, especie) => {
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
        especie: especie
      });
    }
  });
});

especieCiudadano.post("/api/especieCiudadano/crearEspecie", (req, res) => {
  let formDatosDeEspecie = {
    nombre: req.body.nombre
  };

  let consulta = "INSERT INTO especie_ciudadano SET ? ";
  bd.query(consulta, [formDatosDeEspecie], (error, especie) => {
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
        especie: especie
      });
    }
  });
});
especieCiudadano.delete("/api/especieCiudadano/borrarPorId/:id", (req, res) => {
  let id = req.params.id;
  let consulta = "DELETE FROM especie_ciudadano WHERE idespecie_ciudadano = ? ";
  bd.query(consulta, [id], (error, especie) => {
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
        especie: especie
      });
    }
  });
});
especieCiudadano.put("/api/especieCiudadano/editarEspeciePorId/:id", (req, res) => {
  let id = req.params.id;
  let formDatosDeEspecie = {
    nombre: req.body.nombre
  };
  let consulta = "UPDATE especie_ciudadano SET ? WHERE idespecie_ciudadano  = ?";
  bd.query(consulta, [formDatosDeEspecie, id], (error, especie) => {
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
        especie: especie
      });
    }
  });
});

module.exports = especieCiudadano;
