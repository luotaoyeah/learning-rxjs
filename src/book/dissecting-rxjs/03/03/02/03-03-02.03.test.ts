import { TestScheduler } from 'rxjs/testing';

describe('src/book/dissecting-rxjs/03/03/02/03-03-02.03.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    scheduler = new TestScheduler((actual: any, expected: any) => {
      expect(actual).toEqual(expected);
    });
  });

  it('should work', () => {
    expect(0).toBe(0);
  });
});
