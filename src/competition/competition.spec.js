const expect = require('expect.js');

const Competition = require('./competition');

let competitionName = "Some name";
let unit = new Competition(competitionName);
let participantMock = new Competition.Participant("name");
let routeMock = new Competition.Route();
let statusTop = Competition.Event.Status.Top;
let statusBonus = Competition.Event.Status.Bonus;
let statusDisqualified = Competition.Event.Status.Disqualified;
let anything = 'anything';

describe('Competition', function() {
    it('should be created empty', function () {
        expect(unit.getParticipants()).to.be.empty();
        expect(unit.getRoutes()).to.be.empty();
        expect(unit.getEvents()).to.be.empty();
    });

    it('should be immutable', function () {
        unit.getParticipants().push(anything);
        expect(unit.getParticipants()).to.be.empty();
        unit.getRoutes().push(anything);
        expect(unit.getRoutes()).to.be.empty();
        unit.getEvents().push(anything);
        expect(unit.getEvents()).to.be.empty();
    });

    it('should store data', function () {
        expect(unit.getName()).to.be(competitionName);
        unit.addParticipant(participantMock);
        unit.addRoute(routeMock);
        unit.addEvent(participantMock, routeMock, statusTop);
        let events = unit.getEvents();
        expect(events).to.have.length(1);
        let event = events[0];
        expect(event.getParticipant()).to.be(participantMock);
        expect(event.getRoute()).to.be(routeMock);
        expect(event.getStatus()).to.be(statusTop);
    });

    it('should use score calculator', function () {
        unit.addEvent(participantMock, routeMock, statusTop);
        let participantScores = unit.getScores().forParticipant(participantMock);
        expect(participantScores.sumUp()).to.be.greaterThan(0);
    });

    it('should give zero for disqualified', function () {
        unit.disqualify(participantMock);
        let participantScores = unit.getScores().forParticipant(participantMock);
        expect(participantScores.sumUp()).to.be(0);
    });

    describe('should raise error when', function () {
        let addingEvent = unit.addEvent;

        it('passed participant not in competition', function () {
            expect(addingEvent)
                .withArgs(anything, routeMock, statusTop)
                .to.throwException();
        });

        it('passed route not in competition', function () {
            expect(addingEvent)
                .withArgs(participantMock, anything, statusTop)
                .to.throwException();
        });

        it('passed wrong status', function () {
            expect(addingEvent)
                .withArgs(participantMock, routeMock, anything)
                .to.throwException();
        });

        it('passed bonus status for route with no bonus', function () {
            expect(addingEvent)
                .withArgs(participantMock, routeMock, statusBonus)
                .to.throwException();
        });
    });
});