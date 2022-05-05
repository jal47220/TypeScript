class Department {
    name: string;

    constructor (n: string) { this.name = n; }

    describe (this: Department) { console.log(`Department: ${this.name}`); }

    static createUser(id: string) { return new User(id); }
}

abstract class Person { abstract describeAccess () : void; }

class User implements Person { 
    constructor (protected readonly id: string) {} 

    get Id() { return this.id; }
    //set Id(value: string) { this.id = value; } // Would be able to use if id weren't readonly

    describeAccess () { console.log(`User ${this.id} has normal user access.`); }
}

class ITUser extends User { 
    private static instance: ITUser;

    constructor (id: string) { super(id); } 

    static getInstance() {
        if (ITUser.instance) { return this.instance; }
        this.instance = new ITUser('999');
        return this.instance;
    }
    
    // Override; doesn't need to implement, would call User.describeAccess otherwise
    describeAccess () { console.log(`User ${this.id} has admin access.`); }
}

function runClasses () {
    const physics = new Department('physics');
    physics.describe();

    // Object cloning
    // @ts-ignore unused
    var physicsCopy = { describe: physics.describe };
    //physicsCopy.describe(); // Would not work because describe requires a Department obj

    // Shorthand initialization
    const math = { name: 'math', describe: physics.describe};
    math.describe();

    // Class with protected readonly attribute
    const user = new User('1');
    //user.id = '2'; // Not possible because id is protected
    user.describeAccess();

    // Accessing protected value via getter
    //console.log(user.id); // Not possible because id is protected
    console.log(user.Id);

    // Implementing extended class + singleton
    const itUser = ITUser.getInstance();
    itUser.describeAccess();

    // Static method call
    const user2 = Department.createUser('3');
    user2.describeAccess();
}