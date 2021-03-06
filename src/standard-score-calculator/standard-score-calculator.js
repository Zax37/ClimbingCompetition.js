const expect = require('expect.js');

const Competition = require('../competition');
const Status = Competition.Event.Status;

let StandardScoreCalculator = new function () {
    this.calculate = function (competition) {
        expect(competition).to.be.a(Competition);
        let events = competition.getEvents();
        let participants = competition.getParticipants();
        let results = new Array(participants.length);

        for (let i=0; i<results.length; i++)
        {
            results[i] = {
                bonusCount: 0,
                topCount: 0,
                points: 0,
                disqualified: false
            };
        }

        events.forEach(event => {
            let participant = event.getParticipant();
            let status = event.getStatus();

            let pid = participants.findIndex(function (element) {
                return element === participant;
            });

            /* istanbul ignore if */
            if (pid === -1) { // this should never happen
                throw new Error("Unexpected - found event with participant not signed to this competition.")
            }

            let data = results[pid];

            switch (status) {
                case Status.Top:
                    data.topCount++;
                    break;
                case Status.Bonus:
                    data.bonusCount++;
                    break;
                case Status.Disqualified:
                    data.disqualified = true;
                    break;
                /* istanbul ignore next */
                default: // skip events that aren't counted
                    break;
            }

            results[pid] = data;
        });

        function countScore(data) {
            return data.disqualified ? 0 : (data.topCount*2+data.bonusCount);
        }

        return new function CalculatedScores() {
            this.forParticipant = function (participant) {
                return new function ParticipantScores() {
                    let pid = participants.findIndex(function (element) {
                        return element === participant;
                    });

                    if (pid === -1) {
                        throw new Error("Participant did not take part in this competition.");
                    }

                    let data = results[pid];

                    this.sumUp = function () {
                        return countScore(data);
                    };

                    this.getTopCount = function () {
                        return data.topCount;
                    };

                    this.getBonusCount = function () {
                        return data.bonusCount;
                    };
                };
            };

            this.forAll = function () {
                return results.map((data, index) => ({
                    name: participants[index].getName(),
                    bonus: data.bonusCount,
                    top: data.topCount,
                    disqualified: data.disqualified,
                    score: countScore(data)
                }));
            };
        };
    }
};

module.exports = StandardScoreCalculator;