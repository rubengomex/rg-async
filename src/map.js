/**
 * @memberOf module:rg-async
 * @author Rúben Gomes <gomesruben21@gmail.com> (http://rubengomes10.github.io/)
 * @classdesc Defines a Map class. Provides two methods (map that will run in parallel and mapSeries that will run in series).
 */
class Map {

    /**
     * Invokes in parallel an async mapper function on each item in the given source Array.
     * This will return a promise to be resolved containing the new array with the mapped/transformed items.
     * @method module:rg-async.Map.map
     * @static
     *
     * @param  {Array} srcArray     Specifies the source array to map over.
     * @param  {Function} mapper    Specifies the async function that will be called with (value, index, array) as arguments and returns the new mapped value.
     * @return {Promise}            Returns a promise to be resolved containing the new array with the mapped/transformed items.
     */
    static map(srcArray, mapper){
        return Promise.all(srcArray.map(mapper));
    }

    static mapSeries(srcArray, mapper){}
}

module.exports = Map;