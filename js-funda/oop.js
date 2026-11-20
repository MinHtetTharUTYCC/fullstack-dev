class Human {
    name; // name = undefined; //public property
    age; // age = undefined; // public property
    #email; // email = undefined; // private property
    #fbPwd = '12345678'; // fbPwd = undefined; // private property

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
        console.log('Email: ', this.#email, 'FB Password: ', this.#fbPwd);
    }

    changeFbPwd(currentPwd, newPwd) {
        if (currentPwd === this.#fbPwd) {
            this.#fbPwd = newPwd;
        } else {
            throw new Error('Incorrect password');
        }
    }

    fbLogin(pwd) {
        if (pwd === this.#fbPwd) {
            console.log('Login successful');
        } else {
            console.log('Login failed');
        }
    }

    sleep() {
        console.log('Sleeping...');
    }

    walk() {
        console.log('Walking...');
    }

    fblogin(pwd) {
        if (pwd === this.#fbPwd) {
            console.log('Login successful');
        }
    }
}

const human1 = new Human('Alice', 20);
const human2 = new Human('Bob', 25);
const human3 = new Human('Charlie', 30);
const human4 = new Human('David', 35);
const human5 = new Human('Eve', 40);

const humans = [human1, human2, human3, human4, human5];

const human6 = new Human('CSTT', 20);
humans.push(human6);

for (const human of humans) {
    console.log(human.publicInfo());
    console.log(human.fbLogin('1234'));
}
