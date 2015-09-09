'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.Route = Route;
exports.SessionRoute = SessionRoute;
exports.generateRoutes = generateRoutes;
exports.generateSecuredRoutes = generateSecuredRoutes;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var _lodashFlattendeep = require('lodash.flattendeep');

var _lodashFlattendeep2 = _interopRequireDefault(_lodashFlattendeep);

function Route(method, path, config) {

  // returns a route object or array of route objects

  // could be 'GET', or ['GET', 'POST'...]
  if (method.map) {
    return method.map(function (method) {
      var _Route = Route(method, path, config[method.toLowerCase()]);

      var _Route2 = _slicedToArray(_Route, 1);

      var route = _Route2[0];

      return route;
    });
  }

  return [_defineProperty({
    method: method,
    path: path
  }, typeof config === 'function' ? 'handler' : 'config', config)];
}

function SessionRoute(method, path, config) {

  return Route(method, path, _extends({ auth: 'session' }, config));
}

function generateRoutes(routes, secured) {

  var routeGenerator = secured ? SessionRoute : Route;

  return routes.map(function (routeTuple) {
    var _routeGenerator$apply = routeGenerator.apply(null, routeTuple);

    var _routeGenerator$apply2 = _slicedToArray(_routeGenerator$apply, 1);

    var route = _routeGenerator$apply2[0];

    return route;
  });
}

function generateSecuredRoutes(routes) {
  return generateRoutes(routes, true);
}

var flattenRoutes = _lodashFlattendeep2['default'];
exports.flattenRoutes = flattenRoutes;
