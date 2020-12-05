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

// API para agregar una nueva tarea
router.post("/nueva_tarea", async (req, res) => {
  try {
    const tarea = new Tarea(req.body);
    tarea.save();

    res.status(200).json({
      resultado: "Tarea agregada",
    });
  } catch (error) {
    console.log("Error al insertar en Mongo: " + error);
  }
});

// API que devuelve todas las tareas
router.get("/get_tareas", async (req, res, next) => {
  try {
    tareas = await Tarea.find({idUsuario: 1});

    res.status(200).json({ tareas });
  } catch (error) {
    console.log("Error al consultar en Mongo: " + error);
  }
});

module.exports = router;
