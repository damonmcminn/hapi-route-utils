import flattenDeep from 'lodash.flattendeep';

export function Route(method, path, config) {

  // returns a route object or array of route objects

  // could be 'GET', or ['GET', 'POST'...]
  if (method.map) {
    return method.map(method => {
      let [route] = Route(method, path, config[method.toLowerCase()]);
      return route;
    });
  }

  return [{
    method: method,
    path: path,
    config: config,
  }];

}

export function SessionRoute(method, path, config) {

  return Route(method, path, { auth: 'session', ...config });

}

export function generateRoutes(routes, secured) {

  let routeGenerator = secured ? SessionRoute : Route;

  return routes.map(routeTuple => {
    let [route] = routeGenerator.apply(null, routeTuple);
    return route;
  });

}

export function generateSecuredRoutes(routes) {
  return generateRoutes(routes, true);
}

export function flattenRoutes(xs) {
  return flattenDeep(xs);
}
