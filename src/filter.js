const {
    map
} = require('./map');

/**
 * @memberOf module:rg-async
 * @author Rúben Gomes <gomesruben21@gmail.com>
 * @classdesc Defines a Filter class. Provides two methods (filter that will run in parallel and filterSeries that will run in series).
 */
class Filter {

    /**
     * Invokes in parallel an async predicate function on each item in the given source Array.
     * This will return a promise to be resolved containing the new array with the items that predicate function returned a truthy value.
     * @method module:rg-async.Filter.filter
     * @static
     *
     * @param  {Array} srcArray     Specifies the source array to filter over.
     * @param  {Function} predicate Specifies the async function that will be called with (value, index, array) as arguments and returns true to keep the value in the resulting filtered array.
     * @return {Promise}            Returns a promise to be resolved containing the new array with the filtered items.
     */
    static async filter(srcArray, predicate) {
        const mappedArray = await map(srcArray, predicate);
        return srcArray.filter((value, index) => !!mappedArray[index]);
    }
}

module.exports = Filter;