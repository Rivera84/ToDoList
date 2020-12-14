// Importamos las dependencias necesarias para crear la API
var express = require("express");
var router = express.Router();

// Importar libreria dotenv para manejar las variables de entorno de nuestro servidor
require("dotenv").config({ path: "variables.env" });

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const secret_key = process.env.SECRET_KEY || "prew";

// Importamos Mongoose para realizar la conexion con la BD
const mongoose = require("mongoose");

// Importamos el modelo de tareas para poderlo utilizar en la API
const Tarea = require("../../models/tareas");
const Usuario = require("../../models/usuarios");


//Funcion para enviar correo

function nodemailer(email_user,subject_email, text_email){
//Importar nodemailer
  const nodemailer = require("nodemailer");
  const trasporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'luisrivera084@gmail.com',
      pass: process.env.NODEMAILER
    }
  });

  //Correo
  const mailOptions = {
    from: "ToDoList",
    to: email_user,
    subject: subject_email,
    text: text_email
  };

  //Enviar correo
  trasporter.sendMail(mailOptions, (error, info)=>{
    if(error){
      res.status(500).send(error.message);
    }else{
      console.log("Email enviado");
      res.status(200).jsonp(req.body);
    }
  })
};


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
    tarea.estado = "Pendiente";
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
    tareas = await Tarea.find({ usuario: req.query.usuario });

    res.status(200).json(tareas);
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

  try {
    const tareaActualizada = await Tarea.findByIdAndUpdate(id, datos, {
      new: true,
    });

    res.status(200).json({ tarea: tareaActualizada });
  } catch (error) {
    console.log("Error al actualizar en Mongo: " + error);
  }
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
  const estadoActual = req.body.estado;

  const tarea = await Tarea.findById(id);

  if (!tarea) {
    res.status(404).json({
      msg: "No existe la tarea",
    });
  }

  if (estadoActual == "Pendiente") {
    const estado = "Finalizada";
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

// API que devuelve una sola tarea
router.post("/encontrar_tarea", async (req, res, next) => {
  id = req.body.id;
  try {
    tarea = await Tarea.findById(id);

    res.status(200).json(tarea);
  } catch (error) {
    console.log("Error al consultar en Mongo: " + error);
  }
});

//Agregar usuario
router.post("/registrar_usuario", (req, res, next) => {

  var user = {
    username: req.body.username,
    password: req.body.password,
    email: req.body.email
  };

  Usuario.countDocuments({ username: user.username }, function (err, count) {
    if (count > 0) {
      res.status(400).json({
        msg: "Ya existe una persona registrada con ese usuario",
      });
    } else {

    const subject = "Activar cuenta ToDoList"
     var token = jwt.sign({ username: user.username }, secret_key, {expiresIn: "10m"});
     const LinkValidacion = `Activar cuenta http://localhost:4200/cambiar_contrasena/${token}`;

	    nodemailer(user.email,subject, LinkValidacion);
      bcrypt.hash(user.password, 10).then((hashedPassword) => {
        user.password = hashedPassword;
        create_user(user);
      });
      const create_user = (user) => {
        try {
          console.log(user);
          const usuario = new Usuario(user);
          usuario.save();
          res.status(200).send();
        } catch (error) {
          console.log("Error al insertar en Mongo: " + error);
          res.status(500).send();
        }
      };
    }
  });
});

// Inicio de sesión de usuario
router.post("/iniciar_sesion", async (req, res, next) => {
  var user = {
    usuar: req.body.username,
    contra: req.body.password,
  };

  try {
    VerificarUsuario = await Usuario.find({ username: user.usuar });
    if (VerificarUsuario == "") {
      res.status(400).json({ message: "Usuario o Contraseña Incorrectos" });
    } else {
      bcrypt.compare(
        user.contra,
        VerificarUsuario[0].password,
        (error, isMatch) => {
          if (isMatch) {
            var token = jwt.sign({ userId: VerificarUsuario[0]._id }, secret_key);
            res.status(200).json({ token });
          } else if (error) {
            res.status(400).json(error);            
          } else {
            res
              .status(400)
              .json({ message: "Usuario o Contraseña Incorrectos" });            
          }
        }
      );
    }
  } catch (error) {
    res.status(500).json({message: "Ha ocurrido un error en el servidor"});
    console.log("Ocurrió un error " + error);
  }
});



router.put("/recuperar_contrasena", async (req, res, next) =>{
  const username = req.body.username;
  VerificarUsuario = await Usuario.find({ username: username });
  console.log(username, VerificarUsuario[0].email);
  const idUser = VerificarUsuario[0].id;
  const emailUser = VerificarUsuario[0].email;
  const subject = "Restaurar contraseña ToDoList"
  //console.log("vamos bien");

  Usuario.countDocuments({ username: username }, async function (err, count) {
    if (count > 0) {
     console.log("vamos bien");
     var token = jwt.sign({ username: username }, secret_key, {expiresIn: "10m"});
      const LinkValidacion = `Restaurar contraseña http://localhost:4200/cambiar_contrasena/${token}`;

      //Enviar correo
      nodemailer(emailUser,subject ,LinkValidacion);

     try {
       datos = {resetToken: token}
       const userUpdate = await Usuario.findByIdAndUpdate(idUser, datos, {new:true});
       res.status(200).json({user: userUpdate});
       
     } catch (error) {
       res.status(400).json({message: "Ha ocurrido un error"});
     }
    } else {

    }
  
  });


});

router.put("/cambiar_clave", async (req, res) =>{
  const password = req.body.password;
  const token = req.body.token;
  VerificarUsuario = await Usuario.find({ resetToken: token });
  const idUser = VerificarUsuario[0]._id
  console.log(VerificarUsuario);
  Usuario.countDocuments({ resetToken: token }, async function (err, count) {
    if (count > 0) {
     console.log("vamos bien");
     
     try {
      
      bcrypt.hash(password, 10).then((hashedPassword) => {
        passwordHashed = hashedPassword;
       // create_user(user);
      });
      datos = {password: passwordHashed}
      const userUpdate = await Usuario.findByIdAndUpdate(idUser, datos, {new:true});
      res.status(200).json({user: userUpdate});
      
    } catch (error) {
      res.status(400).json({message: "Ha ocurrido un error"});
    }
 
    } else {

    }
  
  });
  
  //console.log(token);
})


module.exports = router;