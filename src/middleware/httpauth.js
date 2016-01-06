import minimist from 'minimist';
import {resolve} from 'path';
import auth from 'http-auth';
import {not, has} from 'ramda';

const argv = minimist(process.argv.slice(2), {alias:{'a':'httpauth'}});

// http auth setup
// create httppasswd file & pass path to it relative to cwd (or absolute)
if(not(has('httpauth')(argv))) throw "ERROR: --httpauth, -a required";
const basic = auth.basic({
  realm: "presentations",
  file: resolve(process.cwd(), argv.httpauth)
});

export default auth.connect(basic);
