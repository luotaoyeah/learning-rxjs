import { TestScheduler } from 'rxjs/testing';
import { interval, partition } from 'rxjs';
import { take } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/08/05/01/02.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // partition() 将上游拆分为两个 observable, 然后将这两个 observable 放在一个数组中返回: [ observable01, observable02 ],
  // 第一个 observable 存放满足条件的数据, 第二个 observable 存放不满足条件的数据
  it('should work', () => {
    scheduler.run(({ expectObservable }) => {
      const source$ = interval(100).pipe(take(6));

      const [observable01$, observable02$] = partition(source$, (i) => i % 2 === 0);

      expectObservable(observable01$).toBe('100ms a 199ms b 199ms c 99ms |', {
        a: 0,
        b: 2,
        c: 4,
      });

      expectObservable(observable02$).toBe('200ms a 199ms b 199ms (c|)', {
        a: 1,
        b: 3,
        c: 5,
      });
    });
  });
});
