function Logger (logString: string) {
    return function<T extends {new(...args: any[]): {name: string}}>(constructor: T) { 
        return class extends constructor {
            constructor(..._: any[]) {
                super();
                console.log(logString); 
                console.log(constructor);  
            }
        }
    }
}

function PropertyLog (target: any, propertyName: string | Symbol) {
    genericLog('Property decorator:', [target, propertyName]);
}

function AccessorLog (target: any, name: string, descriptor: PropertyDescriptor) {
    genericLog('Accessor decorator:', [target, name, descriptor]);
}

function MethodLog (target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    genericLog('Method decorator:', [target, name, descriptor]);
}

function ParameterLog (target: any, name: string | Symbol, position: number) {
    genericLog('Parameter decorator:', [target, name, position]);
}

function genericLog (title: string, logItems: any[]) {
    console.log(title);
    for (const item of logItems) { console.log(item); }
}

function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const adjDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,

        get () { return originalMethod.bind(this); }
    };
    return adjDescriptor;
}

interface ValidatorConfig { [property: string]: { [validProp: string]: string[] } }
const registeredValidators: ValidatorConfig = {};

function Necessary(target: any, propName: string) { registeredValidators[target.constructor.name] = { [propName]: ['necessary'] } }
function Alpha(target: any, propName: string) { registeredValidators[target.constructor.name] = { [propName]: ['alpha'] } }
function validate (obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];
    if (!objValidatorConfig) { return true; }
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'necessary':
                    return !!obj[prop];
                    break;
                case 'alpha':
                    return obj[prop].match(/^[a-z]+$/);
            }
        }
    }
}

@Logger('Still logging...') // Prints second due to bottom-up
@Logger('Logging...')
class Guy {
    @Necessary
    @Alpha
    name = 'Josh';

    constructor () { console.log('Creating Guy') };

    @Autobind 
    sayHello() { console.log('Hello'); }
}

class Product {
    @PropertyLog
    title: string;
    private _price: number;

    @AccessorLog
    set price (val: number) {
        if (val > 0) { this._price = val; }
        else { throw new Error('Invalid price'); }
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @MethodLog
    getPriceWithTax (@ParameterLog tax: number) { return this._price * (1 + tax); }
}

function runDecorators () {
    const guy = new Guy();
    console.log(guy);

    if (!validate(guy)) { console.log('Guy object has an invalid name'); }
    else { console.log('Guy object is valid'); }

    // Autobind example - eventListener would otherwise require binding
    //const button = document.querySelector('button')!;
    //button.addEventListener('click', guy.sayHello);
}