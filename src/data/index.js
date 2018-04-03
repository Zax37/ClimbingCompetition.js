const Competition = require('../competition');
const CompetitionData = require('./competition');

let Data = new function Data() {
    let competitions = [];
    let participants = [];
    let routes = [];

    this.getCompetitions = function () {
        return competitions.map((competition, index) => {
            return {
                id: index,
                name: competition.getName()
            };
        });
    };

    this.addCompetition = function (params) {
        let name, start;
        if (params) {
            name = params.name;
            start = params.start;
        }
        competitions.push(new Competition(name, start));
    };

    this.getParticipants = function () {
        return participants.map((participant, index) => {
            return {
                id: index,
                name: participant.getName()
            };
        });
    };

    this.addParticipant = function (params) {
        let name;
        if (params) {
            name = params.name;
        }
        participants.push(new Competition.Participant(params.name));
    };

    this.getRoutes = function () {
        return routes.map((route, index) => {
            return {
                id: index,
                bonus: route.hasBonus()
            };
        });
    };

    this.addRoute = function (params) {
        routes.push(new Competition.Route(params.bonus !== undefined));
    };

    this.Competition = new CompetitionData(competitions, participants, routes);
};

module.exports = Data;