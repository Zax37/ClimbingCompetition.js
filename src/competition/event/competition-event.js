const moment = require('moment');

const CompetitionEventStatus = Object.freeze(
    {
        "Failed":0,
        "Bonus":1,
        "Top":2,
        "Disqualified":3
    }
);

function CompetitionEvent(p, r, s) {
    let participant = p;
    let route = r;
    let status = s;
    let timestamp = moment();

    return {
        getParticipant : function() {
            return participant;
        },
        getRoute : function() {
            return route;
        },
        getStatus : function() {
            return status;
        },
        getTimestamp : function () {
            return timestamp;
        }
    };
}

CompetitionEvent.Status = CompetitionEventStatus;

module.exports = CompetitionEvent;