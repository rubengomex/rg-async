rg-async
========

A small library with JS functional utility methods to run async code with promises (async/await keywords)

[![docs](http://inch-ci.org/github/rubengomex/rg-async.svg?branch=master)](https://rubengomex.github.io/rg-async/)
[![travis build](https://img.shields.io/travis/rubengomex/rg-async.svg)](https://travis-ci.org/rubengomex/rg-async)
[![codecov coverage](https://img.shields.io/codecov/c/github/rubengomex/rg-async.svg)](https://codecov.io/gh/rubengomex/rg-async)
[![code climate](https://img.shields.io/codeclimate/github/rubengomex/rg-async.svg)](https://codeclimate.com/github/rubengomex/rg-async)
[![dependencies](https://img.shields.io/david/rubengomex/rg-async.svg)](https://david-dm.org/rubengomex/rg-async)
[![downloads](https://img.shields.io/npm/dm/rg-async.svg)](https://npm-stat.com/charts.html?package=rg-async&from=2017-08-11)
[![node version](https://img.shields.io/node/v/rg-async.svg)](https://nodejs.org)
[![MIT Licence](https://img.shields.io/npm/l/rg-async.svg)](https://opensource.org/licenses/MIT)

[![NPM](https://nodei.co/npm/rg-async.png?downloads=true&downloadRank=true&stars=true)](https://npm.im/rg-async)

### Installation

```bash
    $ npm install --save rg-async
```

```bash
    $ npm i -S rg-async
```

### Test

```bash
    $ npm t
```


## Basic usage

* Without async/await keywords:

```js
const rgAsync = require('rg-async');

rgAsync.filter([1,2,3], value => Promise.resolve(value % 2 === 0))
    .then(filteredArray => console.log(filteredArray)) // output => [2]
    .catch(err => console.log(err));

```

* With async/await keywords:

```js
const rgAsync = require('rg-async');

rgAsync.map([1,2,3], async value => {
    try {
        const multiplyValue = await getAsyncMultiplyValue(); // some async code which returns 2 as a promise resolved value.
    }catch(err){
        throw err;
    }
    return value * multiplyValue;
})
.then(mappedArray => console.log(mappedArray)) // output => [2,4,6]
.catch(err => console.log(err));

```

* With async method scope:

```js

const rgAsync = require('rg-async');
const array = [1,2,3];

async function printRgAsyncPlusArrayNumbers(array){
    await rgAsync.each([1,2,3], async value => {
        const name = await getAsyncName(); // some async code which returns 'rg-async' as a promise resolved value.
        console.log(name + ' ' + value); 
    });
}

printRgAsyncPlusArrayNumbers(array)
    .then(() => console.log('All promises resolved')) // output => rg-async 1, rg-async 2, rg-async 3, All promises resolved
    .catch(err => console.log(err));
```

## API

* [Filter](#filter)
* [Map](#map)
* [Each](#each)
* [Reduce](#reduce)
* [Series](#series)
* [Parallel](#parallel)

#### Filter

* `filter(srcArray, predicate)` method invokes in parallel an async `predicate` function on each item in the given source Array.

* This will return a `promise` to be resolved containing the new array with the items that predicate function returned a truthy value.

* The async `predicate` function follows the `standard javascript filter arguments`- `(value, index, array)` and needs to return a `promise`.

* Examples

    * With `.then` - `.catch` functions
    
    ```js
    const rgAsync = require('rg-async');

    rgAsync.filter([1,2,3], value => Promise.resolve(value < 3))
        .then(filteredArray => console.log(filteredArray)) // output => [1,2]
        .catch(err => console.log(err)); // if exists any case that you throw an error on your predicate function
    ```

    * With `async/await` keywords
    
    ```js
    const rgAsync = require('rg-async');

    // if you are inside of a async function scope
    // if exist any case that you throw an error you should wrap this with try-catch clause
    try{
        const result = await rgAsync.filter([1,2,3], value => Promise.resolve(value < 3));
        console.log(result); // output => [1,2]
    }catch(err){
        console.log(err);
    }
    ```

#### Map

* `map(srcArray, mapper)` method invokes in parallel an async `mapper`con function on each item in the given source Array.

* This will return a `promise` to be resolved containing the new array with the mapped/transformed items.

* The `mapper` function follows the `standard javascript map arguments` - `(value, index, array)`and needs to return a `promise`.

* Examples

    * With `.then` - `.catch` functions
    
    ```js
    const rgAsync = require('rg-async');

    rgAsync.map([1,2,3], value => Promise.resolve(value * 2))
        .then(mappedArray => console.log(mappedArray)) // output => [2,4,6]
        .catch(err => console.log(err)); // if exists any case that you throw an error on your mapper function
    ```

    * With `async/await` keywords
    
    ```js
    const rgAsync = require('rg-async');

    // if you are inside of a async function scope
    // if exist any case that you throw an error you should wrap this with try-catch clause
    try{
        const result = await rgAsync.map([1,2,3], value => Promise.resolve(value * 2));
        console.log(result); // output => [2,4,6]
    }catch(err){
        console.log(err);
    }
    ```

#### Each

* `each(srcArray, consumer)` method invokes in parallel an async `consumer` function on each item in the given source Array.

* This will return a `promise` without any resolved value.

* The `consumer` function follows the `standard javascript forEach arguments` - `(value, index, array)`and needs to return a `promise`.

* Examples

    * With `.then` - `.catch` functions

    ```js
    const rgAsync = require('rg-async');

    rgAsync.each([1,2,3], value => Promise.resolve(console.log(value)))
        .then(() => console.log('done')) // output => 1,2,3,done
        .catch(err => console.log(err)); // if exists a case that you throw an error on your consumer function
    ```

    * With `async/await` keywords

    ```js
    const rgAsync = require('rg-async');

    // if you are inside of a async function scope
    // if exist any case that you throw an error you should wrap this with try-catch clause
    try{
        await rgAsync.each([1,2,3], value => Promise.resolve(console.log(value)));
        console.log('done'); // output => 1,2,3,done
    }catch(err){
        console.log(err);
    }
    ```

#### Reduce

* `reduce(srcArray, reducer, accumulator)` method invokes in series an async `reducer` function on each item in the given source Array.

* The `reducer` function transforms an `accumulator` value based on each item iterated over. The `reducer` function follows the `standard javascript map arguments`- `(accumulator, currValue, index, array)` and needs to return a `promise.`

* This will return a `promise` to be resolved containing the accumulator final value.

* Examples

    * With `.then` - `.catch` functions
    
    ```js
    const rgAsync = require('rg-async');

    rgAsync.reduce([1,2,3], (accumulator, currVal) => Promise.resolve(accumulator + currVal), 0)
    .then(accumulator => console.log(accumulator)) // output => 6
    .catch(err => console.log(err)); // if exists any case that you throw an error on your reducer function
    ```

    * With `async/await` keywords
    
    ```js
    const rgAsync = require('rg-async');

    // if you are inside of a async function scope
    // if exist any case that you throw an error you should wrap this with try-catch clause
    try{
        const result = await  rgAsync.reduce([1,2,3], (accumulator, currVal) => Promise.resolve(accumulator + currVal), 0);
        console.log(result); // output => 6
    }catch(err){
        console.log(err);
    }
    ```

#### Series

* `series(srcArray)` method invokes in series each item in the given source Array.

* This will return a `promise` to be resolved containing the same structure as the `srcArray`, but with the resolved values

* Example

```js
const rgAsync = require('rg-async');
const list = [
    async () => await someAsyncCode1(), // let assume that this will return a promise with resolved value of 1 
    async () => await someAsyncCode2(), // returns 2 as a resolved value
    async () => await someAsyncCode3(), // returns 3 as a resolved value
    () => Promise.resolve(4) // returns 4 as a resolved value
];
// if you are inside of a async function scope
// if exist a case that you throw an error you should wrap this with try-catch clause
try{
    const result = await rgAsync.series(list);
    console.log(result); // output => [1,2,3,4]
}catch(err){
    console.log(err);
}

// if you aren't inside of async function scope you should use .then method
rgAsync.series(list)
    .then(resultArray => console.log(resultArray)); // output => [1,2,3,4]
    .catch(err => console.log(err)); // if exists a case that you throw an error on your list of promises
```

#### Parallel

* `parallel(srcArray)` method invokes in parallel each item in the given source Array.

* This will return a `promise` to be resolved containing the same structure as the `srcArray`, but with the resolved values

* Example

```js
const rgAsync = require('rg-async');
const list = [
    async () => await someAsyncCode1(), // let assume that this will return a promise with resolved value of 'one'
    async () => await someAsyncCode2(), // returns 'two' as a resolved value
    async () => await someAsyncCode3(), // returns 'three' as a resolved value
    () => Promise.resolve('four') // returns 'four' as a resolved value
];
// if you are inside of a async function scope
// if exist a case that you throw an error you should wrap this with try-catch clause
try{
    const result = await rgAsync.parallel(list);
    console.log(result); // output => ['one','two','three','four']
}catch(err){
    console.log(err);
}

// if you aren't inside of async function scope you should use .then method
rgAsync.parallel(list)
    .then(resultArray => console.log(resultArray)); // output => ['one','two','three','four']
    .catch(err => console.log(err)); // if exists a case that you throw an error on your list of promises
```

