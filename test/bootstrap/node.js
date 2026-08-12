import * as chaiModule from 'chai';
import chaiPassportStrategy from '../../lib/index.js';

export const chai = /** @type {ReturnType<typeof chaiPassportStrategy>} */ (
  chaiModule.use(chaiPassportStrategy)
);

// eslint-disable-next-line no-shadow, prefer-destructuring -- Bootstrapping
export const expect = chai.expect;
