const marcas = require('express').Router()
//Parametro de entrada
const req = require('express/lib/request');
//Parametro de salida
const res = require('express/lib/response');
const db = require('../conexion');

//Rutas del los controladores
//Consulta de marcas en general
marcas.get('/', (req, res) =>{
    db.query('SELECT * FROM marca', (err, data) =>{
        if(err || Object.keys(data).length === 0){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se han podido encontrar ninguna marca registrada`
            });
        }
        res.json({
            data
        })
    })
}) 

//Consulta de marcas por especifico
marcas.get('/:id', (req, res)=>{
    const {id} = req.params;
    db.query('SELECT * FROM marca WHERE id_marca = ?', [id], (err, data)=>{
        if (Object.keys(data).length === 0 || err ) {
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido localizar ninguna marca`
            });
        }
        else{
            res.json({
                data
            })
        }
    })
})

//Insertar marcas
marcas.post('/', (req, res)=>{
    console.log(Object.values(req.body));
    const values = Object.values(req.body);
    const sql = "INSERT INTO marca(nombre_marca) VALUES(?)";
    db.query(sql, values, (err, insert)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido insertar la marca`
            });
        }
        res.json({
            Status: 'Success',
            Message: 'La marca se creado correctamente!!',
            insert
        })
    })
})

//Actualizar las marcas
marcas.put('/:id', (req, res)=>{
    console.log(Object.values(req.body));
    const values = Object.values(req.body);
    const ID = req.params.id;
    const sql = "UPDATE marca SET nombre_marca=? WHERE id_marca=?";
    db.query(sql,[values, ID], (err, modif)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido modificar la marca`
            });
        }
        res.json({
            Status: 'Success',
            Message: 'La marca ha sido modificado',
            modif
        })
    })
})

//Borrar marca
marcas.delete('/:id', (req, res)=>{
    console.log(req.params.id)
    const ID = req.params.id;
    const sql = "DELETE FROM marca WHERE id_marca=?";
    db.query(sql, [ID], (err, delet)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `ERROR al eliminar la marca`
            });
        }
        res.json({
            Status: 'Message: La marca ha sido eliminado',
            delet
        })
    })
})

module.exports = marcas;