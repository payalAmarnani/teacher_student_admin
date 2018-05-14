
## Teacher Student Aministration API

An API backend that enables teachers to perform administrative functions for their classes. 

## Setup

- Run the db/administration.sql on the db server to create the administration database and the teacher,student and teacher_student_relation  tables.
- Configure database settings in the db/db.js file
- Run "node app.js" to set up server and connect to apis

## Unit Testing
npm test


## Plugins Used

- Web Framework: "express": "^4.16.3",
- Request Validation: "express-validator": "^5.2.0", 
- Logging : "morgan": "^1.9.0", 
- Database connection and queries: "mysql": "^2.15.0"
- Dev Dependency- testing:"chai": "^4.1.2",
- Dev Dependency- testing:"chai-http": "^4.0.0",
- Dev Dependency- testing:"mocha": "^5.1.1"


## Postman Tests

Postman collection can be imported from the test/Teacher Student Administration.postman_collection

## Contributors

Payal Amarnani.

