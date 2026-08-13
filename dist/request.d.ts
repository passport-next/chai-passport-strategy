export default Request;
export type StrategyRequest = ConnectRequest & PassportRequest;
/** @import {ConnectRequest, HeaderValue} from '@passport-next/http-types' */
/** @import {Request as PassportRequest} from '@passport-next/passport-types' */
/** @typedef {ConnectRequest & PassportRequest} StrategyRequest */
/**
 * Creates an instance of `Request`.
 *
 * This class is used as a mock when testing Passport strategies, substituted in
 * place of Node's `http.IncomingMessage`.
 *
 * @class
 * @access protected
 * @implements {StrategyRequest}
 */
declare class Request implements StrategyRequest {
    method: string;
    url: string;
    /** @type {Record<string, HeaderValue>} */
    headers: Record<string, HeaderValue>;
}
import type { ConnectRequest } from '@passport-next/http-types';
import type { Request as PassportRequest } from '@passport-next/passport-types';
import type { HeaderValue } from '@passport-next/http-types';
