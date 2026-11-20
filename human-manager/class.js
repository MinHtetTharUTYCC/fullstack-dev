class Human {
    #age;

    constructor(name, age, heightCm) {
        if (!name?.trim()) {
            throw new Error('Name is required');
        }
        if (!Number.isInteger(age) || age < 0) {
            throw new Error('Age must be a non-negative whole number');
        }
        if (!Number.isFinite(heightCm) || heightCm <= 0) {
            throw new Error('Height must be a positive number');
        }

        this.name = name.trim();
        this.#age = age;
        this.heightCm = heightCm;
    }

    get age() {
        return this.#age;
    }

    info() {
        console.log(this.name, this.#age, this.heightCm);
    }
}

class Student extends Human {
    #grade;

    constructor(name, age, heightCm, grade) {
        super(name, age, heightCm);

        if (!Number.isInteger(grade) || grade < 1) {
            throw new Error('Grade must be a positive whole number');
        }

        this.#grade = grade;
    }

    get grade() {
        return this.#grade;
    }

    study() {
        console.log(`${this.name} is studying...`);
    }
}

class Teacher extends Human {
    #salary;

    constructor(name, age, heightCm, salary) {
        super(name, age, heightCm);

        if (!Number.isFinite(salary) || salary < 0) {
            throw new Error('Salary must be a non-negative number');
        }

        this.#salary = salary;
    }

    get salary() {
        return this.#salary;
    }

    teach() {
        console.log(`${this.name} is teaching...`);
    }
}

module.exports = { Human, Student, Teacher };
