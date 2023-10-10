"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLogger = getLogger;
exports.init = init;
var _pino = _interopRequireDefault(require("pino"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
var logger;
function init(options) {
  return logger = (0, _pino["default"])(options);
}
function getLogger() {
  return logger;
}