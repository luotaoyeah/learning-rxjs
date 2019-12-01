import { impureFn01, pureFn01 } from './02';

describe('src/book/dissecting-rxjs/01/02/01/02.ts', () => {
  it('should work 01', () => {
    const arr01 = [1, 2, 3];
    const arr02 = impureFn01(arr01, 4);

    expect(JSON.stringify(arr01)).toBe(JSON.stringify([1, 2, 3, 4]));
    expect(JSON.stringify(arr02)).toBe(JSON.stringify([1, 2, 3, 4]));
  });

  it('should work 02', () => {
    const arr01 = [1, 2, 3];
    const arr02 = pureFn01(arr01, 4);

    expect(JSON.stringify(arr01)).toBe(JSON.stringify([1, 2, 3]));
    expect(JSON.stringify(arr02)).toBe(JSON.stringify([1, 2, 3, 4]));
  });
});
