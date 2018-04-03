// EXPRESS FRAMEWORK FOR ROUTER
const express = require('express');
const router = express.Router();

const Data = require('../../data');
const Endpoint = require('./api-endpoint')();

const CompetitionEndpoints = require('./competition');

const apiEndpoints = [
    new Endpoint(Data.getCompetitions, "competitions", "GET"),
    new Endpoint(Data.addCompetition, "competitions", "PUT", {
        name: { text: "Competition name." },
        start: { optional: true, text: "Planned start date."}
    }),
    new Endpoint(Data.getParticipants, "participants", "GET"),
    new Endpoint(Data.addParticipant, "participants", "PUT",
        { name: { text: "Participant name." } }),
    new Endpoint(Data.getRoutes, "routes", "GET"),
    new Endpoint(Data.addRoute, "routes", "PUT",
        { bonus: { optional: true, text: "Route bonus."} }),

    ...CompetitionEndpoints
];

let apiDesc = {
    "version": "1.0",
    "links": apiEndpoints.map(endpoint => {
        return {
            method: endpoint.getMethod(),
            url: endpoint.getURL(),
            args: endpoint.getArgs()
        }
    })
};

router.get("/", function (req, res) {
    res.json(apiDesc);
});

apiEndpoints.forEach(endpoint => endpoint.applyTo(router));

module.exports = router;