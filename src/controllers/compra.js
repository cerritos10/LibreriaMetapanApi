/**
 * Servicio de compra, ver, insertar, editar y eliminar compra
 * @params reques, id, solicita el id o los datos del cliente
 * @returns response data, retorna datos o errores
 * @author Josue Cruz
 */


const compra = require('express').Router()
//Parametro de entrada
const req = require('express/lib/request');
//Parametro de salida
const res = require('express/lib/response');
const db = require('../conexion');
const cors = require('cors');

//Rutas del los controladores
//Consulta de compra en general
compra.get('/', (req, res) =>{
    db.query('SELECT * FROM compra', (err, data) =>{
        if(err || Object.keys(data).length === 0){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido encontrar ninguna compra`
            });
        }
        res.json({
            data
        })
/*       else if(Object.keys(data))
        {
            //console.log(data)
            let compraOriginal = []
            let detalleCompraList = []
            for(let i = 0; i < data.length; i++)
            {
                compraOriginal.push(data[i])
                db.query('SELECT * FROM detallecompra WHERE id_detalle_compra = '+ data[i].id_compra, (err, data2) => {
                    detalleCompraList.push(data2)
                    console.log(data2)
                });
            }
            res.json({
                detalleCompraList
            })
            console.log(compraOriginal)
        }
*/
    })
}) 

//Consulta de compra por especifico
compra.get('/:id', (req, res)=>{
    const {id} = req.params;
    db.query('SELECT * FROM compra WHERE id_compra = ?', [id], (err, data)=>{
        if (Object.keys(data).length === 0 || err ) {
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido localizar ninguna compra`
            });
        }
        else{
            res.json({
                data
            })
        }
    })
})

//Insertar compra
compra.post('/', (req, res)=>{
    console.log(Object.values(req.body));
    const values = Object.values(req.body);
    const sql = "INSERT INTO compra(id_proveedor, id_usuario, id_tipo_compra, fecha_compra, codigo) VALUES (?,?,?,?,?)";
    db.query(sql, values, (err, insert)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido registrar la compra`
            });
        }
        res.json({
            Status: 'Success',
            Message: 'La compra se ha ingresado correctamente!!',
            insert
        })
    })
})
//Detalle compra INSERT INTO `detallecompra`(`id_compra`, `id_producto`, `cantidad`, `precio_compra`) VALUES (1,1,50,0.15);


//Actualizar los compra
compra.put('/:id', (req, res)=>{
    console.log(Object.values(req.body));
    console.log(req.body);
    const values = Object.values(req.body);
    const ID = req.params.id;
    const compr = {
        proveedor: req.body.id_proveedor,        
        usuario: req.body.id_usuario,
        tipo_compra: req.body.id_tipo_compra,
        fecha: req.body.fecha_compra,
        codigo: req.body.codigo
    }
    console.log([ID]);
    const sql = "UPDATE compra SET id_proveedor='"+ compr.proveedor+"', id_usuario='"+ compr.usuario+"',id_tipo_compra='"+ compr.tipo_compra +"', fecha_compra = '"+ compr.fecha +"',codigo = '"+ compr.codigo +"' WHERE id_compra = ?";
    db.query(sql,[ID], (err, modif)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido modificar los datos de la compra`
            });
        }
        res.json({
            Status: 'Success',
            Message: 'La compra ha sido modificado',
            modif
        })
    })
})

//Borrar compra
compra.delete('/:id', (req, res)=>{
    console.log(req.params.id)
    const ID = req.params.id;
    const sql = "DELETE FROM compra WHERE id_compra = ?";
    db.query(sql, [ID], (err, delet)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `ERROR al eliminar la compra`
            });
        }
        res.json({
            Status: 'Message: La compra ha sido eliminado',
            delet
        })
    })
})

module.exports = compra;