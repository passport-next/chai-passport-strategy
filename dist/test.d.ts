export default Test;
export type StrategyTestRequest = Request & import("../request-extensions.js").RequestExtensions;
export type SyncRequestCallback = (req: StrategyTestRequest, res: Response) => void;
export type AsyncRequestCallback = (req: StrategyTestRequest, res: Response, ready: () => void) => void;
export type RequestCallback = SyncRequestCallback | AsyncRequestCallback;
export type SuccessCallback = (this: StrategyTestRequest, ...args: Parameters<EnhancedStrategy["success"]>) => void;
export type FailCallback = (this: StrategyTestRequest, challenge?: string | AuthInfo | number, status?: number) => void;
export type RedirectCallback = (this: StrategyTestRequest, ...args: Parameters<EnhancedStrategy["redirect"]>) => void;
export type PassCallback = (this: StrategyTestRequest, ...args: Parameters<EnhancedStrategy["pass"]>) => void;
export type ErrorCallback = (this: StrategyTestRequest, ...args: Parameters<EnhancedStrategy["error"]>) => void;
export type FinishCallback = (this: Response) => void;
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
declare class Test {
    /**
     *
     * @param {StrategyLike} strategy
     */
    constructor(strategy: StrategyLike);
    /**
     * Register a callback to be invoked when request is prepared.
     *
     * @overload
     * @param {AsyncRequestCallback} cb
     * @returns {Test} for chaining
     */
    request(cb: AsyncRequestCallback): Test;
    /**
     * Register a callback to be invoked when request is prepared.
     *
     * @overload
     * @param {SyncRequestCallback} cb
     * @returns {Test} for chaining
     */
    request(cb: SyncRequestCallback): Test;
    /**
     * Register a callback to be invoked when strategy calls `success()`.
     *
     * @param {SuccessCallback} cb
     * @returns {Test} for chaining
     * @access public
     */
    success(cb: SuccessCallback): Test;
    /**
     * Register a callback to be invoked when strategy calls `fail()`.
     *
     * @param {FailCallback} cb
     * @returns {Test} for chaining
     * @access public
     */
    fail(cb: FailCallback): Test;
    /**
     * Register a callback to be invoked when strategy calls `redirect()`.
     *
     * @param {RedirectCallback} cb
     * @returns {Test} for chaining
     * @access public
     */
    redirect(cb: RedirectCallback): Test;
    /**
     * Register a callback to be invoked when strategy calls `pass()`.
     *
     * @param {PassCallback} cb
     * @returns {Test} for chaining
     * @access public
     */
    pass(cb: PassCallback): Test;
    /**
     * Register a callback to be invoked when strategy calls `error()`.
     *
     * @param {ErrorCallback} cb
     * @returns {Test} for chaining
     * @access public
     */
    error(cb: ErrorCallback): Test;
    /**
     * Register a callback to be invoked when strategy `end()`s response.
     *
     * @param {FinishCallback} cb
     * @returns {Test} for chaining
     * @access public
     */
    finish(cb: FinishCallback): Test;
    /**
     * Start strategy authentication test with optional options.
     *
     * @param {object} [options]
     * @access public
     * @returns {void}
     */
    authenticate(options?: object): void;
    #private;
}
import Request from './request.js';
import Response from './response.js';
import type { EnhancedStrategy } from '@passport-next/passport-strategy';
import type { AuthInfo } from '@passport-next/passport-types';
import type { StrategyLike } from '@passport-next/passport-strategy';
