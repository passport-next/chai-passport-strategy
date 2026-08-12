import Test from './test.js';

/**
 * @import {Strategy, EnhancedStrategy} from '@passport-next/passport-strategy';
 */

/**
 * @typedef {(
 *   ((strategy: Strategy) => Test) &
 *   ((name: string, strategy: Strategy) => Test)
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
   * @param {Strategy} strategy
   * @returns {Test}
   */

  /**
   * @overload
   * @param {Strategy} strategy
   * @returns {Test}
   */
  /**
   * @param {string | Strategy} name
   * @param {Strategy} [strategy]
   * @returns {Test}
   */
  chai.passport.use = function (name, strategy) {
    if (typeof name !== 'string') {
      strategy = name;
    }
    return new Test(/** @type {Strategy} */ (strategy));
  };

  return (
    /**
     * @type {Chai.ChaiStatic & {passport: {
     *   use: PassportUse
     * }}}
     */ (chai)
  );
}

/**
 * @typedef {Strategy &
 *   Partial<Omit<EnhancedStrategy, keyof Strategy>>
 * } StrategyLike
 */

export default chaiPassportStrategy;
