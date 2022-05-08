type Admin = {
    name: string;
    privileges: string[];
}

type Employee2 = {
    name: string;
    startDate: Date;
}

type ElevatedEmployee = Admin & Employee2;
type UnknownEmployee = Admin | Employee2;

type Combinable = string | number;
type Numeric = number | boolean;
type Universal = Combinable & Numeric; // Is a number due to intersection between types

class Car { 
    type: string = 'car';
    drive () { console.log('Driving a car...'); } 
}
class Truck { 
    type: string = 'truck';
    drive () { console.log('Driving a truck...'); }
    rev () { console.log('*Unnecessarily loud noise*'); }
}
type Vehicle = Car | Truck;

interface Bird {
    type: 'bird';
    flyingSpeed: number;
}
interface Horse {
    type: 'horse';
    runningSpeed: number;
}
type Animal = Bird | Horse;

interface ErrorContainer { [prop: string]: string; }

function runAdvanced () {
    // Intersection type
    // @ts-ignore unused
    const employee: ElevatedEmployee = {
        name: 'Josh',
        privileges: ['read', 'write'],
        startDate: new Date()
    }

    // Overload + type guard in function using union types
    // @ts-ignore unused
    function addCombinable (a: number, b: number): number
    // @ts-ignore unused
    function addCombinable (a: string, b: string): string
    // @ts-ignore unused
    function addCombinable (a: Combinable, b: Combinable) {
        if (typeof a === 'string' || typeof b === 'string') {
            return a.toString() + b.toString();
        }
        return a + b;
    }

    // Type guard for union type attributes
    function printEmployeeInfo (emp: UnknownEmployee) {
        console.log('Name: ' + emp.name);
        if ('privileges' in emp) { console.log('Privileges: ' + emp.privileges); }
        if ('startDate' in emp) { console.log('startDate: ' + emp.startDate); }
    }
    const unknown1: UnknownEmployee = {
        name : 'unk1',
        privileges: ['read']
    } 
    const unknown2: UnknownEmployee = {
        name : 'unk2',
        startDate: new Date()
    } 
    printEmployeeInfo(employee);
    printEmployeeInfo(unknown1);
    printEmployeeInfo(unknown2);

    // Type guard for instance of class
    const vehicle1 = new Car();
    const vehicle2 = new Truck();   
    function useVehicle(vehicle: Vehicle) {
        vehicle.drive();
        if ( vehicle instanceof Truck) { vehicle.rev(); }
    }
    useVehicle(vehicle1);
    useVehicle(vehicle2);

    // Discriminated union using literal types
    function printSpeed (animal: Animal) {
        let speed;
        switch (animal.type) {
            case 'bird':
                speed = animal.flyingSpeed;
                break;
            case 'horse':
                speed = animal.runningSpeed;
        }
        console.log('Moving at speed: ' + speed);
    }
    printSpeed({type: 'bird', flyingSpeed: 10});

    /*
    /  // Typecasting + assert not null
    /  const inputElement = <HTMLInputElement>document.getElementById('user-input')!; // 
    /  const inputElement = document.getElementById('user-input') as HTMLInputElement;
    /  if (inputElement) {
    /    (inputElement as HTMLInputElement).value = 'something';
    /  }
    */

    // Index properties
    const error: ErrorContainer = {
        email: 'Email is invalid',
        username: 'Must have at least 6 characters'
    };

    // Optional chaining - check if error obj exist before checking for email attribute
    console.log(error?.email)

    // Null chaining
    const input = null;
    console.log(input ?? 'DEFAULT');
}