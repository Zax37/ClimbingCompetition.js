const expect = require('expect.js');

function CompetitionDataHelper(competitions, participants, routes) {
    let competition;

    function getId(params, keys) {
        if (!keys) {
            keys = ['id'];
        } else {
            expect(keys).to.be.an('array');
        }
        expect(params).to.have.keys(keys);
        for (let i in keys) {
            let id = Number(params[keys[i]]);
            expect(id).not.to.be(NaN);
            keys[i] = id;
        }
        return keys;
    }

    let CompetitionData = {
        getParticipants: function (params) {
            return competition.getParticipants().map((participant, index) => {
                return {
                    id: index,
                    name: participant.getName()
                };
            });
        },

        addParticipant: function (params) {
            let participant = participants[getId(params)];
            competition.addParticipant(participant);
        },

        getRoutes: function (params) {
            return competition.getRoutes().map((route, index) => {
                return {
                    id: index,
                    bonus: route.hasBonus()
                }
            });
        },

        addRoute: function (params) {
            let route = routes[getId(params)];
            competition.addRoute(route);
        },

        getEvents: function (params) {
            return competition.getEvents().map((ev, index) => {
                return {
                    id: index,
                    participant: ev.getParticipant(),
                    route: ev.getRoute(),
                    status: ev.getStatus(),
                    timestamp: ev.getTimestamp()
                }
            });
        },

        addEvent: function (params) {
            let [ pid, rid, status ] = getId(params, ['pid', 'rid', 'status']);

            let participant = participants[pid];
            let route = routes[rid];
            competition.addEvent(participant, route, status);
        }
    };
    
    // CREATE THE INTERMEDIATE GHOST-FUNCTIONS
    for (let fn in CompetitionData) {
        this[fn] = function(id) {
            competition = competitions[id];
            if (!competition) {
                throw new Error("Competition with id "+id+" was not found.");
            }
            return CompetitionData[fn];
        };
    }
}

module.exports = CompetitionDataHelper;