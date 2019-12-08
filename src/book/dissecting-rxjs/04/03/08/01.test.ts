import { TestScheduler } from 'rxjs/testing';
import { defer, of } from 'rxjs';

describe('src/book/dissecting-rxjs/04/03/08/01.ts', () => {
  let scheduler: TestScheduler;

  beforeEach(() => {
    scheduler = new TestScheduler((actual, expected) => {
      expect(actual).toEqual(expected);
    });
  });

  // defer() 用来延迟创建 observable,
  // defer() 返回一个 observable, 记为 source01$,
  // defer() 接受一个工厂方法, 工厂方法返回一个 observable, 记为 source02$,
  // 每当 source01$ 被 subscribe 时, 就会调用工厂方法返回一个新的 source02$, 然后把 source01$ 代理到 source02$ 上去,
  it('should work', () => {
    let flag: boolean = true;

    const source01$ = defer(() => {
      console.log('OBSERVABLE FACTORY');
      return flag ? of(1, 2, 3) : of('a', 'b', 'c');
    });

    scheduler.run(({ expectObservable }) => {
      expectObservable(source01$).toBe('(abc|)', { a: 1, b: 2, c: 3 });
    });

    scheduler.run(({ expectObservable }) => {
      flag = false;
      expectObservable(source01$).toBe('(abc|)', { a: 'a', b: 'b', c: 'c' });
    });
  });
});
