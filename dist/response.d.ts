export default Response;
export type ResponseEmitter = {
    once: (eventName: string, listener: (...args: unknown[]) => void) => ResponseEmitter;
    emit: (eventName: string, ...args: unknown[]) => boolean;
};
declare const Response_base: new () => ResponseEmitter;
/**
 * @import {
 *   ConnectResponse,
 *   ResponseHeaderValue
 * } from '@passport-next/http-types'
 */
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
 * @implements {ConnectResponse}
 */
declare class Response extends Response_base implements ConnectResponse {
    statusCode: number;
    /** @type {Record<string, ResponseHeaderValue>} */
    _headers: Record<string, ResponseHeaderValue>;
    /**
     * @param {string} name
     * @param {ResponseHeaderValue} value
     * @returns {void}
     */
    setHeader(name: string, value: ResponseHeaderValue): void;
    /**
     *
     * @returns {void}
     */
    end(): void;
}
import type { ConnectResponse } from '@passport-next/http-types';
import type { ResponseHeaderValue } from '@passport-next/http-types';
