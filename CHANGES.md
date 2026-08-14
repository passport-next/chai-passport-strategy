# Changes for chai-passport-strategy

## 3.2.0

- chore: update passport-strategy

## 3.1.0

- feat: request() callbacks and action callback this values now receive the extended request type
- feat: added augmentation mechanism
- feat: exported Request and RequestExtensions
- test: added consumer-style tests covering both callback forms

## 3.0.0
BREAKING CHANGE:
  - Types reflect new `passport-strategy`

- feat: throw if fail occurs and `fail()` is not called
- feat: adjusts types

## 2.3.0

- chore: use updated types

## 2.2.0

- feat: add `setHeader`
- chore: use http-types and passport-types

## 2.1.3

- fix(types): avoid Node type export issue

## 2.1.2

- fix(types): export @types/node as dependency

## 2.1.1

- docs: clarify README usage

## 2.1.0

- feat: accept explicit strategy name

## 2.0.0

BREAKING CHANGE:
- Require Node ^22.22.2 || >=24.15.0
- native ESM only

- feat: native ESM only and typescript
- refactor: ES6 classes
- chore: update devDeps
- chore: switch to pnpm
- chore: switch to eslint
- chore: drop Makefile and old CHANGELOG

## 1.1.0

- Initial version of fork
