class Department {
    name: string;

    constructor (n: string) { this.name = n; }

    describe (this: Department) {
        console.log(`Department: ${this.name}`);
    }
}

class User { 
    constructor (protected readonly id: string) {} 

    describeAccess () {
        console.log(`User ${this.id} has normal user access.`);
    }
}

class ITUser extends User { 
    constructor () { super('999'); } 

    // Override
    describeAccess () {
        console.log(`User ${this.id} has admin access.`);
    }
}

function runClasses () {
    const physics = new Department('physics');
    physics.describe();

    // @ts-ignore unused
    var physicsCopy = { describe: physics.describe };
    //physicsCopy.describe(); // Would not work because describe requires a Department obj

    const math = { name: 'math', describe: physics.describe};
    math.describe();

    const user = new User('1');
    //user.id = '2'; // Not possible because id is protected and read-only
    user.describeAccess();

    const itUser = new ITUser();
    itUser.describeAccess();
}