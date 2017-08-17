/**
 * @module rg-async
 * @author Rúben Gomes <gomesruben21@gmail.com>
 * @description Functional utility methods to run async code with promises (async/await keywords)
 */

const {
    map
} = require('./map');
const {
    filter
} = require('./filter');
const {
    each
} = require('./each');
const {
    reduce
} = require('./reduce');
const {
    series
} = require('./series');
const {
    parallel
} = require('./parallel');

module.exports = {
    map,
    filter,
    each,
    reduce,
    series,
    parallel
};