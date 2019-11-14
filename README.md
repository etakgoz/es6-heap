# ES6 Heap

A binary heap implementation using ES6 JavaScript.

# usage

## installation

To install simply run the command below:

```
npm install
```

## examples

You can use this heap implementation to create binary heaps for different values using a custom comparator function. Default min and max comparators for numbers and strings are part of the package (MIN_COMPARATOR, MAX_COMPARATOR, MIN_STRING_COMPARATOR, MAX_STRING_COMPARATOR).

Min-Heap Creation

```
const { Heap, MAX_COMPARATOR, MIN_COMPARATOR, MIN_STRING_COMPARATOR, MAX_STRING_COMPARATOR } = require('./heap');

const arr = [9, 8, 7, 6, 5, 4];
const heap = new Heap(arr, MIN_COMPARATOR);

heap.peek();            // 4

heap.insert(0);
heap.peek();            // 0

heap.extract();         // 0
heap.extract();         // 4

heap.size();            // 5 elements remain in array

```


Max-Heap Creation

```
const { Heap, MAX_COMPARATOR, MIN_COMPARATOR, MIN_STRING_COMPARATOR, MAX_STRING_COMPARATOR } = require('./heap');

const arr = [8, 4, 7, 5, 1, 10, 6];
const heap = new Heap(arr, MAX_COMPARATOR);

heap.peek();            // 10

heap.insert(0);
heap.peek();            // 10
heap.size();            // 8

heap.extract();         // 100
heap.extract();         // 7

heap.size();            // 6 elements remain in array
```

Key Validation

```
const { Heap, MAX_COMPARATOR, MIN_COMPARATOR, MIN_STRING_COMPARATOR, MAX_STRING_COMPARATOR } = require('./heap');

const arr = [8, 4, 7, 5, 1, 10, 6];
const heap = new Heap(arr, MAX_COMPARATOR, a => !isNaN(a));  // input must be a number

heap.insert("invalid");     // throws error
```

Using Object Values to Build a Min Heap

```
const arr = [
    { age: 35, val: "Tolga" },
    { age: 50, val: "Brad" },
    { age: 23, val: "James" },
    { age: 44, val: "Jennifer" },
    { age: 65, val: "Bill" }
];

const heap = new Heap(arr, (a, b) => a.age - b.age, val => val.age && !isNaN(val.age));

heap.peek();                // { age: 23, val: "James" }
heap.extract();

heap.peek();                // { age: 35, val: "Tolga" }
```

## tests


```
const { Heap, MAX_COMPARATOR, MIN_COMPARATOR, MIN_STRING_COMPARATOR, MAX_STRING_COMPARATOR } = require('./heap');

const arr = [8, 4, 7, 5, 1, 10, 6];
const heap = new Heap(arr, MAX_COMPARATOR, a => !isNaN(a));  // input must be a number

heap.insert("invalid");     // throws error
```
