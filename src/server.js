require('../src/conexion');

const express = require('express');
const PORT = process.env.PORT || 3000;

//Llamado de express
const app = express();

//Configuracion para recibir informacion en el body de la api
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//Rutas del proyecto
app.use('/categorias', require('../src/controllers/categorias'))

//Conexion de puerto
app.listen(PORT, () => {
    console.log('El servidor esta corriendo en el puesto: ' + PORT)
});