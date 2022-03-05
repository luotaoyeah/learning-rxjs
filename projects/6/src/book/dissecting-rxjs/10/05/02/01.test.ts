import { interval } from 'rxjs';
import { publishReplay, refCount, take, tap } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/10/05/02/01.ts', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  // 如果 multicast() 接收一个 subject 对象,
  // 由于 subject 不可重用, 在 subject 完结之后再添加新的 observer, 则新的 observer 不会收到数据推送,
  //
  // 如果 multicast() 接收一个 subject factory 方法
  // 在 subject 完结之后再添加新的 observer, 会使用 factory 创建一个新的 subject, 然后重新订阅上游, 新的 observer 可以收到数据推送,
  //
  // 如果使用 publishReplay(), 则在 subject 完结之后再添加新的 observer, 新的 observer 可以收到数据推送,
  // publishReplay() 会对上游的数据进行缓存, 当添加新的 observer 时, 就可以进行重播, 不用再去订阅上游
  it('should work', () => {
    const actual01: Array<number> = [];
    const actual02: Array<number> = [];

    const source$ = interval(1000).pipe(
      take(3),
      tap((value) => {
        console.log('1', value);
      }),
    );

    const observable$ = source$.pipe(publishReplay(), refCount());

    observable$.subscribe({
      next: (value) => {
        actual01.push(value);
      },
    });

    setTimeout(() => {
      observable$.subscribe({
        next: (value) => {
          actual02.push(value);
        },
      });
    }, 5000);

    jest.advanceTimersByTime(1000 * 10);

    expect(actual01).toEqual([0, 1, 2]);
    expect(actual02).toEqual([0, 1, 2]);
  });

  // 可以通过参数指定缓存多少个上游的数据, 默认是全部数据
  it('should work 02', () => {
    const actual01: Array<number> = [];
    const actual02: Array<number> = [];

    const source$ = interval(1000).pipe(
      take(3),
      tap((value) => {
        console.log('2', value);
      }),
    );

    const observable$ = source$.pipe(publishReplay(2), refCount());

    observable$.subscribe({
      next: (value) => {
        actual01.push(value);
      },
    });

    setTimeout(() => {
      observable$.subscribe({
        next: (value) => {
          actual02.push(value);
        },
      });
    }, 5000);

    jest.advanceTimersByTime(1000 * 10);

    expect(actual01).toEqual([0, 1, 2]);
    expect(actual02).toEqual([1, 2]);
  });
});
