// TODO: "as" keyword (including as const)
// TODO: discriminated type union: each type has a literal value which discriminates between types

// // console.log('Hello world')

// // annotate / explain the variable
// let age: number = 20
// // age = 'a'

// if (age < 50)
//   age+=10

let sales: number = 123_456_789;
let course: string = 'Typescript';
let is_published/* : boolean */ = true;
// actually also infers type from initialized value
let level;
// assumed type "any"
level = 1;
level = 'a';
// any isn't strictly typed

// can change noImplicityAny in .tsconfig to not need to annotate type any
function render(document: any) {
  console.log(document);
}




let numbers = [1, 2, 3]; // js array can have mixed types
let numbers2: number[] = [1, 2, 3];  // was inferred above
// let numbers2: Array<number> = [1, 2, 3]  // functionally the same, just uses the built-in generic type of Array
let numbersAny = [];
numbers[0] = 1;
// numbers[1] = 'a'

// numbers.forEach(n => n.) // intellisense autocompletes relevant methods for type

// TUPLES
let user: [number, string] = [1, 'Mosh'];

// const small = 1
// const medium = 2
// const large = 3

enum Size { Small = 1, Medium = 's', Large = 3 }  // defaults to 0, 1, 2
let mySize: Size = Size.Medium;
console.log(mySize);

const enum Size2 { Small, Medium, Large }
let mySize2: Size2 = Size2.Large;
// in index.js, const enum will make it more optimized / compact


// ? optional param
// = default value to param
function calculateTax(income: number, taxYear?: number, taxYear2 = 2022): number {
  if (income < 50_000)
    return income * 1.2;
  console.log(taxYear, taxYear2);
  return 0;  // infers to be number if not specified
  // turn on noImplicitReturn
}

function voidFunc(): void {
  console.log('void');
}



// ARRAYS
type Mirrors = Array<{ id: string; }>;  // array of objects



// OBJECTS
let employee = { id: 1 };
// employee.id = 'name' // not allowed

// specify shape
let employee2: {
  readonly id: number,  // can't be modified
  name: string;
  optional?: string;
  retire: (date: Date) => void;
} = { id: 1, name: 'yaboi', retire: (date: Date) => { return date; } };

// repetitive to redefine shape, and what if shapes not always the same?
type Employee3 = {
  readonly id: number,  // can't be modified
  name: string;
  optional?: string;
  retire: (date: Date) => void;
};

const emp1: Employee3 = { id: 1, name: 'name', retire: (date: Date) => { return date; } };


// type unions
function kgToLbs(weight: number | string): number {
  // narrowing
  if (typeof weight === 'number')
    return weight * 2.2;
  else
    return parseInt(weight) * 2.2;
}

// type intersection
// let weight: number & string
type Draggable = {
  drag: () => void,
};

type Resizable = {
  resize: () => void;
};

type UIWidget = Draggable & Resizable;
let textBox: UIWidget = {
  drag: () => { },
  resize: () => { }
};


// can annotate type with literals
let quantity: 50 | 100 = 100;  // would be error if not one of the two values
type Quantity = 50 | 100;
type Metric = 'cm' | 'in';


// nullable values
function greet(name: string) {
  console.log(name.toUpperCase());
}

// greet(null)  // crahses in typescript for null or undefined


// optional chaining
type Customer = {
  birthday: Date;
};

function getCustomer(id: number): Customer | null | undefined {
  return id === 0 ? null : { birthday: new Date() };
}

let customer = getCustomer(0);
if (customer !== null && customer !== undefined)
  console.log(customer.birthday);  // originally error because could be null


// only allow objects as parameter to function
// type Param = Record<string, unknown>;  // option 1
type Param = {
  // "index signature", a typescript thing
  [index: string]: unknown;
};

function f(obj: Param) {
  return obj;
}

f({ name: "Kyle" });
// f(new Date()); // errors! :)
