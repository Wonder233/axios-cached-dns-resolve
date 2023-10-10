"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.backgroundRefresh = backgroundRefresh;
exports.cacheConfig = void 0;
exports.changeLogger = changeLogger;
exports.config = void 0;
exports.getAddress = getAddress;
exports.getDnsCacheEntries = getDnsCacheEntries;
exports.getStats = getStats;
exports.init = init;
exports.registerInterceptor = registerInterceptor;
exports.reset = reset;
exports.startBackgroundRefresh = startBackgroundRefresh;
exports.startPeriodicCachePrune = startPeriodicCachePrune;
exports.stats = void 0;
var _dns = _interopRequireDefault(require("dns"));
var _url = _interopRequireDefault(require("url"));
var _net = _interopRequireDefault(require("net"));
var _jsonStringifySafe = _interopRequireDefault(require("json-stringify-safe"));
var _lruCache = _interopRequireDefault(require("lru-cache"));
var _util = _interopRequireDefault(require("util"));
var _logging = require("./logging.js");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw new Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw new Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw new Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }
function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; } /* eslint-disable no-plusplus */
var dnsResolve = _util["default"].promisify(_dns["default"].resolve);
var dnsLookup = _util["default"].promisify(_dns["default"].lookup);
var config = exports.config = {
  disabled: process.env.AXIOS_DNS_DISABLE === 'true',
  dnsTtlMs: process.env.AXIOS_DNS_CACHE_TTL_MS || 5000,
  // when to refresh actively used dns entries (5 sec)
  cacheGraceExpireMultiplier: process.env.AXIOS_DNS_CACHE_EXPIRE_MULTIPLIER || 2,
  // maximum grace to use entry beyond TTL
  dnsIdleTtlMs: process.env.AXIOS_DNS_CACHE_IDLE_TTL_MS || 1000 * 60 * 60,
  // when to remove entry entirely if not being used (1 hour)
  backgroundScanMs: process.env.AXIOS_DNS_BACKGROUND_SCAN_MS || 2400,
  // how frequently to scan for expired TTL and refresh (2.4 sec)
  dnsCacheSize: process.env.AXIOS_DNS_CACHE_SIZE || 100,
  // maximum number of entries to keep in cache
  // pino logging options
  logging: {
    name: 'axios-cache-dns-resolve',
    // enabled: true,
    level: process.env.AXIOS_DNS_LOG_LEVEL || 'info',
    // default 'info' others trace, debug, info, warn, error, and fatal
    // timestamp: true,
    prettyPrint: process.env.NODE_ENV === 'DEBUG' || false,
    formatters: {
      level: function level(label /* , number */) {
        return {
          level: label
        };
      }
    }
  },
  cache: undefined
};
var cacheConfig = exports.cacheConfig = {
  max: config.dnsCacheSize,
  ttl: config.dnsTtlMs * config.cacheGraceExpireMultiplier // grace for refresh
};

var stats = exports.stats = {
  dnsEntries: 0,
  refreshed: 0,
  hits: 0,
  misses: 0,
  idleExpired: 0,
  errors: 0,
  lastError: 0,
  lastErrorTs: 0
};
var log;
var backgroundRefreshId;
var cachePruneId;
init();
function init() {
  log = (0, _logging.init)(config.logging);
  if (config.cache) return;
  config.cache = new _lruCache["default"](cacheConfig);
  startBackgroundRefresh();
  startPeriodicCachePrune();
  cachePruneId = setInterval(function () {
    return config.cache.purgeStale();
  }, config.dnsIdleTtlMs);
}
function reset() {
  if (backgroundRefreshId) clearInterval(backgroundRefreshId);
  if (cachePruneId) clearInterval(cachePruneId);
}
function startBackgroundRefresh() {
  if (backgroundRefreshId) clearInterval(backgroundRefreshId);
  backgroundRefreshId = setInterval(backgroundRefresh, config.backgroundScanMs);
}
function startPeriodicCachePrune() {
  if (cachePruneId) clearInterval(cachePruneId);
  cachePruneId = setInterval(function () {
    return config.cache.purgeStale();
  }, config.dnsIdleTtlMs);
}
function getStats() {
  stats.dnsEntries = config.cache.size;
  return stats;
}
function getDnsCacheEntries() {
  return Array.from(config.cache.values());
}

