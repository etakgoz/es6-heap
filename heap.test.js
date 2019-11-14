const { Heap, MAX_COMPARATOR, MIN_COMPARATOR, MIN_STRING_COMPARATOR, MAX_STRING_COMPARATOR } = require('./heap');

describe('Heap.isHeap', () => {
  test('Empty array is Heap', () => {
    expect(Heap.isHeap([])).toBe(true);
  });

  test('Single element array is Heap', () => {
    expect(Heap.isHeap([5])).toBe(true);
  });

  test('Valid heap is Heap (1)', () => {
    const arr = [1, 2, 3];
    expect(Heap.isHeap(arr)).toBe(true);
  });

  test('Valid heap is Heap (2)', () => {
    const arr = [1, 2, 3, 4, 6];
    expect(Heap.isHeap(arr)).toBe(true);
  });

  test('Valid heap is Heap (3)', () => {
    const arr = [0, 1, 2, 3, 4, 5];
    expect(Heap.isHeap(arr)).toBe(true);
  });

  test('Invalid Heap (1)', () => {
    const arr = [3, 2, 6];
    expect(Heap.isHeap(arr)).toBe(false);
  });

  test('Invalid Heap (2)', () => {
    const arr = [3, 2, 1];
    expect(Heap.isHeap(arr)).toBe(false);
  });

  test('Invalid Heap (3)', () => {
    const arr = [0, 1, 2, 3, 4, 5, -1];
    expect(Heap.isHeap(arr)).toBe(false);
  });
});

describe('Heap Creation', () => {
  test('Min Heap Test 1', () => {
    const arr = [0, 1, 2, 3, 4, 5, -1, -7];
    const heap = new Heap(arr);
    expect(Heap.isHeap(heap.arr) && heap.peek() === -7).toBe(true);
  });

  test('Min Heap Test 2', () => {
    const arr = [9, 8, 7, 6, 5, 4];
    const heap = new Heap(arr);
    expect(Heap.isHeap(heap.arr) && heap.peek() === 4).toBe(true);
  });

  test('Max Heap Test 1', () => {
    const arr = [0, 1, 2, 3, 4, 5, -1, -7];
    const heap = new Heap(arr, MAX_COMPARATOR);
    expect(Heap.isHeap(heap.arr, MAX_COMPARATOR) && heap.peek() === 5).toBe(true);
  });

  test('Max Heap Test 2', () => {
    const arr = [8, 4, 7, 5, 1, 10, 6];
    const heap = new Heap(arr, MAX_COMPARATOR);
    expect(Heap.isHeap(heap.arr, MAX_COMPARATOR) && heap.peek() === 10).toBe(true);
  });

  test('Min Heap String Test 1', () => {
    const arr = ["paris", "amsterdam", "moscow", "istanbul", "st. petersburg", "rome", "london"];
    const heap = new Heap(arr, MIN_STRING_COMPARATOR, value => typeof value === "string");

    expect(Heap.isHeap(heap.arr, MIN_STRING_COMPARATOR) && heap.peek() === "amsterdam").toBe(true);
  });

  test('Max Heap String Test 1', () => {
    const arr = ["paris", "amsterdam", "moscow", "istanbul", "st. petersburg", "rome", "london"];
    const heap = new Heap(arr, MAX_STRING_COMPARATOR, value => typeof value === "string");

    expect(Heap.isHeap(heap.arr, MAX_STRING_COMPARATOR) && heap.peek() === "st. petersburg").toBe(true);
  });


  test('Min Heap with Objects', () => {
    const arr = [
      { age: 35, val: "Tolga" },
      { age: 50, val: "Brad" },
      { age: 23, val: "James" },
      { age: 44, val: "Jennifer" },
      { age: 65, val: "Bill" }
    ];

    const heap = new Heap(arr, (a, b) => a.age - b.age, val => val.age && !isNaN(val.age));

    expect(heap.peek().val).toBe("James");
    heap.extract();
    expect(heap.peek().val).toBe("Tolga");  
  });



});

describe('Heap Extract & Insert', () => {
  test('Min Heap Extract & Insert Test 1', () => {
    const arr = [0, 1, 2, 3, 4, 5, -1, -7];
    const heap = new Heap(arr);
    expect(heap.extract()).toBe(-7);
    expect(heap.peek()).toBe(-1);
    expect(heap.extract()).toBe(-1);
    expect(heap.peek()).toBe(0);
    
    heap.insert(-5);
    expect(heap.peek()).toBe(-5);
  });


  test('Min Heap Extract & Insert Test 2', () => {
    const arr = [8, 7, 6, 3, 10, 2, 11];
    const heap = new Heap(arr);
    expect(heap.extract()).toBe(2);
    expect(heap.extract()).toBe(3);
    expect(heap.extract()).toBe(6);

    expect(heap.peek()).toBe(7);

    heap.insert(-5);
    expect(heap.peek()).toBe(-5);

    heap.insert(0);
    expect(heap.peek()).toBe(-5);

    expect(heap.extract()).toBe(-5);
    expect(heap.peek()).toBe(0);
  });


  test('Min Heap Extract & Insert Test 1', () => {
    const arr = [0, 1, 2, 3, 4, 5, -1, -7];
    const heap = new Heap(arr);
    expect(heap.extract()).toBe(-7);
    expect(heap.peek()).toBe(-1);
    expect(heap.extract()).toBe(-1);
    expect(heap.peek()).toBe(0);
    
    heap.insert(-5);
    expect(heap.peek()).toBe(-5);
  });
});

describe('Duplicate Test', () => {
  test('Min Heap Duplicate Test 1', () => {
    const arr = [0, 1, 2, 2];

    try {
      const heap = new Heap(arr);
    } catch (error) {
      expect(error.message).toBe("Duplicate key: 2");
    }

  });

  test('Min Heap Duplicate Test 2', () => {
    const arr = [0, 1, 2 ];

    try {
      const heap = new Heap(arr);
      heap.insert(2);
    } catch (error) {
      expect(error.message).toBe("Duplicate key: 2");
    }

  });
});

describe('Key Map Test', () => {

  test('Min Heap Creation', () => {
    const arr = [10, 5, 11, 3, 12, 4];
    const heap = new Heap(arr);
    
    for (let [key, index] of heap.keyMap) {
      expect(heap.arr[index]).toBe(key);
    }
  });

  test('Min Heap Insert & Extract', () => {
    const arr = [10, 5, 11, 3, 12, 4];
    const heap = new Heap(arr);

    heap.insert(0);
    heap.insert(7);

    heap.extract();

    heap.insert(30);
    
    for (let [key, index] of heap.keyMap) {
      expect(heap.arr[index]).toBe(key);
    }
  });
});

describe('Heap Update', () => {
  test('Min Heap Update', () => {
    const arr = [10, 5, 11, 3, 12, 4];
    const heap = new Heap(arr);
    
    heap.insert(0);
    heap.insert(7);

    heap.updateKey(7, -1);

    expect(Heap.isHeap(heap.arr, 0, heap.comparator, heap.keyValidator)).toBe(true);

    heap.updateKey(10, 2);
    expect(Heap.isHeap(heap.arr, 0, heap.comparator, heap.keyValidator)).toBe(true);

    heap.updateKey(-1, 20);
    expect(Heap.isHeap(heap.arr, 0, heap.comparator, heap.keyValidator)).toBe(true);
  });
});

