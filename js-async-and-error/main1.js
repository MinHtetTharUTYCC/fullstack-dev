// arrow functions
const double = (num) => num * 2;
const triple = (num) => num * 3;

// higher-order function that takes two functions and a value, applies both functions to the value, and returns the sum of the results
const apply = (fn1, fn2, value) => fn1(value) + fn2(value);

const result = apply(double, triple, 5);
console.log(result); // Output: 25
