// returns the index of the left child in the binary heap
const getLeftChildIndex = i => 2 * i + 1;

// returns the index of the right child in the binary heap
const getRightChildIndex = i => 2 * i + 2;

// returns the index of the parent
const getParentIndex = i => Math.floor((i - 1) / 2);

// swaps array elements
const swap = (arr, i, j) => {
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;

    return j;
};

// min comparator to build min heap for numbers
const MIN_COMPARATOR = (a, b) => a - b;

// max comparator to build min heap for numbers
const MAX_COMPARATOR = (a, b) => b - a;

// min comparator to build heap for strings
const MIN_STRING_COMPARATOR = (a, b) => a.localeCompare(b);

// max comparator to build heap for strings
const MAX_STRING_COMPARATOR = (a, b) => b.localeCompare(a);

// default validator: always return true
const DEFAULT_KEY_VALIDATOR = key => true;
 
class Heap {
    /**
     * Heap Constructor
     * @param {array} arr Array of values to turn into a heap
     * @param {function} comparator Comparator function to compare keys, default function is MIN_COMPARATOR for numbers (a,b) => a - b
     * @param {function} keyValidator Key validator to check keys during building of the heap and while
     */
    constructor (arr = [], comparator = MIN_COMPARATOR, keyValidator = DEFAULT_KEY_VALIDATOR) {
        this.comparator = comparator;
        this.keyValidator = keyValidator;
        this.buildHeap(arr);
    }

    /**
     * Builds heap from an array and initializes internal arr
     * @param {array} arr 
     */
    buildHeap(arr) {
    
        // Check each array value is a valid key
        arr.forEach(value => {
            if (!this.keyValidator(value)) {
                throw new Error(`Invalid key! ${value}`);
            }
        });

        this.arr = arr;

        // build heap by bubbling down first half recursively
        for (let i = Math.floor(this.arr.length / 2); i >= 0; i--) {
            this.bubbleDown(i);
        }

        return this;
    }

    /**
     * Checks whether a given array is a valid heap
     * @param {array} arr Array to check
     * @param {integer} rootIndex Root index of the heap
     * @param {function} comparator Comparator function to check heap, default comparator is MIN_COMPARATOR (a, b) => a - b
     * @param {function} keyValidator Key validator to check keys during building of the heap and while
     * 
     */
    static isHeap(arr = [], rootIndex = 0, comparator = MIN_COMPARATOR, keyValidator = DEFAULT_KEY_VALIDATOR) {
        const length = arr.length;

        // Check each array value is a valid key
        arr.forEach(value => {
            if (!keyValidator(value)) {
                throw new Error(`Invalid key! ${value}`);
            }
        });

        if (rootIndex < length) {
            const leftChildIndex = getLeftChildIndex(rootIndex);
            const rightChildIndex = getRightChildIndex(rootIndex);

            // if root node fulfills heap constraint, check whether the left child and right are valid heaps
            if ((leftChildIndex >= length || comparator(arr[rootIndex], arr[leftChildIndex]) < 0) &&
                (rightChildIndex >= length || comparator(arr[rootIndex], arr[rightChildIndex]) < 0)) {
                    return this.isHeap(arr, leftChildIndex) && this.isHeap(arr, rightChildIndex);
            } else {
                return false;
            }
        }
        return true; // empty heap is a heap too
    }

    /**
     * Heap bubble down operation
     * @param {integer} i index value to bubble down 
     */
    bubbleDown(i) {
        const leftChildIndex = getLeftChildIndex(i);
        const rightChildIndex = getRightChildIndex(i);
        const currentValue = this.arr[i];
        const length = this.arr.length;

        // swap if left child exists and it is greatest value otherwise check the same condition for the right child
        if (leftChildIndex < length && 
            this.comparator(this.arr[leftChildIndex], currentValue) < 0 && 
            (rightChildIndex > length - 1 || this.comparator(this.arr[leftChildIndex], this.arr[rightChildIndex]) < 0)) {
                
            i = swap(this.arr, i, leftChildIndex);
            this.bubbleDown(i);
        } else if (rightChildIndex < length && this.comparator(this.arr[rightChildIndex], currentValue) < 0) {
            i = swap(this.arr, i, rightChildIndex);
            this.bubbleDown(i);
        }
    }

    /**
     * Heap bubble up operation
     * @param {integer} i index value to bubble up
     */
    bubbleUp(i) {
        if (i > 0) {
            const parentIndex = getParentIndex(i);
            const currentValue = this.arr[i];
    
            // compare current index with its parent and swap and keep bubbling up
            if (this.comparator(currentValue, this.arr[parentIndex]) < 0) {
                i = swap(this.arr, i, parentIndex);
                this.bubbleUp(i);
            }
        }
    }

    /**
     * Returns the top element
     */
    peek() {
        return this.arr[0];
    }

    /**
     * Extracts top element from the heap
     */
    extract() {
        // swap first element with the bottom of the heap
        swap(this.arr, 0, this.arr.length - 1);

        // pop last (previous first) element
        const extracted = this.arr.pop();

        // bubble down root
        this.bubbleDown(0);

        return extracted;
    }

    /**
     * Inserts new value to heap
     * @param {mixed} value A proper heap value
     */
    insert(value) {
        // check if key is valid
        if (!this.keyValidator(value)) {
            throw new Error("Invalid key!");
        }

        // push the value to the bottom of the heap
        this.arr.push(value);

        // bubble up the value
        this.bubbleUp(this.arr.length - 1);

        return this;
    }

    size() {
        return this.arr.length;
    }

}

module.exports.Heap = Heap;
module.exports.MIN_COMPARATOR = MIN_COMPARATOR;
module.exports.MIN_STRING_COMPARATOR = MIN_STRING_COMPARATOR;
module.exports.MAX_STRING_COMPARATOR = MAX_STRING_COMPARATOR;
module.exports.MAX_COMPARATOR = MAX_COMPARATOR;