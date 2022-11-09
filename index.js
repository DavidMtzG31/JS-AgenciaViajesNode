/* const express = require('express');  Version common js */
import express from "express";
import router from "./routes/index.js"; /* Importanto roter */
import db from "./config/db.js";
import dotenv from 'dotenv';

dotenv.config();
console.log(process.env.DB_HOST)

const app = express();

// Conectar la db
db.authenticate()
  .then(() => {
    console.log("Base de datos conectada");
  })
  .catch((error) => console.log(error));

// Definir puerto
const port = process.env.PORT || 4000;

// Habilitar PUG
app.set("view engine", "pug");

//Obtener el año actual
app.use((req, res, next) => {
  const year = new Date();

  res.locals.ActualYear = year.getFullYear();
  res.locals.nombreSitio = "Agencia De Viajes";

  next();
});

// Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended: true}));

// Definir la carpeta pública
app.use(express.static("public"));

// Agregar router
app.use("/", router);

app.listen(port, () => {
  console.log(`El servidor está funcionando en el puerto ${port}`);
});
