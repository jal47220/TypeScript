class Department {
    name: string;

    constructor (n: string) {
        this.name = n;
    }

    describe (this: Department) {
        console.log('Department: ' + this.name);
    }
}

class User {
    private id: string;

    constructor (id: string) {
        this.id = id;
    }
}

export function run () {
    const physics = new Department('physics');
    physics.describe();

    const physicsCopy = { describe: physics.describe };
    //physicsCopy.describe(); // Would not work because describe requires a Department obj

    const math = { name: 'math', describe: physics.describe};
    math.describe();

    const user = new User('1');
    //user.id = '2'; // Not possible because id is private
}