rg-async
========

A small library with JS functional utility methods to run async code with promises (async/await keywords)

[![travis build](https://img.shields.io/travis/rubengomex/rg-async.svg)](https://travis-ci.org/rubengomex/rg-async)
[![codecov coverage](https://img.shields.io/codecov/c/github/rubengomex/rg-async.svg)](https://codecov.io/gh/rubengomex/rg-async)
[![code climate](https://img.shields.io/codeclimate/github/rubengomex/rg-async.svg)](https://codeclimate.com/github/rubengomex/rg-async)
[![dependencies](https://img.shields.io/david/rubengomex/rg-async.svg)](https://david-dm.org/rubengomex/rg-async)
[![downloads](https://img.shields.io/npm/dm/rg-async.svg)](https://npm-stat.com/charts.html?package=rg-async&from=2017-08-11)
[![MIT Licence](https://img.shields.io/npm/l/rg-async.svg)](https://opensource.org/licenses/MIT)
[![docs](https://img.shields.io/badge/docs--blue.svg)](https://rubengomex.github.io/rg-async/)

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
    $ npm run test
```

```bash
    $ npm test
```

```bash
    $ npm t
```


## Usage

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

    printRgAsyncPlusArrayNumbers()
        .then(() => console.log('All promises resolved')) // output => rg-async 1, rg-async 2, rg-async 3, All promises resolved
        .catch(err => console.log(err));
```

## API

#### Filter

* `filter(srcArray, predicate)` method invokes in parallel an async `predicate` function on each item in the given source Array.

* This will return a promise to be resolved containing the new array with the items that predicate function returned a truthy value.

* The async `predicate` function follows the `standard javascript filter arguments`- `(value, index, array)` and needs to return a `promise`.

* Example

```js
    const rgAsync = require('rg-async');

    rgAsync.filter([1,2,3], value => Promise.resolve(value < 3))
        .then(filteredArray => console.log(filteredArray)) // output => [1,2]
        .catch(err => console.log(err));
```


#### Map

* `map(srcArray, mapper)` method invokes in parallel an async `mapper`con function on each item in the given source Array.

* This will return a `promise` to be resolved containing the new array with the mapped/transformed items.

* The `mapper` function follows the `standard javascript map arguments` - `(value, index, array)`and needs to return a `promise`

* Example

```js
    const rgAsync = require('rg-async');

    rgAsync.map([1,2,3], value => Promise.resolve(value * 2))
        .then(mappedArray => console.log(mappedArray)) // output => [2,4,6]
        .catch(err => console.log(err));
```

#### Each

* `each(srcArray, consumer)` method invokes in parallel an async `consumer` function on each item in the given source Array.

* This will return a `promise without any resolved value.

* The `consumer` function follows the `standard javascript map arguments` - `(value, index, array)`and needs to return a `promise`

* Example

```js
    const rgAsync = require('rg-async');

    rgAsync.each([1,2,3], value => Promise.resolve(console.log(value))
        .then(() => console.log('done')) // output => 1,2,3,done
        .catch(err => console.log(err));
```
