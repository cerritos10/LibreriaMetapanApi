require('../src/conexion');

const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 3000;

//Llamado de express
const app = express();

//Configuracion para recibir informacion en el body de la api
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(cors());

//Rutas del proyecto
app.use('/api/categorias', require('../src/controllers/categorias'))
app.use('/api/roles', require('../src/controllers/roles'))
app.use('/api/marcas', require('../src/controllers/marcas'))
app.use('/api/clientes', require('../src/controllers/clientes'))
app.use('/api/tipoventa', require('../src/controllers/tipoventa'))
app.use('/api/compra', require('../src/controllers/compra'))
app.use('/api/detallecompra', require('../src/controllers/detallecompra'))

//Conexion de puerto
app.listen(PORT, () => {
    console.log('El servidor esta corriendo en el puesto: ' + PORT)
});