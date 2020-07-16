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

const {Fixture} = require("../../models/Fixture")
const {Team} = require("../../models/Team")

describe('Fixture Model Test', () => {
    
    beforeAll(async() => {
        await Fixture.remove({})
    });
    
    afterEach(async() => {
        await Fixture.remove({})
    })

    afterAll(async() => {
        await mongoose.connection.close()
    })

    it("has a module", () => {
        expect(Fixture).toBeDefined()
    })

    it("create fixture", async() => {
        let team1 = new Team({
            team_name:"Man City",
            team_description:"Man City Sports Club",
            team_coach:"Pep",
            team_size:30
        })
    
        let team2 = new Team({
            team_name:"Chelsea",
            team_description:"Chelsea Sports Club",
            team_coach:"Lampard",
            team_size:30
        })

        team1 = await team1.save()
        team2 = await team2.save()

        
        let fixture = new Fixture({
            title:"Chelsea VS Man City",
            team1:team1._id,        
            team2:team2._id,
        })

        fixture = await fixture.save()

        let foundFixture = await Fixture.findOne({title:"Chelsea VS Man City"})
        console.log("TITLE",foundFixture.title)
        let expected_name = "Chelsea VS Man City"
        let actual_name = foundFixture.title

        let expected_team1 = team1._id
        let expected_team2 = team2._id

        let expected_status = "pending"

        let actual_team1 = foundFixture.team1
        let actual_team2  = foundFixture.team2
        let actual_status = foundFixture.status
        expect(actual_name).toEqual(expected_name)
        expect(actual_team1).toEqual(expected_team1)
        expect(actual_team2).toEqual(expected_team2)
        expect(actual_status).toEqual(expected_status)
    })
})
