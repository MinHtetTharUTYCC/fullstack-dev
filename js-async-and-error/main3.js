function add(a, b) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }
    return a + b;
}

try {
    console.log(add(2, 3)); // Output: 5
    console.log(add(2, '3')); // This will throw an error
} catch (e) {
    console.error(e.message); // Output: Both arguments must be numbers
}

console.log('Continue application....');
console.log('Continue application....');
console.log('Continue application....');
console.log('Continue application....');
console.log('Continue application....');
console.log('Continue application....');
