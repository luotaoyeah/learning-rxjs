import { double01, double02, double03 } from './01';

describe('src/book/dissecting-rxjs/01/02/01/01.ts', () => {
  it('should work', () => {
    const arr01 = [1, 2, 3];

    expect(JSON.stringify(double01(arr01))).toBe(JSON.stringify([2, 4, 6]));
    expect(JSON.stringify(double02(arr01))).toBe(JSON.stringify([2, 4, 6]));
    expect(JSON.stringify(double03(arr01))).toBe(JSON.stringify([2, 4, 6]));
  });
});
