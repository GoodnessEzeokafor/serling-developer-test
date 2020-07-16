// const app = require("../../routes/api/user"); // Link to your server file
// const supertest = require("supertest");
// const request = require("supertest");
// const app = require("../../app");
const request = require('supertest');
const express = require('express');
 
const app = express();
const {User} = require('../../models/User')
// const 
// const request = supertest(app);

var mongoose = require('mongoose')
var mongoDb = "mongodb://localhost/test"
mongoose.connect(mongoDb,  { useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    // useUnifiedTopology: true ,
    useFindAndModify: false
  },)
    .then((db) => {
        console.log("Connected")
    })


    
    describe("Test the root path", () => {
        beforeAll(async() => {
            await User.remove({})
        });
        
        afterEach(async() => {
            await User.remove({})
        })
    
        afterAll(async() => {
            await mongoose.connection.close()
        })
    
      test("It should response the GET method", async () => {
       try{
         const response = await request(app).get("/api/users/").expect('Content-Type', /json/).expect(200, done);
       }catch(e){
           console.log(e.message)
       }

        // expect(response.statusCode).toBe(200);
      });

      test("It should response the GET method", async () => {
        try{
          const response = await request(app)
                                .get("/api/users/me")
                                .expect('Content-Type', /json/)
                                .auth('username', 'password')
                                .expect(200, done);
        }catch(e){
            console.log(e.message)
        }
 
         // expect(response.statusCode).toBe(200);
       });



      test("It should response the GET method", async () => {
        try{
          const response = await request(app)
                                .get("/api/users/teams")
                                .expect('Content-Type', /json/)
                                .auth('username', 'password')
                                .expect(200, done);
        }catch(e){
            console.log(e.message)
        }
 
         // expect(response.statusCode).toBe(200);
       });


       test("It should response the GET method", async () => {
        try{
          const response = await request(app)
                                .get("/api/users/fixtures/pending")
                                .expect('Content-Type', /json/)
                                .auth('username', 'password')
                                .expect(200, done);
        }catch(e){
            console.log(e.message)
        }
 
         // expect(response.statusCode).toBe(200);
       });


       test("It should response the GET method", async () => {
        try{
          const response = await request(app)
                                .get("/api/users/fixtures/completed")
                                .expect('Content-Type', /json/)
                                .auth('username', 'password')
                                .expect(200, done);
        }catch(e){
            console.log(e.message)
        }
 
         // expect(response.statusCode).toBe(200);
       });

    });

    
// describe('TESTING USER ROUTEs', () => {
//     beforeAll(async() => {
//         await User.remove({})
//     });
    
//     afterEach(async() => {
//         await User.remove({})
//     })

//     afterAll(async() => {
//         await mongoose.connection.close()
//     })

//     it("Should save user to database", async done => {
//         console.log("HELLO WORLD TEST")
//         // done()
//         const res = await request.post("/api/user").send({
//           username: "Zell",
//           email: "testing@gmail.com",
//           password:"password",
//           confirmPassword:"password"
//         });
      
//         // // Searches the user in the database
//         // const user = await User.findOne({ email: "testing@gmail.com" });
//         done();

//       });    
// })

