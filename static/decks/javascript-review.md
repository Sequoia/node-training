# What is Javascript?

**Implementation of ECMAScript standard**

* ECMAScript = Javascript specification <!-- .element: class="fragment" -->
* Implementations vary widely <!-- .element: class="fragment" -->

^
- ES = JS spec
- Many platforms, feature impls vary widely

|||

What is ~~ES6~~ ES7?

* ES6 = ES2015, ES7 = ES2016 etc. <!-- .element: class="fragment" -->
* Support of ES6+ features varies widely <!-- .element: class="fragment" -->
* Solution: Transpile (using Babel) <!-- .element: class="fragment" -->

^
- Version number: increments with year
- It's a spec **not an impl!!**
- Babel is it's own topic (I can go over EOD)
- Lots of new stuff, sticking with basics for this training
- feel free to ask!

|||

Whence Javascript?

*i.e. "how did we get in this mess?"*

^
- written for Netscape, supposed to be "like scheme" but management wanted it to look like java
- No standard, standard came later
- Vendors all implemented their own (often conflicting) versions
- Vendors take time to update, devs don't want to wait

|||

# Node.js LTS
## Long Term Support Releases

TODO: LTS Graphic

^
- Predictable releases,
- Even Number releases in April get 3 years support
- Go to stable (5.x right now) for newest/latest
- Note this when reading docs!

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
- Devdocs: show how to pick & save
- search before you post!
**--> a couple things you'll hear when you ask for help...**

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
- A: `.err`, `.table`, `.assert`

---

## Datatypes

* Objects
* Primitives

^ if it's not a primitive it's an object & vice versa

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
- TODO come up with a couple examples here or put them in respective sections

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

## Function Expressions
What's meant by "expression"?

*"An expression is any valid unit of code that resolves to a value." - MDN* <!--
.element: class="fragment" -->

|||

## Expressions

```js
(1 + 1);                           //expression
("hello world");                   //expression
(function(){ return 21; });        //expression
```
 <!-- .element: class="fragment" -->

```js
(1 + 1);                           //=> 2
("hello world");                   //=> "hello world"
(function(){ return 21; });        //=> function(){ return 21 }
```
 <!-- .element: class="fragment" -->

```js
typeof (1 + 1);                    //=> "number"
typeof ("hello world");            //=> "string"
typeof (function(){ return 21; }); //=> "function"
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
- **anyone notice a difference in the last block of expressions?**

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
### (named)

```js
var add = function add(x, y){
  return y + x;
};
```

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

|||

<!-- .slide: data-state="exercise" -->
1. Create `divide` using a function **declaration**
2. Create `multiply` using function **expression**

^ filename: math.js

|||
<!-- .slide: data-state="transition" -->
*Up Next: Handling Functions*

---

## Handling functions
Functions can be passed around like other values

### Example: setTimeout  <!-- .element: class="fragment" data-fragment-index="1"-->
Arguments: <!-- .element: class="fragment"  data-fragment-index="2" -->
* Function: function to run <!-- .element: class="fragment"  data-fragment-index="2" -->
* Integer: time to delay before running <!-- .element: class="fragment"  data-fragment-index="2" -->

^
- "first class citizens"
- Important to be aware of this

|||

## Handling functions
### Example: setTimeout

```js
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
Use `setTimeout` to call `add(3, 5)` after `1` second.

^
- Hint: setTimeout takes 2 variables, what type are they?
### Challenge Create a function that:
1. Accepts a function argument
2. Accepts a string argument
3. Logs the string
4. Runs the function

|||

<!-- .slide: data-state="transition" -->
*Up Next: Scope & Hoisting*

---

# Scope

*"The current context of execution." - MDN*

^
- where things are declared, defines what can be referenced

---

## Declarations

* Variable Declarations<!-- .element: class="fragment" -->
* Function Declarations<!-- .element: class="fragment" -->

^
- 2 types
**--> what creates scope?**

|||

## Types of Scope

* Function
* Global

|||

Variables stay in the scope in which they are **declared**

```js
var x = 99;       // declared in outer scope

function addTen(y){
  var x = 10;

  return y + x;
}

addTen(7);        // => ??
console.log(x);   // ??
```
 <!-- .element: class="fragment" -->

^
- main thing you need to know

|||

A scope has access to its **parent scopes**

```js
var x = 99;       // declared in outer scope

function addTen(y){
  x = 10;

  return y + x;
}

addTen(7);        // => ??
console.log(x);   // ??
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
`http-server-congrats.js`:

Alter `http-server.js` to say "CONGRATULATIONS!" to the **5th** visitor

*Hint: functions can access variables **outside** their own scope*

^
- 5-10min

---

## Hoisting

**Declarations** are moved to the top of their scope

```js
foo();

function foo(){
  return 10;
}
``` <!-- .element: class="fragment" -->

Interpreter sees: <!-- .element: class="fragment" data-fragment-index="2" -->
```js
function foo(){
  return 10;
}
foo();
``` <!-- .element: class="fragment" data-fragment-index="2" -->

|||

**Assignments** are not hoisted
```js
console.log(x);

var x = 100;
``` <!-- .element: class="fragment" -->

Interpreter sees:<!-- .element: class="fragment" data-fragment-index="2" -->
```js
var x;

console.log(x);

x = 100;
``` <!-- .element: class="fragment" data-fragment-index="2" -->

^
- **Declaration** is hoisted
- **Assignment** is not

|||

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
**Let's revisit our function declarations & assignments**

|||

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
