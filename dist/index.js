'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _httpauth = require('./middleware/httpauth');

var _httpauth2 = _interopRequireDefault(_httpauth);

var _path = require('path');

var _underscore = require('underscore.string');

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fs = require('fs');

var l = (0, _debug2.default)('app:info');
var app = (0, _express2.default)();

//middleware & config
app.use(_httpauth2.default);
app.use(_express2.default.static((0, _path.resolve)(__dirname, '../static')));
app.set('views', (0, _path.resolve)(process.cwd(), 'template'));
app.set('view engine', 'jade');

//index page
app.get('/', function (req, res, next) {
  //redirect for now
  res.redirect('node-2day');
});

//slides index
app.get('/node-2day', function (req, res, next) {
  var decks = ['welcome-to-node', 'javascript-review', 'async-flow-control', 'event-loop', 'node-core-apis', 'node-ecosystem', 'npm', 'express', 'express-routes', 'express-middleware', 'express-templates', 'datastores', 'sequelize', 'mongo-and-mongoose'].reduce(function (out, deck) {
    //group in pairs for templater
    var last = out[out.length - 1];
    var lastlen = last.length;
    if (lastlen === 2) {
      out.push([deck]);
    } else {
      last.push(deck);
    }
    return out;
  }, [[]]);
  l(decks);
  res.render('slides-toc', {
    title: "Node 2-Day",
    basepath: '/node-2day',
    decks: decks
  });
});

//get main slide view, load markdown & title into it
app.get('/node-2day/:deck', function (req, res, next) {
  l('Deck requested: %s', req.params.deck);
  res.render('slideshow', { deck: req.params.deck, title: (0, _underscore.titleize)((0, _underscore.humanize)(req.params.deck)) });
});

app.get('*', function (req, res, next) {
  l('404: ', req.url);
  res.redirect('/');
});

//catchall errors
app.use(function (err, req, res, next) {
  l(err);
  res.set('status', err.code);
  res.write(err.message);
  res.end();
});

var port = process.env.PORT || 8080;
app.listen(port, function (app) {
  return l('listening on %s', port);
});