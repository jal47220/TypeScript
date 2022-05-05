/// <reference path="./basics.ts" />
/// <reference path="./classes.ts" />
/// <reference path="./interfaces.ts" />
/// <reference path="./advanced.ts" />

runClasses();
this.printSeparator();
runInterfaces();
this.printSeparator();
runAdvanced();
this.printSeparator();
runBasics(); // Must run last due to intentional error
this.printSeparator();

function printSeparator () {
    console.log('');
    console.log('-------------------------------------------')
    console.log('');
}