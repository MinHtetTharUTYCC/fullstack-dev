class Human {
    name; // name = undefined; //public property
    age; // age = undefined; // public property
    #email; // email = undefined; // private property

    constructor(name, age, email) {
        if (name === undefined || age === undefined || email === undefined) {
            throw new Error('Name, age, and email are required');
        }

        this.name = name;
        this.age = age;
        this.#email = email;
    }

    publicInfo() {
        console.log('Name: ', this.name, 'Age: ', this.age);
    }

    privateInfo() {
        console.log('Name: ', this.name, 'Age: ', this.age, 'Email: ', this.#email);
    }

    sleep() {
        console.log(`${this.name} is sleeping...`);
    }

    walk() {
        console.log(`${this.name} is walking...`);
    }
}

class Student extends Human {
    studentId; // studentId = undefined; // public property
    #gpa; // gpa = undefined; // private property

    constructor(name, age, email, studentId, gpa) {
        super(name, age, email);

        if (studentId === undefined || gpa === undefined) {
            throw new Error('Student ID and GPA are required');
        }
        this.studentId = studentId;
        this.#gpa = gpa;
    }

    publicInfo() {
        super.publicInfo();
        console.log('Student ID: ', this.studentId);
    }

    privateInfo() {
        super.publicInfo();
        console.log('Student ID: ', this.studentId);
        console.log('GPA: ', this.#gpa);
    }

    study() {
        console.log(`${this.name} is studying...`);
    }
}

class Teacher extends Human {
    teacherId; // teacherId = undefined; // public property
    #salary; // salary = undefined; // private property

    constructor(name, age, email, teacherId, salary) {
        super(name, age, email);

        if (teacherId === undefined || salary === undefined) {
            throw new Error('Teacher ID and salary are required');
        }
        this.teacherId = teacherId;
        this.#salary = salary;
    }

    publicInfo() {
        super.publicInfo();
        console.log('Teacher ID: ', this.teacherId);
    }

    privateInfo() {
        super.privateInfo();
        console.log('Teacher ID: ', this.teacherId);
        console.log('Salary: ', this.#salary);
    }

    teach() {
        console.log(`${this.name} is teaching...`);
    }
}

const human = new Human('Alice', 20, 'alice@example.com');
const student = new Student('Bob', 22, 'bob@example.com', 'S001', 3.5);
const teacher = new Teacher('Mr. Smith', 40, 'mr.smith@example.com', 'T001', 50000);

const persons = [human, student, teacher];

for (const person of persons) {
    if (person instanceof Human) {
        person.publicInfo();
        person.sleep();
        person.walk();
    }

    if (person instanceof Student) {
        person.study();
    }

    if (person instanceof Teacher) {
        person.teach();
    }

    console.log('\n');
}
