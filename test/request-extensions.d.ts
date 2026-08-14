import '@passport-next/chai-passport-strategy/request-extensions';

declare module '@passport-next/chai-passport-strategy/request-extensions' {
  interface RequestExtensions {
    marker?: string;
  }
}