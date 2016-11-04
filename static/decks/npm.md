# NPM
<http://npmjs.com/>

^
- who has used?
- package manager for node & more

|||

## What is NPM?

* Package manager<!-- .element: class="fragment" -->
* Dependency manager<!-- .element: class="fragment" -->
* Registry<!-- .element: class="fragment" -->
* Company<!-- .element: class="fragment" -->
* and more...<!-- .element: class="fragment" -->

^
- use to install
- use to configure deps for your project
- website with listings
- also for scripting,

---

# `package.json`

Contains info on package...
* dependencies<!-- .element: class="fragment" -->
* metadata<!-- .element: class="fragment" -->
* utility scripts<!-- .element: class="fragment" -->

^
- your project is a "package"
- packages your package/project relies on
- your name, email, git-repo, desc, license
- place to build in scripts to run/test/build your package
  - nice to check these right into repo

|||

<!-- .slide: data-state="exercise" -->

## `npm init`

1. Create a directory `myproject`
2. `cd myproject`
3. `npm init`

^
- *Step thru alone then together*
- **Anything confusing?**
- Version should not say "1.0.0"

|||

```json
{
  "name": "myproject",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "Sequoia McDowell <sequoia.mcdowell@gmail.com> (http://sequoia.makes.software/)",
  "license": "ISC"
}
```

```config
init.author.name=Sequoia McDowell
init.author.email=sequoia.mcdowell@gmail.com
init.author.url=http://sequoia.makes.software/
```
<!-- .element: class="fragment" -->

^
Why do I have author stuff?

**let's fix that up for you**

|||

<!-- .slide: data-state="exercise" -->

## `npm config`

1. `npm config set init.author.name [your name]`
2. `npm config set init.author.email [your email]`
3. `cat ~/.npmrc`

^
also npm config get init.author.name

**now `node .`**

fix this ^

|||

<!-- .slide: data-state="exercise" -->

In `myproject/`:

### Part 1

1. Create `index.js`
2. Put `console.log('hello world')` in it
3. "`node .`" to run `index.js`
<br>
<br>

### Part 2

1. Rename `index.js` `app.js`
2. Update package.json (? which property ?)
3. "`node .`" to run `app.js`

^
- How would we change the file it ran when we run that directory?
- What happens if we run it from different CWD?

---

## Dependencies

`npm install`

^
- stuff your project needs

|||

### `npm install`

<ul>
  <li class="fragment">`npm install foo`: installs package</li>
  <li class="fragment">`npm install --save foo`: ... & saves dependency</li>
  <li class="fragment">`npm remove [--save] foo`: remove package</li>
  <li class="fragment">`npm install`: installs **this** package</li>
</ul>

^
we want chalk in our project, we're gonna install that

- talk more about last case in a moment

|||

<!-- .slide: data-state="exercise" -->

In `myproject/`:

`npm install chalk`

^ What do you see?
- node_modules
- *Explain flat dep tree*
- what do you think this allows us to do?

|||

<!-- .slide: data-state="exercise" -->

Use our dependency:

```js
//npm/start/myproject/app.js

console.log(chalk.green.underline('Hello World!'));
console.log(chalk.red.bold('Hello Again!'));
```

**Run the file**

Hints:
1. Something is missing...

^ try running file
- &rarr; missing require statement
- *talk thru require & stuff*

|||

<!-- .slide: data-state="exercise" -->

## Install "this" package

In `myproject/`:

1. `rm -rf node_modules`
2. `npm install`
3. `node .`

^
- should install our dependencies
- what happened? What's missing?

|||

<!-- .slide: data-state="exercise" -->

In `myproject/`:

`npm install --save chalk`

^

- **What do you see in package.json now?**
- now repeat: delete `node_modules`, npm install
- what's different?
- **Why not just check in `node_modules`?**

---

## `package.dependencies`

List of packages (*and versions*) required by our package

```json
...
"dependencies": {
  "chalk": "^1.1.1"
}
...
```

^
- for your package
- **packages you install also have dependencies**

|||

`node_modules/chalk/package.json`

```json
...
"dependencies": {
  "ansi-styles": "^2.1.0",
  "escape-string-regexp": "^1.0.2",
  "has-ansi": "^2.0.0",
  "strip-ansi": "^3.0.0",
  "supports-color": "^2.0.0"
},
...
```

^ 
- when you install `chalk`, you also install all of `chalks` deps
- ditto "chalks deps", "chalks deps deps" ad infinitum

|||

`node_modules/chalk/package.json`

```json
...
"devDependencies": {
  "coveralls": "^2.11.2",
  "matcha": "^0.6.0",
  "mocha": "*",
  "nyc": "^3.0.0",
  "require-uncached": "^1.0.2",
  "resolve-from": "^1.0.0",
  "semver": "^4.3.3",
  "xo": "*"
}
...
```

