const expect = require('expect.js');

const Status = require('../event').Status;

let StandardScoreCalculator = new function () {
    this.calculate = function (events) {
        expect(events).to.be.an(Array);

        let participants = [];

        events.forEach(event => {
            let participant = event.getParticipant();
            let status = event.getStatus();

            let data = participants[participant];
            if (data === undefined) {
                data = {
                    bonusCount: 0,
                    topCount: 0,
                    points: 0,
                };
            }

            switch (status) {
                case Status.Top:
                    data.topCount++;
                    data.points += 2;
                    break;
                case Status.Bonus:
                    data.bonusCount++;
                    data.points += 1;
                    break;
                case Status.Disqualified:
                    data.disqualified = true;
                    break;
                /* istanbul ignore next */
                default:
                    break;
            }

            participants[participant] = data;
        });

        return new function CalculatedScores() {
            this.forParticipant = function (participant) {
                return new function ParticipantScores() {
                    let data = participants[participant];

                    this.sumUp = function () {
                        return data.disqualified?0:data.points;
                    };

                    this.getTopCount = function () {
                        return data.topCount;
                    };

                    this.getBonusCount = function () {
                        return data.bonusCount;
                    };
                };
            }
        };
    }
};

module.exports = StandardScoreCalculator;