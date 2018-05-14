const dbpool=require('../db/db.js')
var mysql=require('mysql')
const queries={
    //QUery db to check if student is present
checkStudentPresent: function (student,next){
    var checkStudentQuery="SELECT COUNT (*) as count from student where student_email=?"
    dbpool.query(checkStudentQuery,student,function(err,rows,fields){
        if(err) {
            console.log(err)
            next(err)
        }
        else{
            if (rows[0].count===0){
                next("Student Not Found")
            }
            next(null,rows)
        }
    })
},
 //QUery db to check if teacher is present
checkTeacherPresent: function (teacher,next){
     var checkTeacherQuery="SELECT COUNT (*) as count from teacher where teacher_email=?"
    dbpool.query(checkTeacherQuery,teacher,function(err,rows,fields){
        if(err) {
            console.log(err)
            next(err)
        }
        else{
            if (rows[0].count===0){
                next("Teacher Not Found")
            }else{
            next(null,rows)}
        }
    })
},
 //QUery db to insert teacher
insertTeacher: function (teacher,next){
    var insertTeacherQuery="INSERT IGNORE INTO teacher (teacher_email) VALUES (?)"
    dbpool.query(insertTeacherQuery,teacher,function(err,rows,fields){
        if(err) {
            console.log(err)
            next(err)
        }
        else{
            next(null,rows.insertId)
        }
    })
},
//QUery db to insert students
insertStudents: function (students,next){
    var insertStudentQuery="INSERT IGNORE INTO student (student_email) VALUES ?"
    dbpool.query(insertStudentQuery,[Array.from(students).map(function(g){ return [g]; })],function(err,rows,fields){
        if(err) {
            console.log(err)
            next(err)
        }
        else{
            next(null,rows)
        }
    })
},
//QUery db to insert teacher and student relationship
insertRelation: function (teacher_email,students,next){
    var insertRelationsQuery= "INSERT IGNORE INTO teacher_student_relation (student_email, teacher_email) VALUES ?"
   
    dbpool.query(insertRelationsQuery,[Array.from(students).map(function(g){ return [g,teacher_email]; })],function(err,rows,fields){
        if(err) {
            console.log(err)
            next(err)
        }
        else{
            next(null,rows)
        }
    })
},
//QUery db to get common students
getCommonStudents:function(teacher,next){
    console.log(teacher)
    var getCommonStudentsQuery="select distinct student_email from teacher_student_relation where student_email IN (select student_email from teacher_student_relation where teacher_email=?)" 
        if(teacher instanceof Array){
            for(var i=1;i<teacher.length;i++){
                    getCommonStudentsQuery+=" and student_email IN (select student_email from teacher_student_relation where teacher_email=?)"
            }
             
        }
        sql = mysql.format(getCommonStudentsQuery, teacher)
        dbpool.query(sql,function(err,rows,fields){
            if(err) {
                console.log(err)
                next(err)
            }
            else{
                next(null,rows)
            }
        })
},
//QUery db to update suspension of student
suspendStudent:function(student, next){
    const suspendQuery="UPDATE student SET suspended = true WHERE student_email = ?"
    dbpool.query(suspendQuery,[student],function(err,rows,fields){
        if(err){
            console.log(err)
            next(err)
        }
        console.log(rows.affectedRows)
        next(null,rows)
    })
},
//QUery db to get students for notifications
retrieveStudents:function(retrievedStudentEmails,teacher,next){
    var student_emails=[]
    if(retrievedStudentEmails!==null){
        retrievedStudentEmails.map(e=>{
            student_emails.push(e.substring(1))
        })
        retrieveStudentQuery='select distinct t1.student_email from student t1 join teacher_student_relation t2 on t2.student_email=t1.student_email where t1.suspended=0 AND ( t2.teacher_email = ?  OR t1.student_email IN (?) ) '
    }else{
        retrieveStudentQuery='select distinct t1.student_email from student t1 join teacher_student_relation t2 on t2.student_email=t1.student_email where t1.suspended=0 AND ( t2.teacher_email = ?) '
    }
    sql = mysql.format(retrieveStudentQuery, [teacher,student_emails])
    dbpool.query(sql,(err,rows,fields)=>{
        if(err){
            console.log(err)
            next(err)
        }
       next(null,rows)
    })
}
    
}
module.exports=queries