function divide(a, b) {
    if (b === 0) throw new Error('cannot divide by zero');
    return a / b;
}

console.log('start');
try {
    console.log(divide(10, 2)); // 5, fine
    console.log(divide(10, 0)); // throws inside try
} catch (e) {
    console.error('caught:', e.message); // "caught: cannot divide by zero"
} finally {
    console.log('finally: always runs, even on errors');
}

console.log('program keeps running'); // it does
