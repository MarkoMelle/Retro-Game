import { expect } from '@jest/globals';

function toBeAllowedType(char, allowedTypes) {
  const checkChar = () => {
    let result = false;
    for (let i = 0; i < allowedTypes.length; i++) {
      if (char instanceof allowedTypes[i]) {
        result = true;
        break
      }
    }
    return result;
  }
  const pass = checkChar()
  if (pass) {
    return {
      message: () =>
        `expected ${this.utils.printReceived(
          char,
        )} not to be within allowedTypes ${this.utils.printExpected(
          `${allowedTypes}`,
        )}`,
      pass: true,
    };
  } else {
    return {
      message: () =>
        `expected ${this.utils.printReceived(
          char,
        )} to be within allowedTypes ${this.utils.printExpected(
          `${allowedTypes}`,
        )}`,
      pass: false,
    };
  }
}

expect.extend({
  toBeAllowedType,
});