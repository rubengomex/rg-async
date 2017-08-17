/**
 * @memberOf module:rg-async
 * @author Rúben Gomes <gomesruben21@gmail.com>
 * @classdesc Defines a Reduce class. Provides a reduce method that will run in series).
 */
class Reduce {

    /**
     * Invokes in series an async reducer function on each item in the given source Array.
     * The reducer function transforms an `accumulator` value based on each item iterated over
     * @method module:rg-async.Reduce.reduce
     * @static
     *
     * @param  {Array} srcArray     Specifies the source array to reduce over.
     * @param  {Function} reduce    Specifies the async function that will be called with (accumulator, currValue, index, array) as arguments and returns a new value for accumulator.
     * @param  {*} accumulator      Specifies the initial accumulator value
     * @return {Promise}            Returns a promise to be resolved containing final accumulator value.
     */
    static reduce(srcArray, reducer, accumulator) {
        return Promise.resolve(accumulator)
            .then(curr => (
                srcArray.reduce((promise, currValue, index) => (
                    promise.then(async () => (curr = await reducer(curr, currValue, index)))), Promise.resolve())
                .then(() => curr)
            ));
    }
}

module.exports = Reduce;