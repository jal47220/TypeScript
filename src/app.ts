/// <reference path="./basics.ts" />
/// <reference path="./classes.ts" />
/// <reference path="./interfaces.ts" />
/// <reference path="./advanced.ts" />
/// <reference path="./generics.ts" />
/// <reference path="./decorators.ts" />

runDecorators(); // Runs first to clarify outputs from before classes are defined
this.printSeparator();
runClasses();
this.printSeparator();
runInterfaces();
this.printSeparator();
runAdvanced();
this.printSeparator();
runGenerics();
this.printSeparator();
runBasics(); // Must run last due to intentional error
this.printSeparator();

function printSeparator () {
    console.log('');
    console.log('-------------------------------------------')
    console.log('');
}