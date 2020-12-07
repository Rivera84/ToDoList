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
router.get("/ver_tareas", async (req, res, next) => {
  try {
    tareas = await Tarea.find({ idUsuario: 1 });

    res.status(200).json( tareas );
  } catch (error) {
    console.log("Error al consultar en Mongo: " + error);
  }
});

// Endpoint para actualizar la información de una tarea
router.put("/actualizar_tarea", async (req, res) => {
  const id = req.body.id;

  const tarea = await Tarea.findById(id);

  if (!tarea) {
    res.status(404).json({
      msg: "No existe la tarea",
    });
  }

  const datos = req.body;

  delete datos.estado;

  const tareaActualizada = await Tarea.findByIdAndUpdate(id, datos, {
    new: true,
  });

  res.status(200).json({ tarea: tareaActualizada });
});

// Endpoint para eliminar permanentemente una tarea
router.delete("/eliminar_tarea", async (req, res) => {
  const id = req.query.id;

  const tarea = await Tarea.findById(id);

  if (!tarea) {
    res.status(404).json({
      msg: "No existe la tarea",
    });
  }

  await Tarea.findByIdAndDelete(id);

  res.status(200).json({ msj: "Tarea eliminada" });
});

// Endpoint para actualizar el estado de una tarea
router.put("/cambiar_estado_tarea", async (req, res) => {
  const id = req.body.id;

  const tarea = await Tarea.findById(id);

  if (!tarea) {
    res.status(404).json({
      msg: "No existe la tarea",
    });
  }

  const estadoActual = req.body.estado;

  if (estadoActual == "Pendiente") {
    const estado = "Finalizada";
    console.log(estado);
    const tareaActualizada = await Tarea.findByIdAndUpdate(
      id,
      { estado: estado },
      {
        new: true,
      }
    );

    res.status(200).json({ tarea: tareaActualizada });
  } else if (estadoActual == "Finalizada") {
    const estado = "Pendiente";
    const tareaActualizada = await Tarea.findByIdAndUpdate(
      id,
      { estado: estado },
      {
        new: true,
      }
    );

    res.status(200).json({ tarea: tareaActualizada });
  }
});

module.exports = router;
