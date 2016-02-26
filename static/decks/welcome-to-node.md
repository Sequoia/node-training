<!-- .slide: data-state="exercise" -->
Create the following file:

```js
//filename: node-intro/http-server.js
var http = require('http');

var server = http.createServer(function(request, response){
  response.write('Welcome to Intro to Node.js!');
  response.end();
});

server.listen(8080, function(){
  console.log('server listening at http://localhost:8080/');
});
```

Run it from the terminal (command line):
```sh
$ node http-server.js
```

Point your browser to <http://localhost:8080/>

^ Help people get unstuck.

go 'til ~5min in

---

# Welcome to Intro to Node.js!

^
- chat about example code
- run it on the board

|||

# Sequoia McDowell

@_sequoia | sequoia.mcdowell@gmail.com

^ 
- Programmer and Educator
- web tech for 10yrs, PHP + java
- almost all JS for n+ years
- Spent summer teaching Strongloop/ibm
- Asked to put on workshop for O'Reilly
- Who are you?

|||

# About this workshop

^ 
- mix of lecture & hands-on
- ask questions, I may table
- help your neighbor! (or raise hand & I'll help)
- Goal: orient to Node.js
- know what's out there, comfortable working or starting project

|||

# About the venue

* "The Commons"
* Bathroom: end of hall
* Kitchen: left out the door, down hall on right

<span>Request from hosts: "please be curteous of this shared space & don't be
too loud in halls"</span><!-- .element: class="fragment" -->

|||

# Agenda: Day 1

* What is Node.js
* Javascript Review
* Core Modules
* Understanding Async
* The Node Ecosystem & NPM

|||

# Agenda: Day 2

* Express.js
* Mongo & Mongoose
* SQL & Sequelize
* Hands-on Exercises!

^
- *talk about excercise slides & transition slides*
- move fairly quickly, all code is available

Time: 9:15

---

# What is Node.js?

## "Javascript on the server" <!-- .element: class="fragment" -->

* Javascript Interpreter (V8) <!-- .element: class="fragment" -->
* Server APIs <!-- .element: class="fragment" -->
* libuv/Event Loop <!-- .element: class="fragment" -->

^
- V8 is same as chrome
- no `window`, `DOM`, `alert`, etc.
- whiteboard this ^ (venn diagram?) TODO: create illustration
- Server APIs = tools for the server (fs, http.server etc.)
- libuv is cross-platform bindings for async I/O <-- explain importance

|||

# Why use Node.js?
* It's fast <!-- .element: class="fragment" -->
* It's (becoming) ubiquitous <!-- .element: class="fragment" -->
* Same language as front-end <!-- .element: class="fragment" -->

^
- eLoop Talk more about speed in a moment
  - good for high volume, small payload API style
- "lingua franca" for webdev, replacing php, java, ruby
- reuse skills, sometimes even reuse code

|||

# Why *Not* use Node.js?
* CPU intensive tasks <!-- .element: class="fragment" -->
* Heavy investment in Java/PHP/etc. <!-- .element: class="fragment" -->
* Ecosystem currently in flux <!-- .element: class="fragment" -->

^
- video processing, etc. (you know who you are)
  - **Use side-by-side**
- Team or apps all Java/PHP/etc.
  - **Will be harder to find devs in future tho!**
- This is changing
  - **With LTS this isn't so bad**
  - also, ES6

|||

# Key differences from Java/Ruby/PHP

* Prototypal Inheritance <!-- .element: class="fragment" -->
* Single Threaded <!-- .element: class="fragment" -->
* Asynchronous I/O <!-- .element: class="fragment" -->
* No "Rails" <!-- .element: class="fragment" -->

^
- You can write in classical style but it's not the "go-to" style
- Event loop
- Event loop again!
- There is no established front-runner framework

---

# What about ~~ES6~~ ES7?

^
- Will discuss in JS Review
- LOTS of new features, more than I can go over
- feel free to ask!

---

# Running Node

* Run file <!-- .element: class="fragment" -->
* Node console <!-- .element: class="fragment" -->
* Executable script <!-- .element: class="fragment" -->
* NPM global install <!-- .element: class="fragment" -->

^
- **Who got the intro exercise working?**
- Who didn't?
- **File** call bin, pass it file arg
- Node console - solicit 2 or 3 observations
- hashbang (time allowing)
- NPM global: we'll talk about this later

---

<!-- .slide: data-state="exercise" -->
## Run a script

1. Create `hello-world.js`
  ```js
  console.log('hello world');
  ```
2. Run it

---

<!-- .slide: data-state="exercise" -->

## Using the console

1. Launch the node console
2. Run the following statements

```js
var numbers = [72, 101, 108, 108, 111, 32, 87, 111, 114, 108, 100];
```

```js
function decode(number){ return String.fromCharCode(number); }
```

```js
numbers.map(decode).join('');
```

---

<!-- .slide: data-state="transition" -->

*Up Next: What is Javascript*

^
*Time: 9:30ish*
