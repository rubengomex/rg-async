const chai = require('chai');
const expect = chai.expect;
const rgAsync = require('../src');

chai.use(require('chai-as-promised'));

describe('filter tests', () => {

    it('it should return a resolved empty array if the srcArray is null or undefined', () => {
        expect(rgAsync.filter(null)).to.eventually.be.an('array').empty;
    });

    it('it should get and empty array', () => {
        expect(rgAsync.filter([], () => Promise.resolve())).to.eventually.be.an('array').empty;
    });

    it('it should return a filtered array with the number that are even', () => {
        expect(rgAsync.filter([2, 5, 9], value => Promise.resolve(value % 2 === 0))).to.eventually.be.deep.equal([2]);
    });

    it('it should a return a filtered array that the item match rg name', () => {
        expect(rgAsync.filter(['rg', 'async', 'promise'], value => Promise.resolve(value === 'rg'))).to.eventually.be.deep.equal(['rg']);
    });
});