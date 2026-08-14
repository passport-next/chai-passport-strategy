import Test from './test.js';

/**
 * @import {
 *   StrategyLike as PassportStrategyLike
 * } from '@passport-next/passport-strategy'
 */

/**
 * @typedef {(
 *   ((strategy: PassportStrategyLike) => Test) &
 *   ((name: string, strategy: PassportStrategyLike) => Test)
 * )} PassportUse
 */

/**
 *
 * @param {Chai.ChaiStatic & {passport?: {
 *   use?: PassportUse
 * }}} chai
 * @returns {Chai.ChaiStatic & {passport: {
 *   use: PassportUse
 * }}}
 */
function chaiPassportStrategy (chai) {
  chai.passport ||= {};

  /**
   * @overload
   * @param {string} name
   * @param {PassportStrategyLike} strategy
   * @returns {Test}
   */

  /**
   * @overload
   * @param {PassportStrategyLike} strategy
   * @returns {Test}
   */
  /**
   * @param {string | PassportStrategyLike} name
   * @param {PassportStrategyLike} [strategy]
   * @returns {Test}
   */
  chai.passport.use = function (name, strategy) {
    if (typeof name !== 'string') {
      strategy = name;
    }
    return new Test(/** @type {PassportStrategyLike} */ (strategy));
  };

  return (
    /**
     * @type {Chai.ChaiStatic & {passport: {
     *   use: PassportUse
     * }}}
     */ (chai)
  );
}

/** @typedef {PassportStrategyLike} StrategyLike */
/**
 * @typedef {import('../request-extensions.js').RequestExtensions}
 *   RequestExtensions
 */
/**
 * @typedef {import('./request.js').default & RequestExtensions} Request
 */

export default chaiPassportStrategy;
