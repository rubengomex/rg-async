/**
 * @memberOf module:rg-async
 * @author Rúben Gomes <gomesruben21@gmail.com>
 * @classdesc Defines a Parallel class. Provides a parallel method that will run in parallel).
 */
class Parallel {

    /**
     * Invokes in parallel each item in the given source Array.
     * @method module:rg-async.Parallel.parallel
     * @static
     *
     * @param  {Array} srcArray     Specifies the source array with promises to run in parallel.
     * @return {Promise}            Returns a promise to be resolved containing the same structure as the source array but with the resolved values.
     */
    static parallel(srcArray) {
        return Promise.all(srcArray.map(value => value()));
    }
}

module.exports = Parallel;