// const dnsEntry = {
//   host: 'www.amazon.com',
//   ips: [
//     '52.54.40.141',
//     '34.205.98.207',
//     '3.82.118.51',
//   ],
//   nextIdx: 0,
//   lastUsedTs: 1555771516581, Date.now()
//   updatedTs: 1555771516581,
// }

function changeLogger(logger) {
  log = logger;
  log.changed = true;
}
function registerInterceptor(axios) {
  if (config.disabled || !axios || !axios.interceptors) return; // supertest
  axios.interceptors.request.use( /*#__PURE__*/function () {
    var _ref = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee(reqConfig) {
      var url;
      return _regeneratorRuntime().wrap(function _callee$(_context) {
        while (1) switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            if (reqConfig.baseURL) {
              url = _url["default"].parse(reqConfig.baseURL);
            } else {
              url = _url["default"].parse(reqConfig.url);
            }
            if (!_net["default"].isIP(url.hostname)) {
              _context.next = 4;
              break;
            }
            return _context.abrupt("return", reqConfig);
          case 4:
            // skip

            reqConfig.headers.Host = url.hostname; // set hostname in header
            _context.next = 7;
            return getAddress(url.hostname);
          case 7:
            url.hostname = _context.sent;
            delete url.host; // clear hostname

            if (reqConfig.baseURL) {
              reqConfig.baseURL = _url["default"].format(url);
            } else {
              reqConfig.url = _url["default"].format(url);
            }
            _context.next = 15;
            break;
          case 12:
            _context.prev = 12;
            _context.t0 = _context["catch"](0);
            recordError(_context.t0, "Error getAddress, ".concat(_context.t0.message));
          case 15:
            return _context.abrupt("return", reqConfig);
          case 16:
          case "end":
            return _context.stop();
        }
      }, _callee, null, [[0, 12]]);
    }));
    return function (_x) {
      return _ref.apply(this, arguments);
    };
  }());
}
function getAddress(_x2) {
  return _getAddress.apply(this, arguments);
}
function _getAddress() {
  _getAddress = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee2(host) {
    var dnsEntry, _ip, ips, ip;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          dnsEntry = config.cache.get(host);
          if (!dnsEntry) {
            _context2.next = 7;
            break;
          }
          ++stats.hits;
          dnsEntry.lastUsedTs = Date.now();
          // eslint-disable-next-line no-plusplus
          _ip = dnsEntry.ips[dnsEntry.nextIdx++ % dnsEntry.ips.length]; // round-robin
          config.cache.set(host, dnsEntry);
          return _context2.abrupt("return", _ip);
        case 7:
          ++stats.misses;
          if (log.changed || log.isLevelEnabled('debug')) {
            log.debug("[DNS cache] cache miss ".concat(host));
          }
          _context2.next = 11;
          return resolve(host);
        case 11:
          ips = _context2.sent;
          dnsEntry = {
            host: host,
            ips: ips,
            nextIdx: 0,
            lastUsedTs: Date.now(),
            updatedTs: Date.now()
          };
          // eslint-disable-next-line no-plusplus
          ip = dnsEntry.ips[dnsEntry.nextIdx++ % dnsEntry.ips.length]; // round-robin
          config.cache.set(host, dnsEntry);
          return _context2.abrupt("return", ip);
        case 16:
        case "end":
          return _context2.stop();
      }
    }, _callee2);
  }));
  return _getAddress.apply(this, arguments);
}
var backgroundRefreshing = false;
function backgroundRefresh() {
  return _backgroundRefresh.apply(this, arguments);
}
/**
 *
 * @param host
 * @returns {*[]}
 */
