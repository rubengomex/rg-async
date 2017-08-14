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

module.exports = {
    map,
    filter
};