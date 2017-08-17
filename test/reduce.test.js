const chai = require('chai');
const expect = chai.expect;
const rgAsync = require('../src');

chai.use(require('chai-as-promised'));

describe('reduce tests', () => {
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