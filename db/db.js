//pool is better for alot of requests to the sql server

const mysql = require('mysql')

const dbpool=mysql.createPool({
    connectionLimit:10,
    host:'localhost',
    user:'root',
    password:'root',
    database:'administration'
  })
  const testConnection=dbpool.getConnection(function(err){
    if (err) throw err;
    console.log("Connection to Db succesful")
  })
  


module.exports=dbpool