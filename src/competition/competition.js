const expect = require('expect.js');

const CompetitionEvent = require('./event');
const CompetitionParticipant = require('./participant');
const CompetitionRoute = require('./route');

const moment = require('moment');
const ScoreCalculator = require('./standard-score-calculator');

function Competition(n, ps) {
    expect(n).to.be.a('string');
    let participants = [];
    let routes = [];
    let events = [];

    let name = n;
    let start = moment(ps);

    this.getName = function () {
        return name;
    };

    this.getParticipants = function() {
        return [ ...participants ];
    };

    this.getRoutes = function() {
        return [ ...routes ];
    };

    this.getEvents = function () {
        return [ ...events ];
    };

    this.addParticipant = function (participant) {
        expect(participant instanceof CompetitionParticipant).to.be(true);
        participants.push(participant);
    };

    this.addRoute = function (route) {
        expect(route).to.be.a(CompetitionRoute);
        routes.push(route);
    };

    this.addEvent = function (participant, route, status) {
        expect(participants).to.contain(participant);
        expect(routes).to.contain(route);
        expect(Object.values(CompetitionEvent.Status)).to.contain(status);
        if (status === CompetitionEvent.Status.Bonus) {
            expect(route.hasBonus()).to.be(true);
        }
        events.push(new CompetitionEvent(participant, route, status));
    };

    this.disqualify = function (participant) {
        expect(participants).to.contain(participant);
        events.push(new CompetitionEvent(participant, null, CompetitionEvent.Status.Disqualified))
    };

    this.getScores = function () {
        return ScoreCalculator.calculate( [...events] );
    }
}

Competition.Event = CompetitionEvent;
Competition.Participant = CompetitionParticipant;
Competition.Route = CompetitionRoute;

module.exports = Competition;