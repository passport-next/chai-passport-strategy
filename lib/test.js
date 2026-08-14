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
 * @import {AuthInfo} from '@passport-next/passport-types';
 */

/**
 * @typedef {Request &
 *   import('../request-extensions.js').RequestExtensions} StrategyTestRequest
 */

/**
 * @typedef {(
 *   req: StrategyTestRequest,
 *   res: Response
 * ) => void} SyncRequestCallback
 */

/**
 * @typedef {(
 *   req: StrategyTestRequest,
 *   res: Response,
 *   ready: () => void
 * ) => void} AsyncRequestCallback
 */

/**
 * @typedef {SyncRequestCallback | AsyncRequestCallback} RequestCallback
 */

/**
 * @typedef {(
 *   this: StrategyTestRequest,
 *   ...args: Parameters<EnhancedStrategy['success']>
 * ) => void} SuccessCallback
 */

/**
 * @typedef {(
 *   this: StrategyTestRequest,
 *   challenge?: string | AuthInfo | number,
 *   status?: number
 * ) => void} FailCallback
 */

/**
 * @typedef {(
 *   this: StrategyTestRequest,
 *   ...args: Parameters<EnhancedStrategy['redirect']>
 * ) => void} RedirectCallback
 */

/**
 * @typedef {(
 *   this: StrategyTestRequest,
 *   ...args: Parameters<EnhancedStrategy['pass']>
 * ) => void} PassCallback
 */

/**
 * @typedef {(
 *   this: StrategyTestRequest,
 *   ...args: Parameters<EnhancedStrategy['error']>
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

      strategy.fail = /** @type {EnhancedStrategy['fail']} */ (
        /**
         * @param {string | AuthInfo | number} [challenge]
         * @param {number} [status]
         * @throws {Error}
         * @returns {void}
         */
        (challenge, status) => {
          if (!this.#fail) {
            throw new Error('Strategy#fail should not be called');
          }
          this.#fail.call(req, challenge, status);
        }
      );

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
