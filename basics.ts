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

// Explicit types for an object:
const person: {
    name: string;
    age: number;
} = {
    name: 'Josh',
    age: 26
}

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
    // console.log(word.toFixed(2)); // Error due to number method call on inferred string
}

// Explicit array type (similar to tuples):
const arr = { strOrNumArr: [1, 'two'] }
arr.strOrNumArr.push(3);
arr.strOrNumArr[3] = 'four';
for (const strOrNum of arr.strOrNumArr) { console.log(strOrNum); }

// Tuple:
const tupleObj: { strOrNumArr: [number, string]; } = { strOrNumArr: [1, 'two'] }
tupleObj.strOrNumArr.push(3); // Technically breaks tuple, but is allowed
// tupleObj.strOrNumArr[3] = 'four'; // Errors because strOrNumArr[3] is inferred as undefined
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
// console.log(litCombine(5, 2.8, 'as-boolean')); // Errors due to not matching literals 