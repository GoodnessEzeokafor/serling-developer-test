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


const {Team} = require("../../models/Team")

describe('Team Model Test', () => {
    
    beforeAll(async() => {
        await Team.remove({})
    });
    
    afterEach(async() => {
        await Team.remove({})
    })

    afterAll(async() => {
        await mongoose.connection.close()
    })

    it("has a module", () => {
        expect(Team).toBeDefined()
    })

    it("create team", async() => {
        let team1 = new Team({
            team_name:"Man City",
            team_description:"Man City Sports Club",
            team_coach:"Pep",
            team_size:30
        })
    

        team1 = await team1.save()

        let foundTeam = await Team.findOne({team_name:"Man City"})
        
        let expected_team_name = "Man City"
        let actual_team_name = foundTeam.team_name

        let expected_team_description = "Man City Sports Club"
        let expected_team_coach = "Pep"
        let expected_team_size = 30

        let actual_team_description = foundTeam.team_description
        let actual_team_coach  = foundTeam.team_coach
        let actual_team_size = foundTeam.team_size
        expect(actual_team_name).toEqual(expected_team_name)
        expect(actual_team_description).toEqual(expected_team_description)
        expect(actual_team_coach).toEqual(expected_team_coach)
        expect(actual_team_size).toEqual(expected_team_size)
    })
})
