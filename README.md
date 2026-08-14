# @passport-next/chai-passport-strategy

[![NPM version](https://img.shields.io/npm/v/@passport-next/chai-passport-strategy.svg)](https://www.npmjs.com/package/@passport-next/chai-passport-strategy)
[![Coverage Status](https://coveralls.io/repos/github/passport-next/chai-passport-strategy/badge.svg?branch=master)](https://coveralls.io/github/passport-next/chai-passport-strategy?branch=master)

Helpers for testing [Passport](https://github.com/passport-next) strategies with the
[Chai](https://www.chaijs.com/) assertion library.

## Install

    $ npm install @passport-next/chai-passport-strategy

## Usage

### Use Plugin

Use this plugin as you would all other ESM Chai plugins:

```javascript
// Bootstrap file

import * as chaiModule from 'chai';
import chaiPassportStrategy from '@passport-next/chai-passport-strategy';

const chai = /** @type {ReturnType<typeof chaiPassportStrategy>} */ (
  chaiModule.use(chaiPassportStrategy)
);
export const {expect} = chai;
```

### Implement Test Cases

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
it('should authenticate request with token in header', function (done) {
  chai.passport.use(new Strategy(function (token, cb) {
    expect(token).to.equal('mF_9.B5f-4.1JqM');
    return cb(null, {id: '248289761001'}, {scope: ['profile', 'email']});
  })).
    request(function (req) {
      req.headers.authorization = 'Bearer mF_9.B5f-4.1JqM';
    }).
    success(function (user, info) {
      expect(user).to.deep.equal({id: '248289761001'});
      expect(info).to.deep.equal({scope: ['profile', 'email']});
      done();
    }).
    authenticate();
});
```

### TypeScript request extensions

The package exports `Request` and `RequestExtensions` types. To describe fields
that a strategy test adds to its mock request, augment the type-only
`@passport-next/chai-passport-strategy/request-extensions` module in a `.d.ts`
file included by your TypeScript configuration:

```ts
import '@passport-next/chai-passport-strategy/request-extensions';

declare module '@passport-next/chai-passport-strategy/request-extensions' {
  interface RequestExtensions {
    session?: Record<string, unknown>;
    tenantId?: string;
  }
}
```

The added fields are available on the request passed to `request()` and on the
`this` value of strategy action callbacks such as `success()` and `fail()`. The
composed request type can also be imported directly:

```ts
import type {Request} from '@passport-next/chai-passport-strategy';
```

`RequestExtensions` is empty by default and affects types only; the test remains
responsible for initializing any extended fields it uses.
