import Lab from 'lab';
const Code = Lab.assertions;
export const lab = Lab.script();

let {
  describe,
  it,
  before,
  after
} = lab;
let { expect } = Code;

import * as utils from '../src/index';

describe('Route', _ => {

  it('should return an array of route objects', done => {

    let singleRoute = utils.Route('method', 'path', 'config');
    let doubleRoute = utils.Route(['METHOD'], 'path', {method: 'success'});

    expect(singleRoute).to.be.an.array();
    expect(singleRoute[0].config).to.be.a.string('config');

    expect(doubleRoute[0]).to.be.an.object();
    expect(doubleRoute[0].method).to.be.a.string('success');

    done();

  });

  it('should accept a tuple in form [["GET", "POST"], "/", config]', done => {

    let [GET, POST] = utils.Route(['GET', 'POST'], '/', {get: 'success', post: 'success'});

    expect(GET.config).to.be.a.string('success');
    expect(POST.config).to.be.a.string('success');
    done();

  });

  it('should return a route object with a handler property if supplied a function', done => {

    let [fn, obj] = utils.generateRoutes([
      ['GET', '/', function() {}],
      ['GET', '/', {}]
    ]);

    expect(fn.handler).to.exist();
    expect(obj.config).to.exist();

    done();

  });

});

describe('SessionRoute', _ => {

  it('should apply key:val auth:session to route object', done => {

    let route = utils.SessionRoute('method', 'path', {});

    expect(route[0].config.auth).to.be.a.string('session');
    done();

  });

});

describe('GenerateRoutes', _ => {

  it('should accept a first argument of an array of route tuples', done => {

    let routeTuple = ['method', 'path', {}];
    let generated = utils.generateRoutes([routeTuple]);

    expect(generated[0].method).to.be.a.string('method');
    done();

  });

  it('should accept tuples in form [["GET", "POST"], "/", config]', done => {

    let [_, POST] = utils.generateRoutes([
      [['GET', 'POST'], '/', {get: 'success', post: 'success'}]
    ]);

    expect(POST.config).to.be.a.string('success');
    done();

  });

});

describe('generateSecuredRoutes', _ => {

  it('should apply key:val auth:session to route objects', done => {

    let routeTuple = ['method', 'path', {}];
    let secured = utils.generateSecuredRoutes([routeTuple]);

    expect(secured[0].config.auth).to.be.a.string('session');
    done();

  });

});

describe('flattenRoutes', _ => {

  it('should deeply flatten route objects to single array', done => {

    let routes = [
      utils.generateRoutes([['method', 'path', {}]]),
      utils.generateRoutes([['method', 'path', {}]])
    ];

    let flattened = utils.flattenRoutes(routes);

    expect(flattened[0]).to.be.an.object();
    expect(flattened[1]).to.be.an.object();

    done();

  });

});
