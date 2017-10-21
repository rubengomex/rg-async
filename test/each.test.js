const chai = require('chai');
const expect = chai.expect;
const rgAsync = require('../src');

chai.use(require('chai-as-promised'));

describe('each tests', () => {

    it('it should return a resolved undefined value if the srcArray is null or undefined', () => {
        expect(rgAsync.each(null)).to.eventually.be.undefined;
    });

    it('it should return a resolved undefined value if the consumer function is null or undefined', () => {
        expect(rgAsync.each([1])).to.eventually.be.undefined;
    });


    it('it should have an array with the same values based on the consumer function', () => {
        const resultArray = [];
        expect(rgAsync.each([1], (value) => Promise.resolve(resultArray.push(value)))).to.eventually.be.fulfilled;

        expect(resultArray).to.have.length(1);
    });
});