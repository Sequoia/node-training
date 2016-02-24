# What is Javascript?

**Implementation of ECMAScript standard**

* ECMAScript = Javascript specification <!-- .element: class="fragment" -->
* Implementations vary widely <!-- .element: class="fragment" -->

^
- ES = JS spec
- Many platforms, feature impls vary widely

|||

## What is ~~ES6~~ ES7?

ES6 = ES2015, ES7 = ES2016 etc. <!-- .element: class="fragment" -->

^
- Version number: increments with year
- It's a spec **not an impl!!**
- Babel is it's own topic (I can go over EOD)
- feel free to ask!

|||

# Node.js LTS
## Long Term Support Releases

^

http://sequoia.makes.software/s/node_lts.png

- Predictable releases,
- Even Number releases in April get 3 years support
- Go to stable (5.x right now) for newest/latest
- **Note this when reading docs!**

|||

<!-- .slide: data-state="transition" -->
*Up Next: Javascript Review*

---

# Getting unstuck

^
before we talk about problems, let's talk about how to solve problems

|||

## RTFM

* docs.nodejs.org <!-- .element: class="fragment" -->
* devdocs.io <!-- .element: class="fragment" -->
* stackoverflow.com <!-- .element: class="fragment" -->

^
- Pick version on nodejs.org!
- *Devdocs: show how to pick & save*
- search before you post!
**--> a couple things you'll hear when you ask for help...**

|||

## On `devdocs.io`, enable:

1. JavaScript
2. Node.js (*your version!*)
<br>
<br>

## Node or Javascript?
1. `console`
2. `Promise`
3. `url.parse` method
4. `alert` function

<!-- .slide: data-state="exercise" -->

|||

## GIYF  
*Google Is Your Friend* <!-- .element: class="fragment" -->
## TIAS  <!-- .element: class="fragment" -->
*Try It And See* <!-- .element: class="fragment" -->

^ Now let's see how to TIAS with the console

---

## Console
### Main methods:
* `log`
* `error`

^ 
- Exists in browser & in node
- Some differences

|||

<!-- .slide: data-state="exercise" -->
## Console

Find some differences between node `console` and browser `console`

^ 
- open console in node.js, open in browser
- let people poke around for a minute, **what are some differences?**
- hint: devdocs.io
- Who found something interesting?
- A: `.table`, `.Console`, `.group`

---

## Datatypes

* Objects
* Primitives

^ if it's not a primitive it's an object & vice versa

|||

## Datatypes
### Objects
```js
var me = {
  first : 'Sequoia',
  last  : 'McDowell',
  age   : 31
};

console.log(me.age); // 31
```
<!-- .element: class="fragment" -->

```js
var me = new Person('Sequoia', 31);

console.log(me.age); // 31
```
<!-- .element: class="fragment" -->

```js
var me = ['Sequoia', 'McDowell', 31];

console.log(me[2]); // 31
```
<!-- .element: class="fragment" -->

^
- All are objects
- All have methods, properties

|||

##Datatypes
### Primitives
* Boolean
* Null
* Undefined
* Number
* String
* Symbol (new in ES6) <!-- .element: class="fragment" -->

^ 

|||

## Type system

"Dynamic" "Duck"

`typeof` <!-- .element: class="fragment" -->

`instanceof` <!-- .element: class="fragment" -->

^
- Per wikipedia
- no strong type system
- instanceof for things made with `new`
  - walks up prototype chain
- typeof tells you **built-in** type
- DON'T RELY ON THESE TOO MUCH!
- **All kinds of exceptions**
`String('x') instanceof String`, `[1,2,3] instanceof Object`, `Array`

---

# Functions

* First class citizens<!-- .element: class="fragment" -->
* Have their own "scope"<!-- .element: class="fragment" -->
* Two ways to create them<!-- .element: class="fragment" -->

^
- 1st class : can be treated like values & don't have to be in a class
- things declared in a function stay that a function
- declaration & expression

---

## Creating Functions
* Function Declaration
* Function Expression

|||

## Function Declaration

```js
function add(x, y){
  return y + x;
}
```

