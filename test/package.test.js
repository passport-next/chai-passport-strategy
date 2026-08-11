// eslint-disable-next-line no-shadow -- Bootstrap
import {chai, expect} from './bootstrap/node.js';

describe('chai-passport-strategy', function () {
  it('should add passport helper to chai', function () {
    expect(chai.passport).to.be.an('object');
    expect(chai.passport.use).to.be.a('function');
  });
});
