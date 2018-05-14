const express= require('express')
const apiRouter=express.Router()
//Get controller functions
const operations=require('../Controllers/administration')

    //Process registration request
    apiRouter.post('/register',operations.register)
    //Process get common students request
    apiRouter.get('/commonstudents',operations.getCommonStudents)
    //Process suspension request
    apiRouter.post('/suspend',operations.suspendStudent)
    //Process retrieve students request
    apiRouter.post('/retrievefornotifications', operations.retrieveStudentsForNotifications)


module.exports=apiRouter


