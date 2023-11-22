"use strict";
// // console.log('Hello world')
// // annotate / explain the variable
// let age: number = 20
// // age = 'a'
// if (age < 50)
//   age+=10
let sales = 123456789;
let course = 'Typescript';
let is_published /* : boolean */ = true;
// actually also infers type from initialized value
let level;
// assumed type "any"
level = 1;
level = 'a';
// any isn't strictly typed
// can change noImplicityAny in .tsconfig to not need to annotate type any
function render(document) {
    console.log(document);
}
let numbers = [1, 2, 3]; // js array can have mixed types
let numbers2 = [1, 2, 3]; // was inferred above
let numbersAny = [];
numbers[0] = 1;
// numbers[1] = 'a'
// numbers.forEach(n => n.) // intellisense autocompletes relevant methods for type
// TUPLES
let user = [1, 'Mosh'];
// const small = 1
// const medium = 2
// const large = 3
var Size;
(function (Size) {
    Size[Size["Small"] = 1] = "Small";
    Size["Medium"] = "s";
    Size[Size["Large"] = 3] = "Large";
})(Size || (Size = {})); // defaults to 0, 1, 2
let mySize = Size.Medium;
console.log(mySize);
let mySize2 = 2 /* Size2.Large */;
// in index.js, const enum will make it more optimized / compact
// ? optional param
// = default value to param
function calculateTax(income, taxYear, taxYear2 = 2022) {
    if (income < 50000)
        return income * 1.2;
    console.log(taxYear, taxYear2);
    return 0; // infers to be number if not specified
    // turn on noImplicitReturn
}
function voidFunc() {
    console.log('void');
}
// OBJECTS
let employee = { id: 1 };
// employee.id = 'name' // not allowed
// specify shape
let employee2 = { id: 1, name: 'yaboi', retire: (date) => { return date; } };
const emp1 = { id: 1, name: 'name', retire: (date) => { return date; } };
// type unions
function kgToLbs(weight) {
    // narrowing
    if (typeof weight === 'number')
        return weight * 2.2;
    else
        return parseInt(weight) * 2.2;
}
//# sourceMappingURL=index.js.map