const CompetitionEvent = require('./competition-event');

const expect = require('expect.js');

let participantMock = 'participant';
let routeMock = 'route';
let status = CompetitionEvent.Status.Top;
let unit = new CompetitionEvent(participantMock, routeMock, status);

describe('Competition event', function () {
    it('should list available statuses', function () {
        expect(CompetitionEvent.Status).not.to.be(undefined);
        expect(CompetitionEvent.Status.Failed).to.be.a('number');
        expect(CompetitionEvent.Status.Bonus).to.be.a('number');
        expect(CompetitionEvent.Status.Top).to.be.a('number');
        expect(CompetitionEvent.Status.Disqualified).to.be.a('number');
    });

    it('should store data', function () {
        expect(unit.getParticipant()).to.be(participantMock);
        expect(unit.getRoute()).to.be(routeMock);
        expect(unit.getStatus()).to.be(status);
    });

    it('should not expose its private fields', function () {
        expect(unit.participant).to.be(undefined);
        expect(unit.route).to.be(undefined);
        expect(unit.status).to.be(undefined);
    });
});