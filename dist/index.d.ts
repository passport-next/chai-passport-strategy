export default chaiPassportStrategy;
export type PassportUse = (((strategy: Strategy) => Test) & ((name: string, strategy: Strategy) => Test));
export type StrategyLike = Strategy & Partial<Omit<EnhancedStrategy, keyof Strategy>>;
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
declare function chaiPassportStrategy(chai: Chai.ChaiStatic & {
    passport?: {
        use?: PassportUse;
    };
}): Chai.ChaiStatic & {
    passport: {
        use: PassportUse;
    };
};
import type { Strategy } from '@passport-next/passport-strategy';
import Test from './test.js';
import type { EnhancedStrategy } from '@passport-next/passport-strategy';
