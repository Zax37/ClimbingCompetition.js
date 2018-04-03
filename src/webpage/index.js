// EXPRESS FRAMEWORK FOR ROUTER
const express = require('express');
const router = express.Router();

const Competition = require('../competition');
const Data = require('../data');

function scoreTable(competitionId) {
    let scores = Data.Competition.getScores(competitionId)();
    return scores;
}

router.get("/", function (req, res) {
    res.render('index', {
        APPLICATION_TITLE: "ClimbingCompetitions.js",
        COMPETITIONS: Data.getCompetitions(),
        GET_SCORES: scoreTable
    });
});

module.exports = router;