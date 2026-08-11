export default Response;
/**
 * Creates an instance of `Response`.
 *
 * This class is used as a mock when testing Passport strategies, substituted in
 * place of of a Node's `http.ServerResponse`.
 *
 * @class
 * @access protected
 */
declare class Response extends EventEmitter<any> {
    /**
     *
     */
    constructor();
    statusCode: number;
    _headers: {};
    /**
     *
     * @returns {void}
     */
    end(): void;
}
import { EventEmitter } from 'node:events';
