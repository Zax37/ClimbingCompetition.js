const CompetitionData = require('../../../data').Competition;
const Endpoint = require('../api-endpoint')("/competition/:id", ["id"]);

module.exports = [
    new Endpoint(CompetitionData.getParticipants, "participants", "GET"),
    new Endpoint(CompetitionData.addParticipant, "participants", "PUT",
        { id: { text: "Participant id." } }),
    new Endpoint(CompetitionData.getRoutes, "routes", "GET"),
    new Endpoint(CompetitionData.addRoute, "routes", "PUT",
        { id: { text: "Route id."} }),
    new Endpoint(CompetitionData.getEvents, "events", "GET"),
    new Endpoint(CompetitionData.addEvent, "events", "PUT",
        {
            pid: { text: "Participant id." },
            rid: { text: "Route id."},
            status: { text: "Event status." }
        }),
    new Endpoint(CompetitionData.markTop, "markTop", "POST",
        {
            pid: { text: "Participant id." },
            rid: { text: "Route id."}
        }),
    new Endpoint(CompetitionData.markBonus, "markBonus", "POST",
        {
            pid: { text: "Participant id." },
            rid: { text: "Route id."}
        }),
    new Endpoint(CompetitionData.disqualify, "disqualify", "POST",
        {
            pid: { text: "Participant id." }
        }),
    new Endpoint(CompetitionData.getScores, "scoreTable", "GET")
];