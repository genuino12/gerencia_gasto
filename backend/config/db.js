const mysql = require('mysql2/promise');
const pool = mysql.createPool({
    host:"localhost",
    user:"root",
    password:"",
    database:"gasto_db"
})

module.exports= pool