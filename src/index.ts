// TODO: "as" keyword "type assertion": promises to typescript that a value is a certain type
// TODO: "as const", used on literals, says that properties/indices will not change value
// TODO: readonly, modifies an existing type/interface, the type is a constant type, after clearing a literal of readonly type it deeploy protects re-assignment
// TODO: discriminated type union: each type has a literal value which discriminates between types
// TODO: generics
// TODO: utility types: Partial<>, Required<>, Record<,>, Omit<,>, Pick<,>
// TODO: more utility types: Exclude<,>, ReturnType<>, Parameters<>

// // console.log('Hello world')

// // annotate / explain the variable
// let age: number = 20
// // age = 'a'

// if (age < 50)
//   age+=10

let sales: number = 123_456_789;
let course: string = 'Typescript';
let is_published /* : boolean */ = true;
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
let numbers2: number[] = [1, 2, 3]; // was inferred above
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

// On enums vs string type unions: https://stackoverflow.com/questions/40275832/typescript-has-unions-so-are-enums-redundant
enum Size {
  Small = 1,
  Medium = 's',
  Large = 3,
} // defaults to 0, 1, 2
let mySize: Size = Size.Medium;
console.log(mySize);

const enum Size2 {
  Small,
  Medium,
  Large,
}
let mySize2: Size2 = Size2.Large;
// in index.js, const enum will make it more optimized / compact

// ? optional param
// = default value to param
function calculateTax(
  income: number,
  taxYear?: number,
  taxYear2 = 2022
): number {
  if (income < 50_000) return income * 1.2;
  console.log(taxYear, taxYear2);
  return 0; // infers to be number if not specified
  // turn on noImplicitReturn
}

function voidFunc(): void {
  console.log('void');
}

// ARRAYS
type Mirrors = Array<{ id: string }>; // array of objects

// OBJECTS
let employee = { id: 1 };
// employee.id = 'name' // not allowed

// specify shape
let employee2: {
  readonly id: number; // can't be modified
  name: string;
  optional?: string;
  retire: (date: Date) => void;
} = {
  id: 1,
  name: 'yaboi',
  retire: (date: Date) => {
    return date;
  },
};

// repetitive to redefine shape, and what if shapes not always the same?
type Employee3 = {
  readonly id: number; // can't be modified
  name: string;
  optional?: string;
  retire: (date: Date) => void;
};

const emp1: Employee3 = {
  id: 1,
  name: 'name',
  retire: (date: Date) => {
    return date;
  },
};

// type unions
function kgToLbs(weight: number | string): number {
  // narrowing
  if (typeof weight === 'number') return weight * 2.2;
  else return parseInt(weight) * 2.2;
}
// when working with custom types, ts typeof can only be used in a type context

// type intersection
// let weight: number & string
type Draggable = {
  drag: () => void;
};

type Resizable = {
  resize: () => void;
};

type UIWidget = Draggable & Resizable;
let textBox: UIWidget = {
  drag: () => {},
  resize: () => {},
};

// can annotate type with literals
let quantity: 50 | 100 = 100; // would be error if not one of the two values
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
if (customer !== null && customer !== undefined) console.log(customer.birthday); // originally error because could be null

// only allow objects as parameter to function
// type Param = Record<string, unknown>;  // option 1
type Param = {
  // "index signature", a typescript thing
  [index: string]: unknown;
};

// completely non-assignable, cannot reassign values or the entire variable to a new literal
type Param2 = {
  // "index signature", a typescript thing
  readonly [index: string]: unknown;
};

function f(obj: Param) {
  return obj;
}

type MyObj = {
  1: number;
  2: string;
};
// type MyObj_2 = {
//   [key: boolean]: unknown; // index signature key type must be string, number, symbol, or template literal string
// };

f({ name: 'Kyle' });
// f(new Date()); // errors! :)

// keyof, gets a type union of types of keys in object
const NAV_ITEMS = {
  home: 'Home',
  settings: 'Settings',
} as const;

type NavKey = keyof typeof NAV_ITEMS;

// can "index" into type
type Post = { title: { length: number; text: string } };
type PostProps = {
  title: Post['title'];
};

const SOURCES = [null, 'BBC News', 'CBS Sports', 'ABC News'] as const; // dropdown, as const => read only and now can union the literals instead of union-ing the types
const SOURCES_OBJ = {
  default: null,
  first: 'BBC News',
  second: 'CBS Sports',
  third: 'ABC News',
};

type forArray = (typeof SOURCES)[number]; // demonstrating effect of as const on SOURCES, as well as an "indexed type query"
type forObj = typeof SOURCES_OBJ; // demonstrating effect of as const on SOURCES, as well as an "indexed type query"

type Nullish = {};
