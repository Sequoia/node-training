import express from 'express';
import auth from './middleware/httpauth';
import {resolve} from 'path';
import {humanize, titleize} from 'underscore.string';
import debug from 'debug';

const l = debug('app:info');
const app = express();

//middleware & config
app.use(auth);
app.use(express.static(resolve(__dirname , '../static')));
app.set('views', resolve(process.cwd(),'template'));
app.set('view engine', 'jade');
 
//get main slide view, load markdown & title into it
app.get('/:deck', function(req, res, next){
  l('Deck requested: %s', req.params.deck);
  res.render('index', {deck: req.params.deck, title: titleize( humanize( req.params.deck ) )});
});

//catchall errors
app.use((err, req, res, next) => {
  l(err);
  res.set('status',err.code);
  res.write(err.message);
  res.end();
});

const port = process.env.PORT || 8080;
app.listen(port, app => l('listening on %s', port));
