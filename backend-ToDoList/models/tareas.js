// Importamos la dependencia de mongoose
const mongoose = require('mongoose');

// Creamos el objeto Schema que utiliza mongo
const Schema = mongoose.Schema;

// Creamos el esquema de las tareas, según lo necesario para la aplicacion Web
const Tarea = new Schema({
    titulo: String,
    descripcion: String,
    estado: String,
    idUsuario: String
});

// Definimos el modelo de mongo con la estructura a utilizar
const model = mongoose.model('Tareas', Tarea);

// Exportamos el modelo que se utilizará en la aplicación
module.exports = model;