const myNums = [1, 2, 3, 4, 5];
const students = ['Alice', 'Bob', 'Charlie', 'David', 'Eve'];

console.log('My Numbers: ' + myNums);
console.log('My Students: ' + students);

for (const num of myNums) {
    console.log('My Number: ' + num * 2);
}

// const newStudents = [];
// for (const s of students) {
//     newStudents.push(s.toUpperCase());
// }

const newStudents = students.map((s) => s.toUpperCase());

myNums.push(6);
students.push('Frank');

myNums.pop();
students.pop();

myNums.unshift(0);
students.unshift('Grace');

myNums.shift();
students.shift();

console.log('My Numbers: ' + myNums);
console.log('My Students: ' + students);
