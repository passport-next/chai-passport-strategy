export default Request;
/**
 * Creates an instance of `Request`.
 *
 * This class is used as a mock when testing Passport strategies, substituted in
 * place of Node's `http.IncomingMessage`.
 *
 * @class
 * @access protected
 */
declare class Request {
    method: string;
    url: string;
    /** @type {{[key: string]: unknown}} */
    headers: {
        [key: string]: unknown;
    };
}
