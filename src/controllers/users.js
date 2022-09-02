/**
 * Servicio de usuarios, ver, insertar, editar y eliminar y autentificar
 * @params reques, id, username, password, solicita el id o los datos de autentificacion de usuarios
 * @returns response data en formato jwt, retorna datos de usuarios y inicio de sesion o errores
 * @author Erick Siguache
 */

 const users = require('express').Router()
 //Parametro de entrada
 const req = require('express/lib/request');
 //Parametro de salida
 const res = require('express/lib/response');
 const db = require('../conexion');
 const cors = require('cors');
 const jwt = require('jsonwebtoken');
 const bcryptjs = require('bcryptjs');


 //Rutas del los controladores
//Consulta de usuarios en general
users.get('/', verifyToken,(req, res) =>{
    const {id} = req.params;
    db.query('SELECT * FROM usuarios', (err, data) =>{
        if(err || Object.keys(data).length === 0){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se han podido encontrar ningun usuario registrado`
            });
        }
        res.json({
            data
        })
    })
})

///https://www.geeksforgeeks.org/password-encryption-in-node-js-using-bcryptjs-module/
///https://www.npmjs.com/package/bcryptjs
users.post('/', (req, res)=>{
    let passwordhash = bcryptjs.hashSync(req.body.password, 8);
    const value = Object.values({
        nombre: req.body.nombre,
        username: req.body.username,
        password: passwordhash,
        id_tipousuario: req.body.id_tipousuario
    });
    const sql = "INSERT INTO usuarios(nombre, username, password, id_tipousuario) VALUES(?,?,?,?)";
    db.query(sql, value,(err, insert)=>{
        if(err){
            res.json({
                Status: `ERROR: (${err})`,
                Message: `No se ha podido insertar el usuario`
            });
        }
        res.json({
            Status: 'Success',
            Message: 'El usuario se ha creado correctamente!!',
            insert
        })
    })
})


users.post('/login', (req, res)=>{
    console.log(req.body);
    const user = {
        username: req.body.username,
        password: req.body.password
    }
    const sql = "SELECT username, id_tipousuario, password FROM usuarios WHERE username='" + user.username +"'";
    db.query(sql, (err, data)=>{
        if (Object.keys(data).length === 0 || err ) {
            res.json({
                Status: `ERROR: (${err})`,
                Message: `El nombre de usuario no existe`
            });
        }else{
            const dato = data[0]['password'];
            let compare = bcryptjs.compareSync(req.body.password, dato);

            if(compare){
                const datoscifrar = {
                    username: data[0]['username'],
                    id_tipousuario: data[0]['id_tipousuario']
                }
                let datos = JSON.stringify(datoscifrar);
                const token = jwt.sign(datos, 'stil');
                res.json({
                    Status: 'Success',
                    Message: 'El usuario es correcto',
                    token
                })
            }else{
                res.json('La contraseña es incorrecta');
            }

        }
    })
})

//Prueba de funcion de datos
users.post('/test', verifyToken, (req,res)=>{
    res.json('Informacion secreta');
})


//Next verifica la informacion y da paso a la siguiente funcion una ver comprueba que es correta
function verifyToken(req, res, next){
    ///Se verifica antes que venga informacion por medio de autorizacion de los header del navegador
    if(!req.headers.authorization){
        return res.Status(401).json('No autorizado')
    }else{
        ///Comprueba en los header de autorizacion a partir del campo 7 con la variable
        ///de sustraccion de nodejs
        const token = req.headers.authorization.substr(7);
        ///Se comprueba que el token no este vacio
        if(token!==''){
            //Stil se encarga tanto de encriptar como de desencriptar
            //Asi se puede ver la informacion que hay dentro del token
            const content = jwt.verify(token, 'stil');
            req.data = content;
            ///Como se ha mencionado anteriormente el next funciona para darle paso a la funciones
            ///Es decir que si el token no es valido el next no dejara obtener la informacion que se solicita
            next();
            console.log(req.data);
        }else{
            return res.json({
                Status: 'Error token vacio'
            })
        }
    }
}

module.exports = users;