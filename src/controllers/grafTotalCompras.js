const grafTotalCompras =  require('express').Router();
const req = require('express/lib/request');
const res = require('express/lib/response');
const db = require('../conexion');


grafTotalCompras.get('/:year', (req, res) =>{
    const {year} = req.params;
    db.query('SELECT MONTH(compra.fecha_compra) AS mes,  SUM(detallecompra.cantidad * detallecompra.precio_compra) AS totalanio FROM detallecompra INNER JOIN compra ON compra.id_compra = detallecompra.id_compra WHERE year(compra.fecha_compra) = ? GROUP BY mes;', [year], (err, data) =>{
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


module.exports = grafTotalCompras;