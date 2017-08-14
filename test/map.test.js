const chai = require('chai');
const expect = chai.expect;
const rgAsync = require('../src');

chai.use(require('chai-as-promised'));

describe('map tests', () => {
    it('it should get and empty array', () => {
        expect(rgAsync.map([], () => Promise.resolve(0))).to.eventually.be.an('array').empty;
    });

    it('it should return a mapped array with each item multiplied by 2', () => {
        expect(rgAsync.map([1, 2, 3], value => Promise.resolve(value * 2))).to.eventually.be.deep.equal([2, 4, 6]);
    });

    it('it should a return mapped array with each item as an object with name', () => {
        expect(rgAsync.map(['rg', 'async', 'promise'], value => Promise.resolve({name: value})))
        .to.eventually.be.deep.equal([{name: 'rg'}, {name: 'async'}, {name: 'promise'}]);
    });
});