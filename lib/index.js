import Test from './test.js';

/**
 * @import {Strategy, EnhancedStrategy} from '@passport-next/passport-strategy';
 */

/**
 *
 * @param {Chai.ChaiStatic & {passport?: {
 *   use?: (strategy: Strategy) => Test
 * }}} chai
 * @returns {Chai.ChaiStatic & {passport: {
 *   use: (strategy: Strategy) => Test
 * }}}
 */
function chaiPassportStrategy (chai) {
  chai.passport ||= {};

  /**
   * @param {Strategy} strategy
   */
  chai.passport.use = function (strategy) {
    return new Test(strategy);
  };

  return (
    /**
     * @type {Chai.ChaiStatic & {passport: {
     *   use: (strategy: Strategy) => Test
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
