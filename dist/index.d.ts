export default chaiPassportStrategy;
export type PassportUse = (((strategy: PassportStrategyLike) => Test) & ((name: string, strategy: PassportStrategyLike) => Test));
export type StrategyLike = PassportStrategyLike;
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
declare function chaiPassportStrategy(chai: Chai.ChaiStatic & {
    passport?: {
        use?: PassportUse;
    };
}): Chai.ChaiStatic & {
    passport: {
        use: PassportUse;
    };
};
import type { StrategyLike as PassportStrategyLike } from '@passport-next/passport-strategy';
import Test from './test.js';
