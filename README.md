# chai-passport-strategy

[![NPM version](https://img.shields.io/npm/v/@passport-next/chai-passport-strategy.svg)](https://www.npmjs.com/package/@passport-next/chai-passport-strategy)
[![Build Status](https://travis-ci.org/passport-next/chai-passport-strategy.svg?branch=master)](https://travis-ci.org/passport-next/chai-passport-strategy)
[![Coverage Status](https://coveralls.io/repos/github/passport-next/chai-passport-strategy/badge.svg?branch=master)](https://coveralls.io/github/passport-next/chai-passport-strategy?branch=master)
[![Maintainability](https://api.codeclimate.com/v1/badges/3372259864c17397d251/maintainability)](https://codeclimate.com/github/passport-next/chai-passport-strategy/maintainability)
[![Dependencies](https://david-dm.org/passport-next/chai-passport-strategy.png)](https://david-dm.org/passport-next/chai-passport-strategy)
<!--[![SAST](https://gitlab.com/passport-next/chai-passport-strategy/badges/master/build.svg)](https://gitlab.com/passport-next/chai-passport-strategy/badges/master/build.svg)-->

Helpers for testing [Passport](https://github.com/passport-next) strategies with the
[Chai](https://www.chaijs.com/) assertion library.

## Install

    $ npm install @passport-next/chai-passport-strategy

## Usage

#### Use Plugin

Use this plugin as you would all other Chai plugins:

```javascript
var chai = require('chai');

chai.use(require('chai-passport-strategy'));
```

#### Implement Test Cases

Once used, the `chai.passport.use` helper function will be available to set up
a test case which places a Passport strategy under test.

The helper returns a wrapper on which callbacks are registered to be executed
when the strategy invokes its final action function.  The callbacks correspond
to Passport's strategy API: `success()`, `fail()`, `redirect()`, `pass()`, and
`error()`.  If the strategy invokes an action that doesn't have a registered
callback, the test helper will automatically throw an exception.

For example, a [Mocha](https://mochajs.org/) test case that tests a strategy
which implements bearer token authentication:


```javascript
it('should authenticate request with token in header', function(done) {
  chai.passport.use(new Strategy(function(token, cb) {
      expect(token).to.equal('mF_9.B5f-4.1JqM');
      return cb(null, { id: '248289761001' }, { scope: [ 'profile', 'email' ] });
    }))
    .request(function(req) {
      req.headers['authorization'] = 'Bearer mF_9.B5f-4.1JqM';
    })
    .success(function(user, info) {
      expect(user).to.deep.equal({ id: '248289761001' });
      expect(info).to.deep.equal({ scope: [ 'profile', 'email' ] });
      done();
    })
    .authenticate();
});
```
