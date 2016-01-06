import minimist from 'minimist';
import {resolve} from 'path';
import express from 'express';
import auth from 'http-auth';
import {not, has} from 'ramda';

//TODO extract these into "shortcuts" module
const l = console.log.bind(console);
const err = console.error.bind(console);

const argv = minimist(process.argv.slice(2), {alias:{'a':'httpauth'}});
const app = express();

// http auth setup
// create httppasswd file & pass path to it relative to cwd (or absolute)
if(not(has('httpauth')(argv))) throw "ERROR: --httpauth, -a required";
const basic = auth.basic({
  realm: "presentations",
  file: resolve(process.cwd(), argv.httpauth)
});
app.use(auth.connect(basic));
 
// Setup route. 
app.get('/', function(req, res){
  res.send("Hello from express - " + req.user + "!");
});

const port = process.env.PORT || 8080;
app.listen(port, app => l('listening on %s', port));
