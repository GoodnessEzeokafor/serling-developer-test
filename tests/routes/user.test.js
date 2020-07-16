const app = require("../../app"); // Link to your server file
const supertest = require("supertest");
const {User} = require('../../models/User')
// const 
const request = supertest(app);


it("Should save user to database", async done => {
    const res = await request.post("/api/user").send({
      username: "Zell",
      email: "testing@gmail.com",
      password:"password",
      confirmPassword:"password"
    });
  
    // Searches the user in the database
    const user = await User.findOne({ email: "testing@gmail.com" });
    done();
  });