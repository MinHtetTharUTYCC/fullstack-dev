const { Human, Student, Teacher } = require('./class');

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// initialize an empty array to store humans (store in memory, reset on each run)
const humans = [];

function askQuestion(question) {
    return new Promise((resolve) => {
        rl.question(question, (ans) => {
            resolve(ans);
        });
    });
}

function printMenu() {
    console.log('\nHuman Manager');
    console.log('1. Add human');
    console.log('2. Add student');
    console.log('3. Add teacher');
    console.log('4. List humans');
    console.log('5. Delete human');
    console.log('0. Exit');
}

// need async because we are using await inside this function
async function askCommonDetails() {
    const name = await askQuestion('Enter name: ');
    const age = Number(await askQuestion('Enter age: '), 10);
    const heightCm = Number(await askQuestion('Enter height in cm: '));
    return { name, age, heightCm };
}

// need async because we are using await inside this function
async function addHuman() {
    // Removing try-catch will cause the program to crash if an error occurs
    try {
        const { name, age, heightCm } = await askCommonDetails(); // destructuring data {}

        const newHuman = new Human(name, age, heightCm);
        humans.push(newHuman);

        console.log('Human added successfully!');
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

// need async because we are using await inside this function
async function addStudent() {
    // Removing try-catch will cause the program to crash if an error occurs
    try {
        const { name, age, heightCm } = await askCommonDetails(); // destructuring data {}
        const grade = Number(await askQuestion('Enter grade: '));

        const newStudent = new Student(name, age, heightCm, grade);
        humans.push(newStudent);

        console.log('Student added successfully!');
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

// need async because we are using await inside this function
async function addTeacher() {
    // Removing try-catch will cause the program to crash if an error occurs
    try {
        const { name, age, heightCm } = await askCommonDetails(); // destructuring data {}
        const salary = Number(await askQuestion('Enter salary: '));

        const newTeacher = new Teacher(name, age, heightCm, salary);
        humans.push(newTeacher);

        console.log('Teacher added successfully!');
    } catch (error) {
        console.log(`Error: ${error.message}`);
    }
}

// no async needed because we are not using await inside this function
function listHumans() {
    if (humans.length === 0) {
        console.log('No humans to display.');
        return;
    }

    humans.forEach((human, index) => {
        const grade = human instanceof Student ? `grade: ${human.grade}` : '';
        const salary = human instanceof Teacher ? `salary: ${human.salary}` : '';
        console.log(
            `${index + 1}. Name: ${human.name}, Age: ${human.age}, Height: ${human.heightCm}cm ${grade} ${salary}`,
        );
    });
}

// need async because we are using await inside this function
async function deleteHuman() {
    listHumans();
    if (humans.length === 0) {
        return;
    }

    const number = Number(await askQuestion('Enter the number to delete: '));
    const index = number - 1;

    if (!Number.isInteger(number) || index < 0 || index >= humans.length) {
        console.log('Invalid human number.');
        return;
    }

    const removed = humans.splice(index, 1)[0];
    console.log(`${removed.name} deleted.`);
}

async function main() {
    while (true) {
        printMenu();
        const choice = await askQuestion('Choose an option: ');

        if (choice === '1') {
            await addHuman();
        } else if (choice === '2') {
            await addStudent();
        } else if (choice === '3') {
            await addTeacher();
        } else if (choice === '4') {
            listHumans();
        } else if (choice === '5') {
            await deleteHuman();
        } else if (choice === '0') {
            console.log('Goodbye!');
            break;
        } else {
            console.log('Invalid option.');
        }
    }

    rl.close();
}

main();
