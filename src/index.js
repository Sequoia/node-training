import express from 'express';
import auth from './middleware/httpauth';
import {resolve, extname} from 'path';
import {humanize, titleize} from 'underscore.string';
import debug from 'debug';
var fs = require('fs');

const l = debug('app:info');
const app = express();

//middleware & config
app.use(auth);
app.use(express.static(resolve(__dirname , '../static')));
app.set('views', resolve(process.cwd(),'template'));
app.set('view engine', 'jade');
 
//index page
app.get('/', function(req, res, next){
  //redirect for now
  res.redirect('node-2day');
});

//slides index
app.get('/node-2day', function(req, res, next){
  var decks = [
    'welcome-to-node',
    'javascript-review',
    'async-flow-control',
    'event-loop',
    'node-core-apis',
    'node-ecosystem',
    'npm',
    'express',
    'express-routes',
    'express-middleware',
    'express-templates',
    'datastores',
    'sequelize',
    'mongo-and-mongoose'
  ].reduce(function(out, deck){
    //group in pairs for templater
    var last = out[out.length-1];
    var lastlen = last.length;
    if(lastlen === 2){ out.push([deck]); }
    else{ last.push(deck); }
    return out;
  },[[]]);
  l(decks);
  res.render('slides-toc', { 
    title: "Node 2-Day",
    basepath : '/node-2day',
    decks
  });
});

//get main slide view, load markdown & title into it
app.get('/node-2day/*', function(req, res, next){
  l(req.params[0]);
  l('Deck requested: %s', req.params.deck);
  res.render('slideshow', {deck: req.params[0], title: titleize( humanize( req.params.deck ) )});
});

app.get('*', function(req, res, next){
  l('404: ', req.url);
  res.redirect('/');
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
