# Prototypal Inheritance

Lookup chain

^
- Different from "classical"
- Going to gloss over this a bit
- Classical: object has a class, inherits from that class
- Prototypal: object has a special property where it looks up properties if it
  doesn't have them

|||

```js
console.log(foo.bar)
```

1. does `foo` have the property `bar`?
2. does `foo`'s prototype have the property `bar`?
3. does `foo`'s prototype's prototype have the property `bar`?

continue 'til prototype is `null`

^
Seem's straightforward enough, but how is `foo`s prototype set?

we're going to go over the most common use, which emulates classical inheritance

|||

# TODO Replace the bit on prototypes with a bit on how `this` is set

## Constructors and `new`

```js
function Person(first, last){
  this.first = first;
  this.last  = last;
}

Person.prototype.getName = function(){
  return this.first + " " + this.last;
});

var me = new Person("Sequoia", "McDowell");
me.job = "Educator";
```

```js
console.log(me.job);        //me.name
```
<!-- .element: class="fragment" -->

```js
console.log(me.getName());  //me[[PROTOTYPE]].getName
```
<!-- .element: class="fragment" -->

```js
console.log(me.toString()); //me[[PROTOTYPE]][[PROTOTYPE]].toString
```
<!-- .element: class="fragment" -->

^

do some examples with Object.getPrototypeOf


|||

<!-- .slide: data-state="transition" -->
*Up Next: Core Modules*

