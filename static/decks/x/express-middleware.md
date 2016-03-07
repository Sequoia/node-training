<!-- .slide: data-state="exercise" -->

1. log in RED for `500`s
2. log in YELLOW for `404`
3. ensure status code is an HTTP code

```js
// handle-errors.js
var app = require('express')();
var thrower = require('error-throwing-middleware');
var chalk = require('chalk');
var error = chalk.red.bold;
var info = chalk.blue;

app.use(thrower);
app.get('/', function(req, res){ res.send('hello world!'); })

/* handle errors here */

app.listen(3000, function(err){
  if(err) console.error(error(err.message));
  else console.log(info('Server started on port 3000'));
});
```


