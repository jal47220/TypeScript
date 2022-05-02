/// <reference path="./basics.ts" />
/// <reference path="./classes.ts" />

runClasses();
this.printSeparator();
runBasics(); // Must run last due to intentional error
this.printSeparator();

function printSeparator () {
    console.log('');
    console.log('-------------------------------------------')
    console.log('');
}