/**
 * @memberOf module:rg-async
 * @author Rúben Gomes <gomesruben21@gmail.com>
 * @classdesc Defines a Each class. Provides two methods (each that will run in parallel and eachSeries that will run in series).
 */
class Each {

    /**
     * Invokes in parallel an async consumer function on each item in the given source Array.
     * This will return a promise without any resolved value.
     * @method module:rg-async.Each.each
     * @static
     *
     * @param  {Array} srcArray     Specifies the source array to consumed.
     * @param  {Function} consumer  Specifies the async function that will be called with (value, index, array) as arguments.
     * @return {Promise}            Returns a promise to be resolved without any value to be resolved.
     */
    static async each(srcArray, consumer) {
        await Promise.all(srcArray.map(consumer));
    }
}

module.exports = Each;