interface Named { 
    readonly name: string; 
    outputName?: string; // Optional parameter
}

interface Greetable extends Named { greet () : void; }

interface AddFn { (a: number, b: number) : number }

class Person implements Greetable {
    name: string;
    outputName?: string; // Not necessary to implement because optional
    age: number; // Not necessary to implement from interface

    constructor (a: number, n?: string) { 
        if(n) { this.name = n; }
        else { this.name = 'unnamed'; }
        this.age = a; 
    }

    greet () { console.log(`Hello, I am a ${this.age}-year-old named ${this.name}`); }
}

function runInterfaces () {
    // Class that implements multiple interfaces
    let user1: Greetable;
    user1 = new Person(26, 'Josh');
    user1.greet();
    //user1.name = 'Billy'; // Not possible because name is readonly

    // Class omitting optional constructor parameter
    let user2 = new Person(999);
    user2.greet();

    // Function implementation from interface
    let add: AddFn;
    add = (a: number, b: number) => { return a + b; };
    console.log(add(1, 2));
}