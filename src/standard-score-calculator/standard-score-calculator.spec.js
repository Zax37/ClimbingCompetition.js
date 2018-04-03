const expect = require('expect.js');

const Competition = require('../competition');
const StandardScoreCalculator = require('./standard-score-calculator');

let competition;

let participantName = "Some Name";
let participant = new Competition.Participant(participantName);
let route1 = new Competition.Route(true);
let route2 = new Competition.Route(true);
let anotherParticipant = new Competition.Participant("Other Name");

describe('StandardScoreCalculator', function () {
    beforeEach(function () {
        competition = new Competition("TestCompetition");

        competition.addParticipant(participant);
        competition.addRoute(route1);
        competition.addRoute(route2);

        competition.addEvent(participant, route1, Competition.Event.Status.Bonus);
        competition.addEvent(participant, route1, Competition.Event.Status.Top);
        competition.addEvent(participant, route2, Competition.Event.Status.Bonus);
    });

    it('should count tops and bonuses', function () {
        let data = StandardScoreCalculator.calculate(competition).forParticipant(participant);
        expect(data.getTopCount()).to.be(1);
        expect(data.getBonusCount()).to.be(2);
        expect(data.sumUp()).to.be(4);
    });

    it('should not count points for disqualified', function () {
        competition.disqualify(participant);
        let data = StandardScoreCalculator.calculate(competition).forParticipant(participant);
        expect(data.getTopCount()).to.be(1);
        expect(data.getBonusCount()).to.be(2);
        expect(data.sumUp()).to.be(0);
    });

    it('should return data for all', function () {
        let data = StandardScoreCalculator.calculate(competition).forAll();
        expect(data).to.be.an('array');
        let [ participantResults ] = data;
        expect(participantResults.name).to.be(participantName);
        expect(participantResults.top).to.be(1);
        expect(participantResults.bonus).to.be(2);
        expect(participantResults.score).to.be(4);
    });

    it('should fail to get score for participant not in this competition', function () {
        let data = StandardScoreCalculator.calculate(competition);
        expect(data.forParticipant).withArgs(anotherParticipant).to.throwError();
    });
});