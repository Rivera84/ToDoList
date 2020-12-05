// Importamos las dependencias necesarias para crear la API
var express = require("express");
var router = express.Router();

// Importar libreria dotenv para manejar las variables de entorno de nuestro servidor
require("dotenv").config({ path: "variables.env" });

// Importamos Mongoose para realizar la conexion con la BD
const mongoose = require("mongoose");

// Importamos el modelo de tareas para poderlo utilizar en la API
const Tarea = require("../../models/tareas");

// Realizamos la conexión al cluster de MongoDB
// ==== NOTA: Utilizaremos variables de entorno para evitar que la información confidencial
// ====       de nuestro usuario de Mongo Atlas se vea afectada por terceros.
try {
  mongoose.connect(process.env.MONGOCONNECTION, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  });
  console.log("Conectado a MongoDB");
} catch (error) {
  console.log("Ocurrió un error al conectarse a la base de datos: " + error);
}

module.exports = router;