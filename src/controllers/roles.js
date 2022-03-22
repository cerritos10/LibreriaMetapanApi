const roles = require('express').Router()
//Parametro de entrada
const req = require('express/lib/request');
//Parametro de salida
const res = require('express/lib/response');
const db = require('../conexion');

//Rutas del los controladores
roles.get('/', (req, res) =>{
    db.query('SELECT * FROM roles', (err, data) =>{
        if(err || Object.keys(data).length === 0){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se han podido localizar los roles de usuario`
            });
        }
        res.json({
            data
        })
    })
}) 

roles.get('/:id', (req, res)=>{
    const {id} = req.params;
    db.query('SELECT * FROM roles WHERE id_tipousuario = ?', [id], (err, data)=>{
        if (Object.keys(data).length === 0 || err ) {
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido localizar el rol de usuario`
            });
        }
        else{
            res.json({
                data
            })
        }
    })
})


roles.post('/', (req, res)=>{
    console.log(Object.values(req.body));
    const values = Object.values(req.body);
    const sql = "INSERT INTO roles(rol) VALUES(?)";
    db.query(sql, values, (err, insert)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido insertar el rol de usuario`
            });
        }
        res.json({
            Status: 'Success',
            Message: 'Rol de usuario creado crrectamente!!',
            insert
        })
    })
})

roles.put('/:id', (req, res)=>{
    console.log(Object.values(req.body));
    const values = Object.values(req.body);
    const ID = req.params.id;
    const sql = "UPDATE roles SET rol=? WHERE id_tipousuario=?";
    db.query(sql,[values, ID], (err, modif)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido modificar rol de usuario`
            });
        }
        res.json({
            Status: 'Success',
            Message: 'El rol de usuario ha sido modificado',
            modif
        })
    })
})

roles.delete('/:id', (req, res)=>{
    console.log(req.params.id)
    const ID = req.params.id;
    const sql = "DELETE FROM roles WHERE id_tipousuario=?";
    db.query(sql, [ID], (err, delet)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `ERROR al eliminar rol de usuario`
            });
        }
        res.json({
            Status: 'Message: El rol de usuario ha sido eliminado',
            delet
        })
    })
})

module.exports = roles;