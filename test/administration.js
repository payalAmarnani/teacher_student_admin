
const chai = require('chai');
var expect = chai.expect;

const chaiHttp = require('chai-http');
const server = require('../app');
const should = chai.should();

chai.use(chaiHttp);

describe('Administration',()=>{
    describe('Post /api/register to register students to teacher',()=>{
        it("it should register 1 student to a teacher",(done)=>{
            let registration={
                "teacher": "testteacher1@testing.com",
                "students":
                  [
                    "studenttest1@testing.com"
                  ]
              }
        
            chai.request(server).post('/api/register')
            .send(registration)
            .end((err,res)=>{
                res.should.have.status(204)
                done();

            })
        })
        it("it should register 3 students to a teacher",(done)=>{
            let registration2={
                "teacher": "testteacher2@testing.com",
                "students":
                  [
                    "student_to_suspend@test.com",
                    "studenttest1@testing.com",
                    "studenttest3@testing.com"
                  ]
              }
        
            chai.request(server).post('/api/register')
            .send(registration2)
            .end((err,res)=>{
                res.should.have.status(204)
            
                done();
            })
        })
        it("it should register not register as student email format is invalid",(done)=>{
            let registration2={
                "teacher": "teacherken@gmail.com",
                "students":
                  [
                    "studenttest2example.com",
                    "studenttest3@example.com",
                  ]
              }
              chai.request(server).post('/api/register')
              .send(registration2)
              .end((err,res)=>{
                  res.should.have.status(400)
                  res.body.should.be.an('array')
                  expect(res.body[0].msg).eql("Enter a valid email address for Students")
                  done();
              })
        })
        it("it should register not register as teacher email format is invalid",(done)=>{ 
            let registration2={
            "teacher": "teacherkengmail.com",
            "students":
              [
                "studenttest2@example.com",
                "studenttest3@example.com",
              ]
          }
          chai.request(server).post('/api/register')
          .send(registration2)
          .end((err,res)=>{
              res.should.have.status(400)
              res.body.should.be.an('array')
              expect(res.body[0].msg).eql("Enter a valid email address for Teacher")
              done();
          })
        })
    })
    describe('Get /api/commonstudents',()=>{
        it('it should get all common students?teacher=teacher1%40example.com&?teacher=teacher2%40example.com',(done)=>{
            chai.request(server).get('/api/commonstudents?teacher=testteacher1%40testing.com&teacher=testteacher2%40testing.com')
            .end((err,res)=>{
                // var expectedResult=[{"student_email": "studenttest1@testing.com"}]
                var expectedResult={"students":["studenttest1@testing.com"]}
                res.should.have.status(200);
                res.should.be.an('object');
                res.body.students.should.be.an("array")
                res.body.students.should.have.length(1);
                expect(res.body).to.eql(expectedResult)
            done();
            })
        })
        it('it should get all students under teacher 2',(done)=>{
            chai.request(server).get('/api/commonstudents?teacher=testteacher2%40testing.com')
            .end((err,res)=>{
                var expectedResult={"students":["studenttest1@testing.com","studenttest3@testing.com","student_to_suspend@test.com"]}
                // var expectedResult=[{"student_email": "studenttest1@testing.com"},{"student_email": "studenttest3@testing.com"},{"student_email": "student_to_suspend@test.com"}]
                res.should.have.status(200);
                res.should.be.an('object');
                res.body.students.should.be.an("array")
                res.body.students.should.have.length(3);
                expect(res.body).to.eql(expectedResult)
            done();
            })
        })
        it('/commonstudents it should throw error',(done)=>{
            chai.request(server).get('/api/commonstudents')
            .end((err,res)=>{
                res.should.have.status(400);
                res.should.be.an('object');
            done();
            })
        })
    })
    describe('Post /api/suspend',()=>{
        it('it should suspend student student_to_suspend@test.com',(done)=>{
            let student={"student":"student_to_suspend@test.com"}
        
            chai.request(server).post('/api/suspend')
            .send(student)
            .end((err,res)=>{
                res.should.have.status(204)
                done();

            })
        })
        it("it should not suspend student due to invalid format",(done)=>{
            let student={"student":"student_to_suspendtest.com"}

              chai.request(server).post('/api/suspend')
              .send(student)
              .end((err,res)=>{
                  res.should.have.status(400)
                  res.body.should.be.an('array')
                  expect(res.body[0].msg).eql("Enter a valid email address for Students")
                  done();
              })
        })
        it("it should not suspend student as student not found",(done)=>{
            let student={"student":"student_not_found@test.com"}

              chai.request(server).post('/api/suspend')
              .send(student)
              .end((err,res)=>{
                  res.should.have.status(400)
                  done();
              })
        })
        it("it should throw error as student input is missing",(done)=>{
            let student={"student":""}

              chai.request(server).post('/api/suspend')
              .send(student)
              .end((err,res)=>{
                  res.should.have.status(400)
                  res.body.should.be.an('array')
                  expect(res.body[0].msg).eql("Student fields should not be empty")
                  done();
              })
        })
    })
    describe('Post /retrievefornotifications',()=>{
        it("should fail because teacher in input is missing",(done)=>{
            let input={"teacher":"","notification":"Test"}

              chai.request(server).post('/api/retrievefornotifications')
              .send(input)
              .end((err,res)=>{
                  res.should.have.status(400)
                  res.body.should.be.an('array')
                  expect(res.body[0].msg).eql("Teacher field should not be empty")
                  done();
              })
        })
        it("should fail because notification field is missing",(done)=>{
            let input={"teacher":"test@test.com","notification":""}

              chai.request(server).post('/api/retrievefornotifications')
              .send(input)
              .end((err,res)=>{
                  res.should.have.status(400)
                  res.body.should.be.an('array')
                  expect(res.body[0].msg).eql("Notification should not be empty")
                  done();
            })
        })
        it("it should retrieve all students under the input teacher",(done)=>{
            let input={
                "teacher":"testteacher1@testing.com",
                "notification":"test notification"
            }
            chai.request(server).post('/api/retrievefornotifications')
            .send(input)
            .end((err,res)=>{
                res.should.have.status(200)
                res.body.should.be.an("object")
                expect(res.body.recipients).to.have.length(1)
                expect(res.body.recipients[0]).be.equal("studenttest1@testing.com")
                done();
            })
        })
        it("it should retrieve all students under the teacher and mentioned in the input notification ",(done)=>{
            let input={
                "teacher":"testteacher1@testing.com",
                "notification":"test @studenttest3@testing.com notification "
            }
            chai.request(server).post('/api/retrievefornotifications')
            .send(input)
            .end((err,res)=>{
                res.should.have.status(200)
                res.body.should.be.an("object")
                expect(res.body.recipients).to.have.length(2)
                expect(res.body.recipients[0]).be.equal("studenttest1@testing.com")
                expect(res.body.recipients[1]).be.equal("studenttest3@testing.com")

                done();
            })
        })
        it("must not retrieve students not in student table but in notification input",(done)=>{
            let input={
                "teacher":"testteacher1@testing.com",
                "notification":"test @not_in_student_table@testing.com notification "
            }
            chai.request(server).post('/api/retrievefornotifications')
            .send(input)
            .end((err,res)=>{
                res.should.have.status(200)
                res.body.should.be.an("object")
                expect(res.body.recipients).to.have.length(1)
                expect(res.body.recipients[0]).be.equal("studenttest1@testing.com")
                done();
            })
        })
        it("must not retrieve students who have been suspended",(done)=>{
            let input={
                "teacher":"testteacher2@testing.com",
                "notification":"test @studenttest3@testing.com notification "
            }
            chai.request(server).post('/api/retrievefornotifications')
            .send(input)
            .end((err,res)=>{
                res.should.have.status(200)
                res.body.should.be.an("object")
                expect(res.body.recipients).to.have.length(2)
                expect(res.body.recipients[0]).be.equal("studenttest1@testing.com")
                expect(res.body.recipients[1]).be.equal("studenttest3@testing.com")

                done();
            })
        })
    })
})