interface Person {
    name: string;
    age: number;

    greet () : void;
}

function runInterfaces () {
    let user1: Person;
    user1 = {
        name: 'Josh',
        age: 26,
        greet () { console.log('Hello'); }
    }
}