const expect = require('expect.js');

function Participant(n) {
    expect(n).to.be.a('string');
    let name = n;

    this.getName = function () {
        return name;
    };
}

module.exports = Participant;