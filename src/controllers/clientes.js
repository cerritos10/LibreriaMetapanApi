const clientes = require('express').Router()
//Parametro de entrada
const req = require('express/lib/request');
//Parametro de salida
const res = require('express/lib/response');
const db = require('../conexion');

//Rutas del los controladores
//Consulta de categoria en general
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

//Consulta de categoria por especifico
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

//Insertar categoria
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

//Actualizar las categoria
clientes.put('/:id', (req, res)=>{
    console.log(Object.values(req.body));
    const values = Object.values(req.body);
    const ID = req.params.id;
    const sql = "UPDATE cliente SET nombre=?, telefono=?, sexo=? WHERE id_cliente = ?"
    db.query(sql,[values, ID], (err, modif)=>{
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

//Borrar categoria
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