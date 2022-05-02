/// <reference path="./basics.ts" />
/// <reference path="./classes.ts" />

class App {
    main () {
        runBasics();
        this.printSeparator();
        runClasses();
        this.printSeparator();
    }

    printSeparator () {
        console.log('/n');
        console.log('----------------------------------------------')
        console.log('/n');
    }
}