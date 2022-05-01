export function run() {
    // Inferred types:
    function add (n1: number, n2: number) {
        return n1 + n2;
    }
    console.log(add(5, 2.8));
    let str: string;
    str = '5';
    /* 
    /  // Will error at compilation if uncommented:
    /  str = 5;
    /  console.log(add(str, 2.8));
    */ 
    returnInput(str);

    // Explicit types for an object:
    const person: {
        name: string;
        age: number;
    } = {
        name: 'Josh',
        age: 26
    }
    returnInput(person);

    // 'any' type:
    /* 
    /  // Will error at compilation if uncommented:
    /  let strArray: string[];
    /  strArray = ['one', 2];
    */
    let anyArray: any[];
    anyArray = ['one', 2];

    // Inferred types in an array:
    const arrObj = { words: ['alpha', 'beta', 'charlie'] }
    for (const word of arrObj.words) {
        console.log(word.toUpperCase());
        //console.log(word.toFixed(2)); // Error due to number method call on inferred string
    }

    // Explicit array type (similar to tuples):
    const arr = { strOrNumArr: [1, 'two'] }
    arr.strOrNumArr.push(3);
    arr.strOrNumArr[3] = 'four';
    for (const strOrNum of arr.strOrNumArr) { console.log(strOrNum); }

    // Tuple:
    const tupleObj: { strOrNumArr: [number, string]; } = { strOrNumArr: [1, 'two'] }
    tupleObj.strOrNumArr.push(3); // Technically breaks tuple, but is allowed
    //tupleObj.strOrNumArr[3] = 'four'; // Errors because strOrNumArr[3] is inferred as undefined
    for (const strOrNum of tupleObj.strOrNumArr) { console.log(strOrNum); }

    // Enum:
    enum Role { ADMIN, READ_ONLY };
    const personWithRole = { role: Role.ADMIN }
    console.log(personWithRole.role == Role.ADMIN);

    // Union:
    function union (n1: number | string, n2: number | string) {
        if (typeof n1 === 'number' && typeof n2 === 'number') { return n1 + n2; }
        else { return n1.toString() + n2.toString(); }
    }
    console.log(union(5, 2.8));
    console.log(union('5', 2.8));
    console.log(union('5', '2.8'));

    // Literal types + alias:
    type Combinable = number | string;
    function litCombine (n1: Combinable, n2: Combinable, conversionType: 'as-number' | 'as-string') {
        if (conversionType == 'as-number') { return +n1 + +n2; }
        else { return n1.toString() + n2.toString(); }
    }
    console.log(litCombine(5, 2.8, 'as-number'));
    console.log(litCombine(5, 2.8, 'as-string'));
    //console.log(litCombine(5, 2.8, 'as-boolean')); // Errors due to not matching literals 

    // Void/undefined return type
    function printResult (num: number): void {
        console.log('Result: ' + num);
    } 
    function printResult2 (num: number): undefined {
        console.log('Result: ' + num);
        return;
    } 
    printResult(add(5, 12));

    // Function as type
    let typeFunc: (num: number) => undefined;
    typeFunc = printResult2;
    //typeFunc = printResult; // Errors due to return type mismatch
    //typeFunc = 5; // Errors due to type mismatch
    returnInput(typeFunc);

    // Callback function
    function addNumAndHandle (n1: number, n2: number, cb: (num: number) => void) {
        cb(n1 + n2);
    }
    addNumAndHandle(10, 20, (result) => {
        console.log(result);
    })
    function addStrAndHandle (n1: number, n2: number, cb: (str: string) => void) {
        cb(n1.toString() + n2.toString());
    }
    addStrAndHandle(10, 20, (result) => {
        console.log(result);
        return result; // Ignored due to void return type on callback
    })

    // Unknown type
    let input: unknown;
    let str2: string;
    input = 'text';
    //str2 = input; // Errors because unknown can't be implicitly cast to string
    if (typeof input === 'string'){ str2 = input; }
    else { str2 = "unused"; returnInput(str2); }

    // Arrow function + default arg
    const subOne = (a: number, b: number = 1) => a - b;
    const printOut = (output : string | number | Array<any>) => console.log(output);
    printOut(subOne(2));

    // Spread operator
    const list1 = [1, 2];
    printOut(list1);
    const list2 = [...list1, 3];
    printOut(list2);
    list1.push(...list2);
    printOut(list1);

    // Never type (because function does not even resolve)
    function generateError (message: string, code: number): never {
        throw { message: message, errorCode: code }
    }
    generateError('An error occurred', 500);

    // Only used to avoid ide detection of intentionally unused vars
    function returnInput (input: any){ return input };
}