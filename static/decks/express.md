1. Change to a new directory called `myapp`
2. Initialize a new node project
```sh
npm init -y
```
3. Create an `index.js` containing the following code:
```js
var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000);
```

