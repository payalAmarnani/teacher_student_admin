//Import db queries
const queries=require("../models/administration")
 //Validate req and process db responses
const operations={
    register: function(req,res){
        req.checkBody("teacher", "Teacher field should not be empty").notEmpty();
        req.checkBody("students", "Student fields should not be empty").notEmpty();
        req.checkBody("teacher", "Enter a valid email address for Teacher").isEmail();
        req.checkBody("students", "Enter a valid email address for Students").isEmail();
        var errors=req.validationErrors()
        if (errors) {
            res.status(400).send(errors);
             return;
        }
                queries.insertTeacher(req.body.teacher,function(err,data){
                    if(err){
                        res.sendStatus(500).end()
                    }else{
                        queries.insertStudents(req.body.students,function(err,data){
                            if(err){
                                res.sendStatus(500).end()
                            }else{
                                queries.insertRelation(req.body.teacher,req.body.students,function(err,data){
                                    if(err){
                                        res.sendStatus(500).end()
                                    }else{
                                        res.sendStatus(204)
                                    }
                                })
                            }
                        })
                    }
                })
    },
    getCommonStudents: function(req,res){
        req.checkQuery("teacher", "Teacher field should not be empty").notEmpty();
        req.checkQuery("teacher", "Teacher field is invalid").isEmail();
        var errors=req.validationErrors()
        if (errors) {
            res.status(400).send(errors);
            return;
        }
        queries.getCommonStudents(req.query.teacher,function(err,rows){
            if(err) {
                res.sendStatus(500).end()
            }else{
                console.log(rows)
                var data=[]
                var students={}
                if (rows.length==1){
                    students={students:rows[0].student_email}
                }
                rows.map(r=>{data.push(r.student_email)})
                students={students:data}
                res.status(200).json(students).end()
            }
        })
    },
    suspendStudent:function(req,res){
        req.checkBody("student", "Student fields should not be empty").notEmpty();
        req.checkBody("student", "Enter a valid email address for Students").isEmail();
        var errors=req.validationErrors()
        if (errors) {
            res.status(400).send(errors);
             return;
        }
        queries.checkStudentPresent(req.body.student,function(err,data){
            if(err){
                if(err==="Student Not Found"){
                    var error={msg:"Student Not Found"}
                    res.status(400).json(error)
                }else{
                    res.sendStatus(500).end()
                }
            }else{
                queries.suspendStudent(req.body.student, function(err,rows){
                    if(err){
                        res.sendStatus(500).end()
                    }
                    res.status(204).end()
                })
            }
        })
    },
    retrieveStudentsForNotifications:function(req,res){
        req.checkBody("teacher", "Teacher field should not be empty").notEmpty();
        req.checkBody("teacher", "Teacher field is invalid").isEmail();
        req.checkBody("notification", "Notification should not be empty").notEmpty();

        var errors=req.validationErrors()
        if (errors) {
            res.status(400).send(errors);
            return;
        }
        const regex = /\S+[a-z0-9]@[a-z0-9\.]+/img
        const retrieve_emails=req.body.notification.match(regex)
        queries.retrieveStudents(retrieve_emails,req.body.teacher,function(err,rows){
            if(err){
                res.sendStatus(500).end()
            }
            var studentArr=[]
            for (var i = 0; i < rows.length; i++) {
                studentArr.push(rows[i].student_email)
            }
            var students={"recipients":studentArr}
            res.status(200).json(students)
        })
        
    }
}
module.exports=operations