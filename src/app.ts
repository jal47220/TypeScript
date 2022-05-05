/// <reference path="./basics.ts" />
/// <reference path="./classes.ts" />
/// <reference path="./interfaces.ts" />

runClasses();
this.printSeparator();
runInterfaces();
this.printSeparator();
runBasics(); // Must run last due to intentional error
this.printSeparator();

function printSeparator () {
    console.log('');
    console.log('-------------------------------------------')
    console.log('');
}