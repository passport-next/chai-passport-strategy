/* eslint-disable no-shadow -- The desired name */
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
class Request {
  method = 'GET';
  url = '/';
  /** @type {Record<string, HeaderValue>} */
  headers = {};
}

// Expose constructor.
export default Request;
