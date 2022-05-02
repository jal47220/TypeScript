import { run as runBasics } from './basics.js';
import { run as runClasses } from './classes.js';

runBasics();
printSeparator();
runClasses();
printSeparator();

function printSeparator () {
    console.log('/n');
    console.log('----------------------------------------------')
    console.log('/n');
}