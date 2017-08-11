const chai = require('chai');
const expect = chai.expect;
const rgAsync = require('../src');

chai.use(require('chai-as-promised'));

describe('map tests', () => {
    it('it should get and empty array', () => {
        expect(rgAsync.map([], () => Promise.resolve(0))).to.eventually.be.an('array').empty;
    });

    it('it should return a mapped array with each item multiplied by 2', () => {
        expect(rgAsync.map([1, 2, 3], async value => await Promise.resolve(value * 2))).to.eventually.be.deep.equal([2, 4, 6]);
    });
});