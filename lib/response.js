/* eslint-disable no-shadow -- The desired name */
/* eslint-disable unicorn/prefer-event-target -- API */
import {EventEmitter} from 'node:events';

/**
 * Creates an instance of `Response`.
 *
 * This class is used as a mock when testing Passport strategies, substituted in
 * place of of a Node's `http.ServerResponse`.
 *
 * @class
 * @access protected
 */
class Response extends EventEmitter {
  /**
   *
   */
  constructor () {
    super();

    this.statusCode = 200;
    this._headers = {};
  }

  /**
   *
   * @returns {void}
   */
  end (/* data, encoding */) {
    this.emit('finish');
  }
}

/**
 * Expose `Response`.
 */
export default Response;
