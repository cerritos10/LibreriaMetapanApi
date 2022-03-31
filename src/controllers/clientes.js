/**
 * Servicio de clientes, ver, insertar, editar y eliminar clientes
 * @params reques, id, solicita el id o los datos del cliente
 * @returns response data, retorna datos o errores
 * @author Josue Cruz
 */


const clientes = require('express').Router()
//Parametro de entrada
const req = require('express/lib/request');
//Parametro de salida
const res = require('express/lib/response');
const db = require('../conexion');
const cors = require('cors');

//Rutas del los controladores
//Consulta de clientes en general
clientes.get('/', (req, res) =>{
    db.query('SELECT * FROM cliente', (err, data) =>{
        if(err || Object.keys(data).length === 0){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se han podido encontrar ningun cliente registrado`
            });
        }
        res.json({
            data
        })
    })
}) 

//Consulta de clientes por especifico
clientes.get('/:id', (req, res)=>{
    const {id} = req.params;
    db.query('SELECT * FROM cliente WHERE id_cliente = ?', [id], (err, data)=>{
        if (Object.keys(data).length === 0 || err ) {
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido localizar ninguna categoria`
            });
        }
        else{
            res.json({
                data
            })
        }
    })
})

//Insertar clientes
clientes.post('/', (req, res)=>{
    console.log(Object.values(req.body));
    const values = Object.values(req.body);
    const sql = "INSERT INTO cliente (nombre, telefono, sexo) VALUES (?,?,?)";
    db.query(sql, values, (err, insert)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido insertar el cliente`
            });
        }
        res.json({
            Status: 'Success',
            Message: 'El cliente se ha ingresado correctamente!!',
            insert
        })
    })
})

//Actualizar los clientes
clientes.put('/:id', (req, res)=>{
    console.log(Object.values(req.body));
    console.log(req.body);
    const values = Object.values(req.body);
    const ID = req.params.id;
    const client = {
        nombre: req.body.nombre,        
        telefono: req.body.telefono,
        sexo: req.body.sexo
    }
    console.log([ID]);
    const sql = "UPDATE cliente SET nombre='"+ client.nombre +"', telefono='"+ client.telefono+"', sexo= '"+client.sexo+"' WHERE id_cliente = ?";
//    const sql = "UPDATE cliente SET nombre=?, telefono=?, sexo=? WHERE id_cliente = ?";
    db.query(sql,[ID], (err, modif)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido modificar los datos del cliente`
            });
        }
        res.json({
            Status: 'Success',
            Message: 'El cliente ha sido modificado',
            modif
        })
    })
})

//Borrar clientes
clientes.delete('/:id', (req, res)=>{
    console.log(req.params.id)
    const ID = req.params.id;
    const sql = "DELETE FROM cliente WHERE id_cliente = ?";
    db.query(sql, [ID], (err, delet)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `ERROR al eliminar el cliente`
            });
        }
        res.json({
            Status: 'Message: El cliente ha sido eliminado',
            delet
        })
    })
})

module.exports = clientes;