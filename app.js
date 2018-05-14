//Express as the web application framework
const express = require('express')
const app=express()
//Morgan library used for logging purposes
const morgan= require('morgan')
//Express Validator to validate requests
const validator = require('express-validator');
//DB settings and functions stored in db.js
const dbpool=require('./db/db.js')
//Router to route requests stored in api.js
const apiRouter=require('./routes/api.js')

//Initialisations
app.use(validator());
app.use(morgan('short'))
app.use(express.json())
//Test The db connection. Throws error if db connection fails
dbpool.testConnection
//Set Router
app.use('/api',apiRouter)



//Start app at port 3003
app.listen(3003,()=>{
  console.log("Server is up and listening on port 3003")
})

module.exports=app
