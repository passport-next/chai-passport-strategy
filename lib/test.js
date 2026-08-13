/* eslint-disable no-shadow -- Convenient */
/* eslint-disable promise/prefer-await-to-callbacks -- Middleware */
// Load modules.
import Request from './request.js';
import Response from './response.js';

/**
 * @import {
 *   EnhancedStrategy,
 *   StrategyLike
 * } from '@passport-next/passport-strategy';
 * @import {AuthInfo, User} from '@passport-next/passport-types';
 */

/**
 * @typedef {(req: Request, res: Response) => void} SyncRequestCallback
 */

/**
 * @typedef {(
 *   req: Request,
 *   res: Response,
 *   ready: () => void
 * ) => void} AsyncRequestCallback
 */

/**
 * @typedef {SyncRequestCallback | AsyncRequestCallback} RequestCallback
 */

/**
 * @typedef {(
 *   this: Request,
 *   user: User,
 *   info?: AuthInfo
 * ) => void} SuccessCallback
 */

/**
 * @typedef {(
 *   this: Request,
 *   challenge: string|{type?: string, message: string},
 *   status: number
 * ) => void} FailCallback
 */

/**
 * @typedef {(
 *   this: Request,
 *   url: string,
 *   status: number,
 * ) => void} RedirectCallback
 */

/**
 * @typedef {(this: Request) => void} PassCallback
 */

/**
 * @typedef {(
 *   this: Request,
 *   err: Error
 * ) => void} ErrorCallback
 */

/**
 * @typedef {(
 *   this: Response
 * ) => void} FinishCallback
 */

/**
 * Creates an instance of `Test`.
 *
 * @class
 * @access protected
 */
class Test {
  /** @type {RequestCallback | undefined} */
  #request;
  /** @type {SuccessCallback | undefined} */
  #success;
  /** @type {FailCallback | undefined} */
  #fail;
  /** @type {RedirectCallback | undefined} */
  #redirect;
  /** @type {PassCallback | undefined} */
  #pass;
  /** @type {ErrorCallback | undefined} */
  #error;
  /** @type {FinishCallback | undefined} */
  #finish;
  /** @type {StrategyLike} */
  #strategy;

  /**
   *
  * @param {StrategyLike} strategy
   */
  constructor (strategy) {
    this.#strategy = strategy;
  }

  /**
   * Register a callback to be invoked when request is prepared.
   *
   * @overload
   * @param {AsyncRequestCallback} cb
   * @returns {Test} for chaining
   */
  /**
   * Register a callback to be invoked when request is prepared.
   *
   * @overload
   * @param {SyncRequestCallback} cb
   * @returns {Test} for chaining
   */
  /**
   * Register a callback to be invoked when request is prepared.
   *
   * @param {RequestCallback} cb
   * @returns {Test} for chaining
   * @access public
   */
  request (cb) {
    this.#request = cb;
    return this;
  }

  /**
   * Register a callback to be invoked when strategy calls `success()`.
   *
   * @param {SuccessCallback} cb
   * @returns {Test} for chaining
   * @access public
   */
  success (cb) {
    this.#success = cb;
    return this;
  }

  /**
   * Register a callback to be invoked when strategy calls `fail()`.
   *
   * @param {FailCallback} cb
   * @returns {Test} for chaining
   * @access public
   */
  fail (cb) {
    this.#fail = cb;
    return this;
  }

  /**
   * Register a callback to be invoked when strategy calls `redirect()`.
   *
   * @param {RedirectCallback} cb
   * @returns {Test} for chaining
   * @access public
   */
  redirect (cb) {
    this.#redirect = cb;
    return this;
  }

  /**
   * Register a callback to be invoked when strategy calls `pass()`.
   *
   * @param {PassCallback} cb
   * @returns {Test} for chaining
   * @access public
   */
  pass (cb) {
    this.#pass = cb;
    return this;
  }

  /**
   * Register a callback to be invoked when strategy calls `error()`.
   *
   * @param {ErrorCallback} cb
   * @returns {Test} for chaining
   * @access public
   */
  error (cb) {
    this.#error = cb;
    return this;
  }

  /**
   * Register a callback to be invoked when strategy `end()`s response.
   *
   * @param {FinishCallback} cb
   * @returns {Test} for chaining
   * @access public
   */
  finish (cb) {
    this.#finish = cb;
    return this;
  }

  /**
   * Start strategy authentication test with optional options.
   *
   * @param {object} [options]
   * @access public
   * @returns {void}
   */
  authenticate (options) {
    const req = new Request(),
      res = new Response(),
      prepare = this.#request;

    res.once('finish', () => {
      if (!this.#finish) {
        throw new Error('res#end should not be called');
      }
      this.#finish.call(res);
    });

    /**
     * @returns {void}
     */
    const ready = () => {
      // Create a new instance from the prototype strategy.
      const strategy = /** @type {EnhancedStrategy} */ (
        Object.create(this.#strategy)
      );

      // Extend the instance with action functions.
      strategy.success = (user, info) => {
        if (!this.#success) {
          throw new Error('Strategy#success should not be called');
        }
        this.#success.call(req, user, info);
      };

      strategy.fail = (challenge, status) => {
        if (!this.#fail) {
          throw new Error('Strategy#fail should not be called');
        }
        this.#fail.call(req, challenge, status);
      };

      strategy.redirect = (url, status) => {
        if (!this.#redirect) {
          throw new Error('Strategy#redirect should not be called');
        }
        this.#redirect.call(req, url, status);
      };

      strategy.pass = () => {
        if (!this.#pass) {
          throw new Error('Strategy#pass should not be called');
        }
        this.#pass.call(req);
      };

      strategy.error = (err) => {
        if (!this.#error) {
          throw new Error('Strategy#error should not be called');
        }
        this.#error.call(req, err);
      };

      strategy.authenticate(req, options);
    };

    if (prepare && prepare.length === 3) {
      /** @type {AsyncRequestCallback} */ (prepare)(req, res, ready);
    } else if (prepare) {
      /** @type {SyncRequestCallback} */ (prepare)(req, res);
      ready();
    } else {
      ready();
    }
  }
}

// Expose constructor.
export default Test;
