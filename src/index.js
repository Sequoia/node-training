import minimist from 'minimist';
import {resolve} from 'path';
import express from 'express';
import auth from 'http-auth';
import {not, has} from 'ramda';

const argv = minimist(process.argv.slice(2), {alias:{'a':'httpauth'}});
const app = express();

if(not(has('httpauth')(argv))) throw "ERROR: --httpauth, -a required";

//http auth setup
const basic = auth.basic({
  realm: "presentations",
  file: resolve(process.cwd(), argv.httpauth)
});

// Application setup. 
app.use(auth.connect(basic));
 
// Setup route. 
app.get('/', function(req, res){
  res.send("Hello from express - " + req.user + "!");
});

app.listen(8080);
