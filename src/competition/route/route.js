const expect = require('expect.js');

function Route(hasBonus) {
    let bonus;
    if (hasBonus) { // fail if any unexpected data was passed
        expect(hasBonus).to.be(true);
        bonus = hasBonus;
    }

    this.hasBonus = function () {
        return bonus;
    };
}

module.exports = Route;