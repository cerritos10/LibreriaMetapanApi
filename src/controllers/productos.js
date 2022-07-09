const productos = require('express').Router()
//Parametro de entrada
const req = require('express/lib/request');
//Parametro de salida
const res = require('express/lib/response');
const db = require('../conexion');

//Rutas del los controladores
//Consulta de productos en general
productos.get('/', (req, res)=>{
    const {id} = req.params;
    db.query("SELECT * FROM producto INNER JOIN categoria ON producto.id_categoria = categoria.id_categoria INNER JOIN marca ON producto.id_marca=marca.id_marca", (err, data)=>{
        if (Object.keys(data).length === 0 || err ) {
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se han podido encontrar ningun producto registrado`
            });
        }
        else{
            res.json({
                data
            })
        }
    })
})

//Consulta de categoria por especifico
productos.get('/:id', (req, res)=>{
    const {id} = req.params;
    db.query('SELECT * FROM producto WHERE id_producto = ?', [id], (err, data)=>{
        if (Object.keys(data).length === 0 || err ) {
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido localizar el producto solicitado`
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
productos.post('/', (req, res)=>{
    console.log(Object.values(req.body));
    const values = Object.values(req.body);
    const sql = "INSERT INTO producto(id_categoria, id_marca, nombre_producto, descripcion, stock, precio_venta, precio_descuento) VALUES(?,?,?,?,?,?,?)";
    db.query(sql, values, (err, insert)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido insertar el producto`
            });
        }
        res.json({
            Status: 'Success',
            Message: 'El producto se a creado correctamente!!',
            insert
        })
    })
})

//Actualizar un producto
productos.put('/:id', (req, res)=>{
    console.log(Object.values(req.body));
    console.log(req.body);
    const values = Object.values(req.body);
    const ID = req.params.id;
    const producto = {
        id_categoria: req.body.id_categoria,
        id_marca: req.body.id_marca,
        nombre_producto: req.body.nombre_producto,
        descripcion: req.body.descripcion,
        stock: req.body.stock,
        precio_venta: req.body.precio_venta,
        precio_descuento: req.body.precio_descuento
    }
    const sql = "UPDATE producto SET id_categoria='"+producto.id_categoria+"', id_marca='"+producto.id_marca +"', nombre_producto='"+producto.nombre_producto+"', descripcion='"+producto.descripcion+"', stock='"+producto.stock+"', precio_venta='"+producto.precio_venta+"', precio_descuento='"+producto.precio_descuento+"' WHERE id_producto = ?";
    db.query(sql,[ID], (err, modif)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido modificar los datos del producto`
            });
        }
        res.json({
            Status: 'Success',
            Message: 'El producto ha sido modificado',
            modif
        })
    })
})

//Borrar producto
productos.delete('/:id', (req, res)=>{
    console.log(req.params.id)
    const ID = req.params.id;
    const sql = "DELETE FROM producto WHERE id_producto = ?";
    db.query(sql, [ID], (err, delet)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `ERROR al eliminar el producto`
            });
        }
        res.json({
            Status: 'Message: El producto ha sido eliminado',
            delet
        })
    })
})

module.exports = productos;