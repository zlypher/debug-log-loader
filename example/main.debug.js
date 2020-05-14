import { foo } from "./modules/moduleA";
import { bar } from "./modules/moduleB";

var printSomething = function printSomething() {
  return console.log("Hello World");
};

foo();
bar();
printSomething();