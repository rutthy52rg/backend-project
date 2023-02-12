*Ruth González Estévez*

http://ec2-34-207-165-206.compute-1.amazonaws.com/

**Práctica introducción Backend con mongoDB**

 - NODE VERSION 16
 - BBDD => _BBDD ==> run in terminal:  *./bin/mongod --dbpath ./data*
 - SHELL => _shell ==> run in terminal:   *./bin/mongosh*
 - install app => in nodepop => run in terminal: *npm install*
 - initial clear and chargue data in bbdd => in nodepop => run in terminal: *npm run init-db*
 - run app => in nodepop => run in terminal: *npm run start-dev*
 - port => 3001

 
**API INFO**
 
 - basic-auth => admin / 12345
  
  
  *EndPoints*
 - GET => http://localhost:3001/api/anouncements/
 - POST => http://localhost:3001/api/anouncements/post/
 - PUT => http://localhost:3001/api/anouncements/put/_id
 - DELETE => http://localhost:3001/api/anouncements/delete/_id

 *Queries strings example*
 *http://localhost:3001/?tags=motor&sale=false&name=moto&price=50&sort=price&skip=0&limit=2*

*Estructura proyecto

        |------_BBDD
        |------_SHELL
        |------nodepop
        |    |-----bin
        |    |-----lib
        |       |---basicAuthMiddleware.js
        |       |---connectMongoose.js
        |    |-----models
        |       |---Anouncement.js
        |    |-----routes
        |       |---api
        |           |---anouncements.js
        |       |---index.js
        |    |-----views
        |       |---index.js
        |   |---app.js
        |   |---initDB.js
        |   |---- Readme.md
