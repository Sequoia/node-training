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

1. Create a directory `myProject`
2. `cd myProject`
3. `npm init`

^
- *Step thru alone then together*
- **Anything confusing?**
- Version should not say "1.0.0"
- `node .`

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

## `package.main`

1. Create `index.js`
2. Put `console.log('hello world')` in it
3. `node .`

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

`npm install chalk`

^ What do you see?
- node_modules
- *Explain flat dep tree*
- what do you think this allows us to do?

|||

<!-- .slide: data-state="exercise" -->

Use our dependency:

```js
//index.js

console.log(chalk.green.underline('Hello World!'));
console.log(chalk.red.bold('Hello Again!'));
```

Hints:
1. Something is missing...

^ try running file
- &rarr; missing require statement
- *talk thru require & stuff*

|||

## Install "this" package

1. `rm -rf node_modules`
2. `npm install`
3. `node .`

^
- should install our dependencies
- what happened? What's missing?

|||

<!-- .slide: data-state="exercise" -->

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

|||



---
OTHER STUFF
---

package.json
what it is
how it’s used
deps
devdeps
main
bin
scripts
registry
installing packages
local
exercise: chalk
--save
rm
global
exercise: node-watch