function _backgroundRefresh() {
  _backgroundRefresh = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee4() {
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          if (!backgroundRefreshing) {
            _context4.next = 2;
            break;
          }
          return _context4.abrupt("return");
        case 2:
          // don't start again if currently iterating slowly
          backgroundRefreshing = true;
          try {
            config.cache.forEach( /*#__PURE__*/function () {
              var _ref2 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee3(value, key) {
                var ips;
                return _regeneratorRuntime().wrap(function _callee3$(_context3) {
                  while (1) switch (_context3.prev = _context3.next) {
                    case 0:
                      _context3.prev = 0;
                      if (!(value.updatedTs + config.dnsTtlMs > Date.now())) {
                        _context3.next = 3;
                        break;
                      }
                      return _context3.abrupt("return");
                    case 3:
                      if (!(value.lastUsedTs + config.dnsIdleTtlMs <= Date.now())) {
                        _context3.next = 7;
                        break;
                      }
                      ++stats.idleExpired;
                      config.cache["delete"](key);
                      return _context3.abrupt("return");
                    case 7:
                      _context3.next = 9;
                      return resolve(value.host);
                    case 9:
                      ips = _context3.sent;
                      value.ips = ips;
                      value.updatedTs = Date.now();
                      config.cache.set(key, value);
                      ++stats.refreshed;
                      _context3.next = 19;
                      break;
                    case 16:
                      _context3.prev = 16;
                      _context3.t0 = _context3["catch"](0);
                      // best effort
                      recordError(_context3.t0, "Error backgroundRefresh host: ".concat(key, ", ").concat((0, _jsonStringifySafe["default"])(value), ", ").concat(_context3.t0.message));
                    case 19:
                    case "end":
                      return _context3.stop();
                  }
                }, _callee3, null, [[0, 16]]);
              }));
              return function (_x4, _x5) {
                return _ref2.apply(this, arguments);
              };
            }());
          } catch (err) {
            // best effort
            recordError(err, "Error backgroundRefresh, ".concat(err.message));
          } finally {
            backgroundRefreshing = false;
          }
        case 4:
        case "end":
          return _context4.stop();
      }
    }, _callee4);
  }));
  return _backgroundRefresh.apply(this, arguments);
}
function resolve(_x3) {
  return _resolve.apply(this, arguments);
} // dns.lookup
// ***************** { address: '142.250.190.68', family: 4 }
// , { all: true } /***************** [ { address: '142.250.190.68', family: 4 } ]
function _resolve() {
  _resolve = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime().mark(function _callee5(host) {
    var ips, lookupResp;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.next = 3;
          return dnsResolve(host);
        case 3:
          ips = _context5.sent;
          _context5.next = 15;
          break;
        case 6:
          _context5.prev = 6;
          _context5.t0 = _context5["catch"](0);
          _context5.next = 10;
          return dnsLookup(host, {
            all: true
          });
        case 10:
          lookupResp = _context5.sent;
          // pass options all: true for all addresses
          lookupResp = extractAddresses(lookupResp);
          if (!(!Array.isArray(lookupResp) || lookupResp.length < 1)) {
            _context5.next = 14;
            break;
          }
          throw new Error("fallback to dnsLookup returned no address ".concat(host));
        case 14:
          ips = lookupResp;
        case 15:
          return _context5.abrupt("return", ips);
        case 16:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[0, 6]]);
  }));
  return _resolve.apply(this, arguments);
}
function extractAddresses(lookupResp) {
  if (!Array.isArray(lookupResp)) throw new Error('lookup response did not contain array of addresses');
  return lookupResp.filter(function (e) {
    return e.address != null;
  }).map(function (e) {
    return e.address;
  });
}
function recordError(err, errMesg) {
  ++stats.errors;
  stats.lastError = err;
  stats.lastErrorTs = new Date().toISOString();
  log.error("[DNS cache] ".concat(JSON.stringify(err), " ").concat(errMesg));
}
/* eslint-enable no-plusplus */