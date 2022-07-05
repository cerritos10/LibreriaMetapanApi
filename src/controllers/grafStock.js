const grafStock =  require('express').Router();
const req = require('express/lib/request');
const res = require('express/lib/response');
const db = require('../conexion');

grafStock.get('/mas', (req, res) =>{
    db.query('SELECT nombre_producto, descripcion, stock FROM producto ORDER BY stock DESC LIMIT 5', (err, data) =>{
        if(err || Object.keys(data).length === 0){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se han podido realizar la operacion`
            });
        }
        res.json({
            data
        })
    })
});

grafStock.get('/menos', (req, res) =>{
    db.query('SELECT nombre_producto, descripcion, stock FROM producto ORDER BY stock ASC LIMIT 5', (err, data) =>{
        if(err || Object.keys(data).length === 0){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se han podido realizar la operacion`
            });
        }
        res.json({
            data
        })
    })
}) 


module.exports = grafStock;