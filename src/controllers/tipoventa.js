/**
 * Servicio de tipo de venta, ver tipos de venta
 * @params reques, id, solicita el id o los datos del cliente
 * @returns response data, retorna datos o errores
 * @author Josue Cruz
 */

const tipoventa = require('express').Router()
//Parametro de entrada
const req = require('express/lib/request');
//Parametro de salida
const res = require('express/lib/response');
const db = require('../conexion');
const cors = require('cors');

tipoventa.get('/', (req, res) =>{
    db.query('SELECT * FROM tipoventa', (err, data) =>{
        if(err || Object.keys(data).length === 0){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se han podido encontrar ningun tipo de venta registrado`
            });
        }
        res.json({
            data
        })
    })
}) 

//Consulta de clientes por especifico
tipoventa.get('/:id', (req, res)=>{
    const {id} = req.params;
    db.query('SELECT * FROM `tipoventa` WHERE id_tipoVenta = ?', [id], (err, data)=>{
        if (Object.keys(data).length === 0 || err ) {
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido localizar ningun tipo de venta`
            });
        }
        else{
            res.json({
                data
            })
        }
    })
})

module.exports = tipoventa;