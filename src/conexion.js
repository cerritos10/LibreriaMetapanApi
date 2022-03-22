const mysql = require('mysql');

const conexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'libreriaMeta'
});

conexion.connect((err)=>{
    if(err){
        console.log('error de conexion', err);
        return err;
    }
    console.log('conexion establecida');
})

module.exports = conexion;