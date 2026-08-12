// eslint-disable-next-line no-shadow -- Bootstrap
import {chai, expect} from './bootstrap/node.js';
import {readFile} from 'node:fs/promises';

describe('chai-passport-strategy', function () {
  it('should add passport helper to chai', function () {
    expect(chai.passport).to.be.an('object');
    expect(chai.passport.use).to.be.a('function');
  });

  it('should not expose Node types in declarations', async function () {
    const declaration = await readFile(
      new URL('../dist/response.d.ts', import.meta.url),
      'utf8'
    );

    expect(declaration).not.to.include("from 'node:events'");
  });
});
