---

### Anything else...

```js
module.exports = function(dogNoise, catMethods){

  function Cat(){}
  function Dog(){}
  Dog.prototype.bark = function(){ console.log(dogNoise); };

  catMethods.forEach(function(method){
    Cat.prototype[method.name] = method.fn;
  });

  var out = {
    Cat : Cat,
    Dog : Dog,
  };
  
  return out;
};

module.exports.version = '0.1.1';
```
^
could cut this...

|||

```js
// petuser.js
var petmaker = require('./petMaker.js');

var catThings = [
  { name : 'meow', fn : function(){ console.log('Meow~~'); } }
];

var pets = petMaker('BAO!', catThings);

var dog = new pets.Dog();
var cat = new pets.Cat();

dog.bark();
cat.meow();

console.log(petmaker.version);
```

^
could cut this...

---