^
- **only** installed for the parent package
- **What do you think these are for?**
- grunt, gulp, mocha, test tools, etc.
- what about versions?

|||

## Semver

*"Semantic Versioning"*

^
- give meaning to version numbers
- explain crazy past

<https://docs.npmjs.com/getting-started/semantic-versioning>

|||

### Semver Parts

`3.10.23`

<ul>
  <li class="fragment">`3`: Major Version</li>
  <li class="fragment">`10`: Minor Version</li>
  <li class="fragment">`23`: Patch Version</li>
</ul>

^
- Major: increment this when breaking BC
- Minor: adding features, don't break BC
- Patch: Bug fixes & minor changes

|||

### Semver Ranges

<ul>
  <li class="fragment">`>=2.3`</li>
  <li class="fragment">`2.*`</li>
  <li class="fragment"> `1.2.7`</li>
  <li class="fragment">`~3.1` (`3.1.*`)</li>
  <li class="fragment">`^3.1.9` (`3.*` + `>=3.1`)</li>
</ul>

^
- tilde: fix all available digits
- carat: fix only first digit
- carat is good for "all but breaking changes"

|||

<http://semver.npmjs.com/>

^
- go to website & play around

|||

## Finding packages

<ul>
  <li class="fragment"><https://www.npmjs.com/></li>
  <li class="fragment">`npm search`</li>
  <li class="fragment">google</li>
</ul>

^
- go look around
- NPM search is slow
- if you don't know exact name sometimes google is better

|||

<!-- .slide: data-state="transition" -->
*Up Next: Global Installs*

^
One more part of package.json but we'll do that after (**scripts**)

---

## Global Install

`npm install -g foo`

^ 

- for utilities
- anything you'd call from the command line

|||

## Global Install

Installs to privileged location (`/usr/local/bin`)

* Change permissions, or<!-- .element: class="fragment" -->
* Tell NPM to install elsewhere<!-- .element: class="fragment" -->
* Use "sudo"<!-- .element: class="fragment" -->

^ don't use sudo!

|||

<!-- .slide: data-state="exercise" -->
Make NPM install globals in our home directory

`npm set prefix /your/home/npm_packages`

**Don't do this if you used `nvm` to install node!!**

^
now you can install without sudo 

|||

<!-- .slide: data-state="exercise" -->
1. `npm install -g nodemon`
2. `nodemon /path/to/myproject`
3. make a change to the `myproject/app.js` & **save** the file

^
- grunt, gulp, jshint etc. are more useful

|||

### `package.bin`

Like `package.main` but for command-line usage:

```json
  "main": "index.js",
  "bin" : "bin/index.js"
```

```json
  "bin" : {
    "ccc" : "dist/cli/do_this.js",
    "jsfoo":"dist/cli/foo.js"
  }
```
<!-- .element: class="fragment" -->

^
- you can also install cli packages local to your app
- **demo**: `npm install cowsay`, `"sayhi" : "cowsay Hello"`, `npm run boo`

|||

<!-- .slide: data-state="transition" -->
*Up Next: npm scripts*

---

## NPM Scripts

<https://docs.npmjs.com/misc/scripts>

<ul>
  <li class="fragment">Live in `package.json`</li>
  <li class="fragment">Run with `npm run scriptname`</li>
  <li class="fragment">A few "special" ones run automatically</li>
</ul>

^
- **Why would this be useful?**

|||

```json
...
"scripts": {
  "bbl-build": "babel src --out-dir dist",
  "build": "npm run bbl-build",
  "postinstall": "npm run build",
  "start": "node . --httpauth ../presentations.htpasswd",
  "debug": "PORT=3030 DEBUG=app:*,express:* npm run start",
  "pretest": "echo \"about to start tests...\"",
  "test": "echo \"Error: no test specified\" && exit 1"
},
...
```

^ 
- talk thru these
- bower install
- demo a bit
- alternative to grunt/gulp for builds

|||

<!-- .slide: data-state="exercise" -->
In `myproject/`:

1. Install (and save!) `cowsay` local to project
2. Add script to `package.json` that runs `cowsay Hello`
3. Run script: `npm run hello`

Hints:
1. `npm run hello` runs a script named `hello`

^
- demo watch for them
- *extra fileserver exercise in x/npm*
- add debugger to a server ?
- add watch script ?

---

# Tomorrow

* Express
* Datastores & ORMs

<https://mongolab.com/>

^
- go over express
- datastores, mongo & mysql
- set up an account on mongolab for free mongodb hosting

|||

# Good Job! :)
