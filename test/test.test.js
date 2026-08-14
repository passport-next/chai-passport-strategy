/* eslint-disable no-shadow -- Bootstrap */
/* eslint-disable promise/prefer-await-to-callbacks -- Middleware */
/* eslint-disable chai-expect/no-inner-literal -- useful to test `this` */
import {EnhancedStrategy} from '@passport-next/passport-strategy';
import {chai, expect} from './bootstrap/node.js';
import Request from '../lib/request.js';
import Response from '../lib/response.js';

describe('Test', function () {
  describe('#authenticate', function () {
    /**
     *
     */
    class Strategy extends EnhancedStrategy {
      /**
       * @param {object} req
       * @param {object} options
       * @returns {void}
       */
      authenticate (req, options) {
        expect(options).to.deep.equal({scope: ['profile', 'email']});
        this.redirect('/authorize', 302);
      }
    }


    it('should pass options to Strategy#authenticate', function (done) {
      chai.passport.use(new Strategy()).
        redirect(function () {
          done();
        }).
        authenticate({scope: ['profile', 'email']});
    }); // should pass options to Strategy#authenticate

    it('should accept an explicit strategy name', function (done) {
      chai.passport.use('example', new Strategy()).
        redirect(function () {
          done();
        }).
        authenticate({scope: ['profile', 'email']});
    });
  }); // #authenticate

  describe('#request', function () {
    /**
     *
     */
    class Strategy extends EnhancedStrategy {
      /**
       * @param {import('../lib/request.js').default} req
       * @returns {void}
       */
      authenticate (req) {
        expect(req.headers.authorization).to.equal('Bearer mF_9.B5f-4.1JqM');
        this.success({id: '248289761001'});
      }
    }

    it('should invoke sync callback', function (done) {
      chai.passport.use(new Strategy()).
        request(function (req, res) {
          expect(req).to.be.an.instanceof(Request);
          expect(req.method).to.equal('GET');
          expect(req.url).to.equal('/');
          expect(req.headers).to.deep.equal({});

          expect(res).to.be.an.instanceof(Response);
          expect(res.statusCode).to.equal(200);

          req.headers.authorization = 'Bearer mF_9.B5f-4.1JqM';
          req.marker = 'prepared';
        }).
        success(function () {
          expect(this.marker).to.equal('prepared');
          done();
        }).
        authenticate();
    }); // should invoke sync callback

    it('should invoke async callback', function (done) {
      chai.passport.use(new Strategy()).
        request(function (req, res, cb) {
          expect(req).to.be.an.instanceof(Request);
          expect(req.method).to.equal('GET');
          expect(req.url).to.equal('/');
          expect(req.headers).to.deep.equal({});

          expect(res).to.be.an.instanceof(Response);
          expect(res.statusCode).to.equal(200);

          req.headers.authorization = 'Bearer mF_9.B5f-4.1JqM';
          cb();
        }).
        success(function () {
          done();
        }).
        authenticate();
    }); // should invoke async callback
  }); // #request

  describe('#success', function () {
    /**
     *
     */
    class Strategy extends EnhancedStrategy {
      /**
       * @returns {void}
       */
      authenticate (/* req */) {
        this.success({id: '248289761001'}, {scope: ['profile', 'email']});
      }
    }


    it('should invoke callback', function (done) {
      chai.passport.use(new Strategy()).
        success(function (user, info) {
          expect(this).to.be.an.instanceof(Request);
          expect(user).to.deep.equal({id: '248289761001'});
          expect(info).to.deep.equal({scope: ['profile', 'email']});
          done();
        }).
        authenticate();
    }); // should invoke callback

    it('should throw when callback is not registered', function () {
      expect(function () {
        chai.passport.use(new Strategy()).
          authenticate();
      }).to.throw(Error, 'Strategy#success should not be called');
    }); // should throw when callback is not registered
  }); // #success

  describe('#fail', function () {
    /**
     *
     */
    class Strategy extends EnhancedStrategy {
      /**
       * @returns {void}
       */
      authenticate (/* req */) {
        this.fail('realm="example"', 401);
      }
    }


    it('should invoke callback', function (done) {
      chai.passport.use(new Strategy()).
        fail(function (challenge, status) {
          expect(this).to.be.an.instanceof(Request);
          expect(challenge).to.equal('realm="example"');
          expect(status).to.equal(401);
          done();
        }).
        authenticate();
    }); // should invoke callback

    it('should invoke callback without arguments', function (done) {
      /**
       *
       */
      class ArgumentlessStrategy extends EnhancedStrategy {
        /** @returns {void} */
        authenticate (/* req */) {
          this.fail();
        }
      }

      chai.passport.use(new ArgumentlessStrategy()).
        fail(function (challenge, status) {
          expect(challenge).to.be.undefined;
          expect(status).to.be.undefined;
          done();
        }).
        authenticate();
    });

    it('should invoke callback with status only', function (done) {
      /**
       *
       */
      class StatusStrategy extends EnhancedStrategy {
        /** @returns {void} */
        authenticate (/* req */) {
          this.fail(401);
        }
      }

      chai.passport.use(new StatusStrategy()).
        fail(function (status) {
          expect(status).to.equal(401);
          done();
        }).
        authenticate();
    });

    it('should throw when callback is not registered', function () {
      expect(function () {
        chai.passport.use(new Strategy()).
          authenticate();
      }).to.throw(Error, 'Strategy#fail should not be called');
    }); // should throw when callback is not registered
  }); // #fail

  describe('#redirect', function () {
    /**
     *
     */
    class Strategy extends EnhancedStrategy {
      /**
       * @returns {void}
       */
      authenticate (/* req */) {
        this.redirect('/authorize', 302);
      }
    }


    it('should invoke callback', function (done) {
      chai.passport.use(new Strategy()).
        redirect(function (url, status) {
          expect(this).to.be.an.instanceof(Request);
          expect(url).to.equal('/authorize');
          expect(status).to.equal(302);
          done();
        }).
        authenticate();
    }); // should invoke callback

    it('should invoke callback without status', function (done) {
      /**
       *
       */
      class StatuslessStrategy extends EnhancedStrategy {
        /** @returns {void} */
        authenticate (/* req */) {
          this.redirect('/authorize');
        }
      }

      chai.passport.use(new StatuslessStrategy()).
        redirect(function (url, status) {
          expect(url).to.equal('/authorize');
          expect(status).to.be.undefined;
          done();
        }).
        authenticate();
    });

    it('should throw when callback is not registered', function () {
      expect(function () {
        chai.passport.use(new Strategy()).
          authenticate();
      }).to.throw(Error, 'Strategy#redirect should not be called');
    }); // should throw when callback is not registered
  }); // #redirect

  describe('#pass', function () {
    /**
     *
     */
    class Strategy extends EnhancedStrategy {
      /**
       * @returns {void}
       */
      authenticate (/* req */) {
        this.pass();
      }
    }

    it('should invoke callback', function (done) {
      chai.passport.use(new Strategy()).
        pass(function () {
          expect(this).to.be.an.instanceof(Request);
          done();
        }).
        authenticate();
    }); // should invoke callback

    it('should throw when callback is not registered', function () {
      expect(function () {
        chai.passport.use(new Strategy()).
          authenticate();
      }).to.throw(Error, 'Strategy#pass should not be called');
    }); // should throw when callback is not registered
  }); // #pass

  describe('#error', function () {
    /**
     *
     */
    class Strategy extends EnhancedStrategy {
      /**
       * @returns {void}
       */
      authenticate (/* req */) {
        this.error(new Error('something went wrong'));
      }
    }

    it('should invoke callback', function (done) {
      chai.passport.use(new Strategy()).
        error(function (err) {
          expect(this).to.be.an.instanceof(Request);
          expect(err).to.be.an.instanceof(Error);
          expect(err.message).to.equal('something went wrong');
          done();
        }).
        authenticate();
    }); // should invoke callback

    it('should throw when callback is not registered', function () {
      expect(function () {
        chai.passport.use(new Strategy()).
          authenticate();
      }).to.throw(Error, 'Strategy#error should not be called');
    }); // should throw when callback is not registered
  }); // #error

  describe('#finish', function () {
    /**
     *
     */
    class Strategy extends EnhancedStrategy {
      /* eslint-disable class-methods-use-this -- Testing */
      /**
       * @param {import('../lib/request.js').default} req
       * @returns {void}
       */
      authenticate (req) {
        /* eslint-enable class-methods-use-this -- Testing */
        // @ts-expect-error -- Testing
        req.res.end();
      }
    }


    it('should invoke callback', function (done) {
      chai.passport.use(new Strategy()).
        request(function (req, res) {
          const linkedReq = /** @type {Request & {res: Response}} */ (req);
          const linkedRes = /** @type {Response & {req: Request}} */ (res);

          linkedReq.res = res;
          linkedRes.req = req;
        }).
        finish(function () {
          expect(this).to.be.an.instanceof(Response);
          done();
        }).
        authenticate();
    }); // should invoke callback

    it('should throw when callback is not registered', function () {
      expect(function () {
        chai.passport.use(new Strategy()).
          request(function (req, res) {
            const linkedReq = /** @type {Request & {res: Response}} */ (req);
            const linkedRes = /** @type {Response & {req: Request}} */ (res);

            linkedReq.res = res;
            linkedRes.req = req;
          }).
          authenticate();
      }).to.throw(Error, 'res#end should not be called');
    }); // should throw when callback is not registered
  }); // #finish
});
