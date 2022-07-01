/**
 * Servicio de detalleCompra, ver, insertar, editar y eliminar detalleCompra
 * @params reques, id, solicita el id o los datos del cliente
 * @returns response data, retorna datos o errores
 * @author Josue Cruz
 */


const detalleCompra = require('express').Router()
//Parametro de entrada
const req = require('express/lib/request');
//Parametro de salida
const res = require('express/lib/response');
const db = require('../conexion');
const cors = require('cors');
const { json } = require('express/lib/response');

//Este probablemente no se use, no hay ninguna razon para ver los detalles de forma separada
detalleCompra.get('/', (req, res) =>{
    db.query('SELECT * FROM detalleCompra', (err, data) =>{
        if(err || Object.keys(data).length === 0){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido encontrar ningun detalle de compra`
            });
        }
        else if(Object.keys(data))
        {
            res.json({
                data
            })
        }
    })
}) 

//Consulta de detalleCompra por especifico, listando por id compra
detalleCompra.get('/:id', (req, res)=>{
    const {id} = req.params;
    db.query('SELECT * FROM detalleCompra WHERE id_compra = ?', [id], (err, data)=>{
        if (Object.keys(data).length === 0 || err ) {
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido localizar ninguna detallecompra`
            });
        }
        else{
            res.json({
                data
            })
        }
    })
})

//Insertar detalleCompra
detalleCompra.post('/', (req, res)=>{
    console.log(Object.values(req.body));
    const values = Object.values(req.body);
    const sql = "INSERT INTO detallecompra(id_compra, id_producto, cantidad, precio_compra) VALUES ('?','?','?','?')"
    db.query(sql, values, (err, insert)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido registrar el detalle de Compra`
            });
        }
        res.json({
            Status: 'Success',
            Message: 'El item se ha ingresado correctamente!!',
            insert
        })
    })
})

//Actualizar los detalleCompra, este probablemente se le hagan algunas modificaciones
//Por ejemplo, no es necesario editar el id de compra porque estara asociada en el formulario
detalleCompra.put('/:id', (req, res)=>{
    console.log(Object.values(req.body));
    console.log(req.body);
    const values = Object.values(req.body);
    const ID = req.params.id;
    const detComp = {
        id_compra: req.body.id_compra,        
        id_producto: req.body.id_producto,
        cantidad: req.body.cantidad,
        precio: req.body.precio_compra,
    }
    console.log([ID]);
    const sql = "UPDATE detallecompra SET id_compra='"+detComp.id_compra +"',id_producto='"+detComp.id_producto+"',cantidad='"+detComp.cantidad+"',precio_compra='"+detComp.precio+"' where id_detalle_compra = ?";
    db.query(sql,[ID], (err, modif)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido modificar los datos del item`
            });
        }
        res.json({
            Status: 'Success',
            Message: 'El item ha sido modificado',
            modif
        })
    })
})

//Borrar detalleCompra
detalleCompra.delete('/:id', (req, res)=>{
    console.log(req.params.id)
    const ID = req.params.id;
    const sql = "DELETE FROM detallecompra WHERE id_detalle_compra = ?";
    db.query(sql, [ID], (err, delet)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `ERROR al eliminar el item de compra`
            });
        }
        res.json({
            Status: 'Message: El item ha sido eliminado',
            delet
        })
    })
})

module.exports = detalleCompra;