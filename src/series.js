const {
    reduce
} = require('./reduce');
/**
 * @memberOf module:rg-async
 * @author Rúben Gomes <gomesruben21@gmail.com>
 * @classdesc Defines a Series class. Provides a series method that will run in series).
 */
class Series {

    /**
     * Invokes in series each item in the given source Array.
     * @method module:rg-async.Series.serie
     * @static
     *
     * @param  {Array} srcArray     Specifies the source array with promises to run in series.
     * @return {Promise}            Returns a promise to be resolved containing the same structure as the srcArray but with the resolved values.
     */
    static series(srcArray) {
        return reduce(srcArray, async(accumulator, curr) => {
            accumulator.push(await curr());
            return accumulator;
        }, []);
    }
}

module.exports = Series;