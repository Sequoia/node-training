<!-- .slide: class="exercise" -->
Create the following file:

```js
//filename: http-server.js
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

|||

# About this workshop

^ 
- mix of lecture and hands-on
- feel free to ask questions, I may table
- help your neighbor! (or raise hand & I'll help)
- Goal is to leave you oriented with Node.js
- Know what's out there, comfortable working node.js project or starting own
- move fairly quickly, all code is available, easy to jump to where we are &
  examine later

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

^ **--> Who am I?**

---

# What is Node.js?

## "Javascript on the server" <!-- .element: class="fragment" -->

* Javascript Interpreter (V8) <!-- .element: class="fragment" -->
* Server APIs <!-- .element: class="fragment" -->
* libuv/Event Loop <!-- .element: class="fragment" -->

^
- V8 is same as chrome: just the core langauge bits
- doesn't have `window`, `DOM`, `alert`, etc.
- whiteboard this ^ (venn diagram?)
- Server APIs = tools for the server (fs, http.server etc.)
- libuv is cross-platform bindings for async I/O <-- explain importance
TODO: have link to libuv article ready

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
- This is changing, but must pick libs carefully
  - **With LTS this isn't so bad**
  - also, ES6

|||

# Key differences from Java/Ruby/PHP

* Prototypal Inheritance <!-- .element: class="fragment" -->
* Single Threaded <!-- .element: class="fragment" -->
* Asynchronous I/O <!-- .element: class="fragment" -->
* No "Rails"

^
- You can write in classical style but it's not the "go-to" style
- Event loop
- Event loop again!
- There is no established front-runner framework

---

# The Event Loop

TODO: Illustration of event loop?
Whiteboard? TODO

^
- Thread per connection: waiter, takes order, goes & prepares food
  - more waiters = more threads
- Single thread: one **fast** waiter
  - loops, taking/placing orders, taking/delivering food
  - Chefs are POSIX threads
  - Waiter is async
- What happens if this waiter stops to make someone's food?

|||

# ABC
* **A**lways
* **B**e
* asyn**C**

^ We'll look into the practical aspect of this later

---

# What about ~~ES6~~ ES7?

^
- Will discuss in JS Review
- LOTS of new features, more than I can go over
- feel free to ask!

---

<!-- .slide: class="transition" -->

*Up Next: Running Node*

---

<!-- .slide: class="exercise" -->

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

<!-- .slide: class="transition" -->

*Up Next: What is Javascript*
