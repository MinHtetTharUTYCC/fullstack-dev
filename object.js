// const user = {
//     name: 'Alice',
//     age: 30,
//     email: 'alice@example.com',
// };
// const user1 = {
//     name: 'Bob',
//     age: 20,
//     email: 'bob@example.com',
// };

// console.log('User: ', user.name, user.age, user.email);
// console.log('User 1: ', user1.name, user1.age, user1.email);

const users = [
    {
        name: 'CSTT',
        studentId: 24,
        email: 'alice@example.com',
        program: 'International Program',
        major: 'DTI',
    },
    {
        name: 'john',
        studentId: 23,
        email: 'alice@example.com',
        program: 'Thai Program',
        major: 'DTI',
    },
    {
        name: 'john',
        studentId: 23,
        email: 'alice@example.com',
        program: 'Thai Program',
        major: 'DTI',
        grade: 'A',
        gpa: 3.5,
        sleep() {
            console.log('Sleeping...');
        },
    },
    {
        name: 'john',
        studentId: 23,
        email: 'alice@example.com',
        program: 'Thai Program',
        major: 'DTI',
        grade: 'A',
        gpa: 3.5,
        sleep() {
            console.log('Sleeping...');
        },
    },
];

for (const user of users) {
    console.log('User: ', user.name, user.age, user.email);
}
