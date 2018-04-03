const expect = require('expect.js');

const Route = require('./route');

let bonus = true;
let unit = new Route(bonus);

describe('Route', function() {
    it('should not require passing bonus', function () {
        expect(Route).to.not.throwException();
    });

    it('should take only true for bonus', function () {
        expect(Route).withArgs("string").to.throwException();
        expect(Route).withArgs(true).to.not.throwException();
    });

    it('should store data', function () {
        expect(unit.hasBonus()).to.be(bonus);
    });
});