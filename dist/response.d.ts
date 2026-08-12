export default Response;
export type ResponseEmitter = {
    once: (eventName: string, listener: (...args: unknown[]) => void) => ResponseEmitter;
    emit: (eventName: string, ...args: unknown[]) => boolean;
};
declare const Response_base: new () => ResponseEmitter;
/**
 * @typedef {object} ResponseEmitter
 * @property {(
 *   eventName: string,
 *   listener: (...args: unknown[]) => void
 * ) => ResponseEmitter} once
 * @property {(eventName: string, ...args: unknown[]) => boolean} emit
 */
/**
 * Creates an instance of `Response`.
 *
 * This class is used as a mock when testing Passport strategies, substituted in
 * place of of a Node's `http.ServerResponse`.
 *
 * @class
 * @access protected
 */
declare class Response extends Response_base {
    statusCode: number;
    _headers: {};
    /**
     *
     * @returns {void}
     */
    end(): void;
}
