// function greet() {
//     console.log('HI');
// }

// function greet(name, city) {
//     console.log('Hi my name is : ' + name + ' and I am from : ' + city);
// }

// greet('John', 'New York');
// greet('CSTT', 'Los Angeles');

function addTwoNumbers(num1, num2) {
    // void function
    console.log('The sum is : ' + (num1 + num2));
}

function add(num1, num2) {
    // return function
    return num1 + num2;
}

const result = addTwoNumbers(5, 10);
console.log('RESULT: ' + result);

const resultTwo = add(20, 30);
console.log('Result Two: ' + resultTwo);

const name = 'John Doe';
const age = 30;
const isStudent = true;
