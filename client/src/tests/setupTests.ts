// src/tests/setupTests.ts

import '@testing-library/jest-dom';

// Polyfill for matchMedia
globalThis.matchMedia =
  globalThis.matchMedia ||
  function () {
    return {
      matches: false,
      addListener: function () {},
      removeListener: function () {},
    };
  };

// Polyfill for getComputedStyle
Object.defineProperty(window, 'getComputedStyle', {
  value: () => ({
    getPropertyValue: (prop: any) => {
      return '';
    },
  }),
});