```js
add(1,2);  // => 3
function add(x, y){ return y + x; }
add(3,2);  // => 5
```
 <!-- .element: class="fragment" -->

^ HOISTED : you can reference it before it's declared

(will talk more about that when we discuss scope)

|||

<!-- .slide: data-state="exercise" -->
Create divide & multiply functions:
```js
console.log(
  div(
    mul( 21, 40 ),
    mul(10, 2)
  )
);

//output: 42
```

```js
console.log( div( mul(21, 40), mul(10, 2) ) );
```
<!-- .element: class="fragment" -->

* Run with `node filename.js`
<!-- .element: class="fragment" -->

^
5 min

|||

## Function Expressions
What's meant by "expression"?

*"any valid unit of code that resolves to a value." - MDN*<!-- .element: class="fragment" --> 

|||

## Expressions

```js
(1 + 1)                           //expression
("hello world")                   //expression
(function(){ return 21; })        //expression
```
 <!-- .element: class="fragment" -->

```js
(1 + 1)                           //=> 2
("hello world")                   //=> "hello world"
(function(){ return 21; })        //=> function(){ return 21 }
```
 <!-- .element: class="fragment" -->

```js
typeof (1 + 1)                    //=> "number"
typeof ("hello world")            //=> "string"
typeof (function(){ return 21; }) //=> "function"
```
 <!-- .element: class="fragment" -->

```js
var sum = 1 + 1;
var msg = "hello world";
var fun = function(){ return 21; };
```
 <!-- .element: class="fragment" -->

^ "An expression is any valid unit of code that resolves to a value." - MDN
- these "values" can be assigned to variables
- result of function expression **function value**

|||

## Function Expression

```js
var add = function(x, y){
  return y + x;
};
```

```js
add(1,2);  // Uncaught TypeError: add is not a function
var add = function(x, y){ return y + x; };
add(3,2);  // => 5
```
 <!-- .element: class="fragment" -->

^
- note semicolon
- Why is this happening?
  - We'll examine this in the next section

|||

## Function Expression
### anonymous

```js
var add = function (x, y){
  return y + x;
};
```

### named
<!-- .element: data-fragment-index="1" class="fragment" -->

```js
var add = function add(x, y){
  return y + x;
};
```
<!-- .element: data-fragment-index="1" class="fragment" -->

^
- in both, variable was named
- in the second, the function itself was named as well as the variable
- **Why important?**

|||

## Function Expressions
Why use named expressions?
```no-highlight
Uncaught TypeError: Cannot read property 'name' of undefined
  getUser              @ foo.js:2
  (anonymous function) @ bar.js:71
  (anonymous function) @ bar.js:202
  (anonymous function) @ baz.js:11
  ...
```
<!-- .element: class="fragment" -->

```no-highlight
Uncaught Error:
  getUser              @ foo.js:2
  getItem              @ bar.js:71
  buildDBQuery         @ bar.js:202
  createDatabase       @ baz.js:11
  ...
```
 <!-- .element: class="fragment" -->

^
- stack traces are easier to read
- Always use named expressions
- Now some exercises

|||

<!-- .slide: data-state="exercise" -->
Find where I broke the "Always use named expressions" rule and rewrite it as a
named expression

^
- outside of this section

- extra exercise: create function that takes another function & runs it

|||

<!-- .slide: data-state="exercise" -->
1. Create `helloWorld` function that logs "Hello World"
2. Create a function that takes a a function as an argument & executes it

```js
//filename: javascript-review/function_expressions.js

var helloWorld = function(){
  console.log('Hello World!');
};

//... create `run` function

run(helloWorld);
// output: "Hello world"
```

|||

<!-- .slide: data-state="transition" -->
*Up Next: Handling Functions*

---

## Handling functions
Functions can be passed around like other values

^
- "first class citizens"
- Important to be aware of this

|||

### Example: setTimeout

```js
//filename: javascript-review/set_timeout_example.js

//setTimeout( FUNCTION , NUMBER);

var sayHi = function logHello(){
  console.log('hello');
};

var delay = 500; //ms

setTimeout(sayHi, delay);
```

^
- declare variable sayHi
- assign function to that variable
- pass FUNCTION and delay to setTimeout
- what's the "typeof" sayHi?

