
Whence Javascript?

*i.e. "how did we get in this mess?"*

^
- written for Netscape, supposed to be "like scheme" but management wanted it to look like java
- No standard, standard came later
- Vendors all implemented their own (often conflicting) versions
- Vendors take time to update, devs don't want to wait

---

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

