const expect = require('expect.js');

const Participant = require('./participant');

let name = "First Last";
let num = 37;
let unit = new Participant(name);

describe('Participant', function() {
    it('should take only string for name', function () {
        expect(Participant).withArgs(num).to.throwException();
        expect(Participant).withArgs(name).to.not.throwException();
    });

    it('should store data', function () {
        expect(unit.getName()).to.be(name);
    });
});