|||

<!-- .slide: data-state="exercise" -->
Use `setTimeout` to call `greet("Sequoia")` after `1` second.

```js
function greet(name){
  console.log('Hi, ' + name);
}

setTimeout(/*???*/);
```

Hint:
1. `setTimeout` takes 2 variables, what type are they?

^

### Challenge: Create a function that:
1. Accepts a function argument
2. Accepts a string argument
3. Logs the string
4. Runs the function, passing the string as an argument

|||

<!-- .slide: data-state="transition" -->
*Up Next: Scope & Hoisting*

---

# Scope

*"The current context of execution." - MDN*

^
- where things are declared, defines what can be referenced

---

## Types of Scope

* Function
* Module *(just in node!)*
* Global

|||

Variables & functions stay in the scope in which they are **declared**

|||

## Declarations

* Variable Declarations<!-- .element: data-fragment-index="1" class="fragment" -->
   ```js
   var x;
   var y;
   ```
   <!-- .element: data-fragment-index="1" class="fragment" -->
* Function Declarations<!-- .element: data-fragment-index="2" class="fragment" -->
   ```js
   function three(){
     return 3;
   }
   ```
  <!-- .element: data-fragment-index="2" class="fragment" -->

|||

## Which `x`?

```js
var x = 99;       // declared in outer scope

function addTen(y){
  var x = 10;

  return y + x;
}

console.log(addTen(7)); // ??
console.log(x);         // ??
```
 <!-- .element: class="fragment" -->

^
- `x` is 99 because it was **declared** in inner scope

|||

A scope has access to its **parent scopes**

```js
var x = 99;       // declared in outer scope

function addTen(y){
  x = 10;

  return y + x;
}

console.log(addTen(7)); // ??
console.log(x);         // ??
```
 <!-- .element: class="fragment" -->

^
- What happens here?
- Why?
- Declaration vs. Assignment

|||

**Always use `var` to declare vars when creating them!!**

```js
function myDictionary(){
  $ = 'dollars';
  _ = 'no dollars';
  angular = 'the opposite of round';
}
```
<!-- .element: class="fragment" -->

^ 
- ...otherwise you risk accessing a parent scope
- "polluting the global scope"
- Who can see the problem here?
- no IMPLICIT globals in node, still good to use var

|||
<!-- .slide: data-state="exercise" -->
`http_server_congrats.js`:

Alter `http-server.js` to say "CONGRATULATIONS!" to the **5th** visitor

Hints:
1. functions can access variables **outside** their own scope

^
- 10min

---

## Hoisting

**Declarations** are moved to the top of their scope

```js
foo();

function foo(){
  return 10;
}
```
<!-- .element: class="fragment" data-fragment-index="1" -->

Interpreter sees: <!-- .element: class="fragment" data-fragment-index="2" -->
```js
function foo(){
  return 10;
}

foo();
```
<!-- .element: class="fragment" data-fragment-index="2" -->

|||

**Assignments** are not hoisted
```js
console.log(x);

var x = 100;
```
<!-- .element: class="fragment" data-fragment-index="1"-->

Interpreter sees:
<!-- .element: class="fragment" data-fragment-index="2" -->
```js
var x;

console.log(x);

x = 100;
```
<!-- .element: class="fragment" data-fragment-index="2" -->

^
- **Declaration** is hoisted
- **Assignment** is not

|||

### What will this do?

```js
var x = 123;

console.log(x);
console.log(y);
console.log(z);

var y = 456;
z = 789;
```

1. 123 <!-- .element: class="fragment" -->
2. undefined <!-- .element: class="fragment" -->
3. (throws error) <!-- .element: class="fragment" -->

^
- What will this do?
- Ask people to explain why
- **Let's revisit our function declarations & assignments**

|||

### Review

```js
add(1,2);  // => 3
function add(x, y){ return y + x; }
add(3,2);  // => 5
```

```js
add(1,2);  // Uncaught TypeError: add is not a function
var add = function(x, y){ return y + x; };
add(3,2);  // => 5
```

|||

<!-- .slide: data-state="transition" -->
*Up Next: Node.js Core Modules*
