const proveedores =  require('express').Router();
const req = require('express/lib/request');
const res = require('express/lib/response');
const db = require('../conexion');

proveedores.get('/', (req, res) =>{
    db.query('SELECT * FROM proveedor', (err, data) =>{
        if(err || Object.keys(data).length === 0){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se han podido localizar los proveedores`
            });
        }
        res.json({
            data
        })
    })
}) 

proveedores.get('/:id', (req, res)=>{
    const {id} = req.params;
    db.query('SELECT * FROM proveedor WHERE id_proveedor = ?', [id], (err, data)=>{
        if (Object.keys(data).length === 0 || err ) {
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido localizar el proveedor`
            });
        }
        else{
            res.json({
                data
            })
        }
    })
})

proveedores.post('/', (req, res)=>{
    console.log(Object.values(req.body));
    const values = Object.values(req.body);
    const sql = "INSERT INTO proveedor(nombre, direccion, telefono) VALUES(?, ?, ?)";
    db.query(sql, values, (err, insert)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido insertar el proveedor`
            });
        }
        res.json({
            Status: 'Success',
            Message: 'Proveedor creado crrectamente!!',
            insert
        })
    })
})

proveedores.put('/:id', (req, res)=>{
    console.log(Object.values(req.body));
    const values = Object.values(req.body);
    const ID = req.params.id;
    const sql = "UPDATE proveedor SET nombre=?, direccion=?, telefono=? WHERE id_proveedor=?";
    db.query(sql,[values, ID], (err, modif)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido modificar el proveedor`
            });
        }
        res.json({
            Status: 'Success',
            Message: 'El proveedor ha sido modificado',
            modif
        })
    })
})

proveedores.delete('/:id', (req, res)=>{
    console.log(req.params.id)
    const ID = req.params.id;
    const sql = "DELETE FROM proveedor WHERE id_proveedor=?";
    db.query(sql, [ID], (err, delet)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `ERROR al eliminar el proveedor`
            });
        }
        res.json({
            Status: 'Message: El proveedor ha sido eliminado',
            delet
        })
    })
})

module.exports = proveedores;