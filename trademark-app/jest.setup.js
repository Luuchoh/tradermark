// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom";

// Suppress ReactDOMTestUtils.act deprecation warnings
const originalError = console.error;
beforeAll(() => {
  console.error = (...args) => {
    if (/ReactDOMTestUtils.act/.test(args[0])) {
      return;
    }
    originalError.call(console, ...args);
  };
});

afterAll(() => {
  console.error = originalError;
});