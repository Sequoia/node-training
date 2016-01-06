'use strict';

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _path = require('path');

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _httpAuth = require('http-auth');

var _httpAuth2 = _interopRequireDefault(_httpAuth);

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

//TODO extract these into "shortcuts" module
var l = console.log.bind(console);
var err = console.error.bind(console);

var argv = (0, _minimist2.default)(process.argv.slice(2), { alias: { 'a': 'httpauth' } });
var app = (0, _express2.default)();

// http auth setup
// create httppasswd file & pass path to it relative to cwd (or absolute)
if ((0, _ramda.not)((0, _ramda.has)('httpauth')(argv))) throw "ERROR: --httpauth, -a required";
var basic = _httpAuth2.default.basic({
  realm: "presentations",
  file: (0, _path.resolve)(process.cwd(), argv.httpauth)
});
app.use(_httpAuth2.default.connect(basic));

// Setup route.
app.get('/', function (req, res) {
  res.send("Hello from express - " + req.user + "!");
});

var port = process.env.PORT || 8080;
app.listen(port, function (app) {
  return l('listening on %s', port);
});