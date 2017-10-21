const chai = require('chai');
const expect = chai.expect;
const rgAsync = require('../src');

chai.use(require('chai-as-promised'));

describe('reduce tests', () => {

    it('it should return a resolved empty array value if the srcArray is null or undefined', () => {
        expect(rgAsync.reduce(null)).to.eventually.be.an('array').empty;
    });

    it('it should return a resolved empty array if the reducer function is null or undefined', () => {
        expect(rgAsync.reduce([1])).to.eventually.be.an('array').empty;
    });

    it('it should summarizes each array item and gets the final accumulator result', () => {
        expect(rgAsync.reduce([1, 2, 3], (accumulator, value) => Promise.resolve(accumulator + value), 0)).to.eventually.be.equal(6);
    });

    it('it should gets an object with properties name based on array values and the values based on the index', () => {
        expect(rgAsync.reduce(['one', 'two', 'three'], (accumulator, value, index) => {
            accumulator[value] = index + 1;
            return Promise.resolve(accumulator);
        }, {}))
        .to.eventually.be.deep.equal({
            'one': 1,
            'two': 2,
            'three': 3
        });
    });
});