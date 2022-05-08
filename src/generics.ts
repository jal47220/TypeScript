interface Titled { title: string; }
interface Aged { age: number; }

class DataStorage<T> {
    private data: T[] = [];

    addItem (item: T) { this.data.push(item); }
    removeItem (item: T) { this.data.splice(this.data.indexOf(item), 1); }
    getItems () { return [...this.data]; }
}

function runGenerics () {
    // Built-in generics
    // @ts-ignore unused
    const names: Array<string> = []; // equivalent to string[]
    // @ts-ignore unused
    const promise: Promise<string> = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve('resolved');
        }, 2000);
    });

    // Custom generic function with type constraints
    function merge<T extends Titled, U extends Aged> (objA: T, objB: U) { 
        return Object.assign(objA, objB); 
    }
    const merged = merge({title: 'Josh'}, {age: 26});
    console.log(merged);

    // keyof constraint
    function extractAndConvert<T extends object, U extends keyof T> (obj: T, key: U) {
        return 'Value: ' + obj[key];
    }
    console.log(extractAndConvert(merged, 'title'));

    // Obj from generic class - works well for primitives, not objs (ref by address)
    const textStorage =  new DataStorage<string>();
    textStorage.addItem('J');
    textStorage.addItem('o');
    textStorage.addItem('s');
    textStorage.addItem('z');
    textStorage.addItem('h');
    textStorage.removeItem('z');
    console.log(textStorage.getItems());

    // Partial type
    // @ts-ignore unused
    const emptyStorage: Partial<DataStorage<string>> = {};
    //const emptyStorage2: DataStorage<string> = {}; // Does not work because of required params

    // Readonly type
    // @ts-ignore unused
    const nameArr: Readonly<string[]> = ['name1', 'name2'];
    //nameArr.push('name3'); // Not allowed on readonly type
    //nameArr.pop(); // Not allowed on readonly type
}