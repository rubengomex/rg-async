const chai = require('chai');
const expect = chai.expect;
const rgAsync = require('../src');

chai.use(require('chai-as-promised'));

describe('series tests', () => {

    it('it should get and empty array', () => {
        expect(rgAsync.series([])).to.eventually.be.an('array').empty;
    });

    it('it should get an array with 1,2,3 values populated in series without async await keywords', () => {
        const srcArray = [
            () => Promise.resolve(1),
            () => Promise.resolve(2),
            () => Promise.resolve(3)
        ];

        expect(rgAsync.series(srcArray)).to.eventually.be.deep.equal([1,2,3]);
    });

    it('it should get an array with one,two,three values populated in series with async await keywords', () => {
        const srcArray = [
            async () => await Promise.resolve('one'),
            async () => await Promise.resolve('two'),
            async () => await Promise.resolve('three')
        ];

        expect(rgAsync.series(srcArray)).to.eventually.be.deep.equal(['one','two','three']);
    });
});