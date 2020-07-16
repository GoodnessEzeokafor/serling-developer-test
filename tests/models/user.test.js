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


const {User} = require("../../models/User")

describe('User Model Test', () => {
    
    beforeAll(async() => {
        await User.remove({})
    });
    
    afterEach(async() => {
        await User.remove({})
    })

    afterAll(async() => {
        await mongoose.connection.close()
    })

    it("has a module", () => {
        expect(User).toBeDefined()
    })

    it("create user", async() => {
        let user = new User({
            username:"goody",
            email: "goody@mail.com",
            password: "password",
    
        })
    

        user = await user.save()

        let foundUser = await User.findOne({email: "goody@mail.com"})
        
        let expected_username = "goody"
        let expected_email = "goody@mail.com"
        let expected_password = "password"

        let actual_username = foundUser.username
        let actual_email = foundUser.email
        let actual_password = foundUser.password
        expect(actual_username).toEqual(expected_username)
        expect(actual_email).toEqual(expected_email)
        expect(actual_password).toEqual(expected_password)
    })
})
