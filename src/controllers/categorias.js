const categorias = require('express').Router()
//Parametro de entrada
const req = require('express/lib/request');
//Parametro de salida
const res = require('express/lib/response');
const db = require('../conexion');

//Rutas del los controladores
categorias.get('/', (req, res) =>{
    db.query('select *from categoria', (err, data) =>{
        if(err){
            return err;
        }
        res.json({
            data
        })
    })
}) 

categorias.get('/:id', (req, res)=>{
    const {id} = req.params;
    db.query('select *from categoria where id_categoria = ?', [id], (err, data)=>{
        if(err){
            return err;
        }
        res.json({
            data
        })
    })
})


categorias.post('/', (req, res)=>{
    console.log(Object.values(req.body));
    const values = Object.values(req.body);
    const sql = "INSERT INTO categoria(nombre_categoria) VALUES(?)";
    db.query(sql, values, (err, insert)=>{
        if(err){
            console.log(err);
            return err;
        }
        res.json({
            mensaje: 'La categoria ha sido insertada',
            insert
        })
    })
})

categorias.put('/', (req, res)=>{
    console.log(Object.values(req.body));
    const values = Object.values(req.body);
    const sql = "UPDATE categoria SET nombre_categoria=? WHERE id_categoria=?";
    db.query(sql, values, (err, modif)=>{
        if(err){
            console.log(err);
            return err;
        }
        res.json({
            mensaje: 'La categoria ha sido modificada',
            modif
        })
    })
})

categorias.delete('/:id', (req, res)=>{
    console.log(req.params.id)
    const ID = req.params.id;
    const sql = "DELETE FROM categoria WHERE id_categoria=?";
    db.query(sql, [ID], (err, delet)=>{
        if(err){
            console.log(err);
            return err;
        }
        res.json({
            mensaje: 'La categoria ha sido eliminada',
            delet
        })
    })
})

module.exports = categorias;