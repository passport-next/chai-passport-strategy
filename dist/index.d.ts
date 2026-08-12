export default chaiPassportStrategy;
export type StrategyLike = Strategy & Partial<Omit<EnhancedStrategy, keyof Strategy>>;
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
declare function chaiPassportStrategy(chai: Chai.ChaiStatic & {
    passport?: {
        use?: (strategy: Strategy) => Test;
    };
}): Chai.ChaiStatic & {
    passport: {
        use: (strategy: Strategy) => Test;
    };
};
import type { Strategy } from '@passport-next/passport-strategy';
import type { EnhancedStrategy } from '@passport-next/passport-strategy';
import Test from './test.js';
