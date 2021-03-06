const categorias = require('express').Router()
//Parametro de entrada
const req = require('express/lib/request');
//Parametro de salida
const res = require('express/lib/response');
const db = require('../conexion');

//Rutas del los controladores
//Consulta de categoria en general
categorias.get('/', (req, res) =>{
    db.query('SELECT * FROM categoria', (err, data) =>{
        if(err || Object.keys(data).length === 0){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se han podido encontrar ninguna categoria registrada`
            });
        }
        res.json({
            data
        })
    })
}) 

//Consulta de categoria por especifico
categorias.get('/:id', (req, res)=>{
    const {id} = req.params;
    db.query('SELECT * FROM categoria WHERE id_categoria = ?', [id], (err, data)=>{
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
categorias.post('/', (req, res)=>{
    console.log(Object.values(req.body));
    const values = Object.values(req.body);
    const sql = "INSERT INTO categoria(nombre_categoria) VALUES(?)";
    db.query(sql, values, (err, insert)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido insertar la categoria`
            });
        }
        res.json({
            Status: 'Success',
            Message: 'La categoria se creado correctamente!!',
            insert
        })
    })
})

//Actualizar las categoria
categorias.put('/:id', (req, res)=>{
    console.log(Object.values(req.body));
    const values = Object.values(req.body);
    const ID = req.params.id;
    const sql = "UPDATE categoria SET nombre_categoria=? WHERE id_categoria=?";
    db.query(sql,[values, ID], (err, modif)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido modificar la categoria`
            });
        }
        res.json({
            Status: 'Success',
            Message: 'La categoria ha sido modificado',
            modif
        })
    })
})

//Borrar categoria
categorias.delete('/:id', (req, res)=>{
    console.log(req.params.id)
    const ID = req.params.id;
    const sql = "DELETE FROM categoria WHERE id_categoria=?";
    db.query(sql, [ID], (err, delet)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `ERROR al eliminar la categoria`
            });
        }
        res.json({
            Status: 'Message: La categoria ha sido eliminado',
            delet
        })
    })
})

module.exports = categorias;