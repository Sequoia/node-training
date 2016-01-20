<!-- .slide: data-state="exercise" -->
1. Change to a new directory: `my-express-app`

2. Initialize a new project and install express

    ```sh
    npm init -y
    npm install --save express
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
4. Point browser to <http://localhost:3000>

^ after this, talk a bit about yesterday
- node core
- async management
- javascript review
- ecosystem & NPM
- with that groundwork laid, today: build some stuff

---

# Express.js

^
- Top HTTP framework by a mile
- Backed by IBM
- Relied upon by many other frameworks

|||

## What is Express?

<ul>
  <li class="fragment">Router</li>
  <li class="fragment">Middleware</li>
</ul>

^
- two main "features"

|||

## What **isn't** Express?

Ruby on Rails

<ul>
  <li class="fragment" >No ORM</li>
  <li class="fragment" >No template engine\*</li>
  <li class="fragment" >Very little bundled</li>
</ul>

^
- it's not a full featured framework
- *click thru features*
- very little bundles
- **sugar over httpServer**

|||

## Competitors

TODO?

|||

<!-- .slide: data-state="transition" -->
Up Next: Routes
