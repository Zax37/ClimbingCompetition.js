const expect = require('expect.js');

const StandardScoreCalculator = require('./standard-score-calculator');
const CompetitionEvent = require('../event');

let participantMock = 'participant';
let routeMock1 = 'route1';
let routeMock2 = 'route2';

let events = [];
events.push(new CompetitionEvent(participantMock, routeMock1, CompetitionEvent.Status.Bonus));
events.push(new CompetitionEvent(participantMock, routeMock1, CompetitionEvent.Status.Top));
events.push(new CompetitionEvent(participantMock, routeMock2, CompetitionEvent.Status.Bonus));


describe('StandardScoreCalculator', function () {
    it('should count tops and bonuses', function () {
        let data = StandardScoreCalculator.calculate(events).forParticipant(participantMock);
        expect(data.getTopCount()).to.be(1);
        expect(data.getBonusCount()).to.be(2);
        expect(data.sumUp()).to.be(4);
    });

    it('but not points, when disqualified', function () {
        events.push(new CompetitionEvent(participantMock, routeMock2, CompetitionEvent.Status.Disqualified));
        let data = StandardScoreCalculator.calculate(events).forParticipant(participantMock);
        expect(data.getTopCount()).to.be(1);
        expect(data.getBonusCount()).to.be(2);
        expect(data.sumUp()).to.be(0);
    });
});