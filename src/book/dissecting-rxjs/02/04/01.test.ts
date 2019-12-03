import { source$ } from './01';

describe('src/book/dissecting-rxjs/02/04/01.ts', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('should work', () => {
    const actual01: Array<number> = [];
    const actual02: Array<number> = [];

    source$.subscribe((value: number) => {
      actual01.push(value);
    });

    setTimeout(() => {
      source$.subscribe((value: number) => {
        actual02.push(value);
      });
    }, 2000);

    jest.advanceTimersByTime(5000);

    expect(JSON.stringify(actual01)).toEqual(JSON.stringify([1, 2, 3, 4, 5]));
    expect(JSON.stringify(actual02)).toEqual(JSON.stringify([1, 2, 3]));
  });
});
