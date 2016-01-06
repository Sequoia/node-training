'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _minimist = require('minimist');

var _minimist2 = _interopRequireDefault(_minimist);

var _path = require('path');

var _httpAuth = require('http-auth');

var _httpAuth2 = _interopRequireDefault(_httpAuth);

var _ramda = require('ramda');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var argv = (0, _minimist2.default)(process.argv.slice(2), { alias: { 'a': 'httpauth' } });

// http auth setup
// create httppasswd file & pass path to it relative to cwd (or absolute)
if ((0, _ramda.not)((0, _ramda.has)('httpauth')(argv))) throw "ERROR: --httpauth, -a required";
var basic = _httpAuth2.default.basic({
  realm: "presentations",
  file: (0, _path.resolve)(process.cwd(), argv.httpauth)
});

exports.default = _httpAuth2.default.connect(basic);