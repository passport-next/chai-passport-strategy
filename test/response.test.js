/* eslint-disable no-shadow -- Bootstrap */
import Response from '../lib/response.js';
import {expect} from './bootstrap/node.js';

describe('Response', function () {
  it('should be constructed with default properties', function () {
    const res = new Response();

    expect(res.statusCode).to.equal(200);
    expect(res._headers).to.deep.equal({});
  });

  it('should set headers case-insensitively', function () {
    const res = new Response();

    res.setHeader('Content-Type', 'application/json');

    expect(res._headers).to.deep.equal({'content-type': 'application/json'});
  });
});
