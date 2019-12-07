import { from } from 'rxjs';

// 不支持测试 promise: https://github.com/ReactiveX/rxjs/issues/701
describe('src/book/dissecting-rxjs/04/03/03/01.ts', () => {
  // from() 将一个 promise 转化为一个 observable,
  // 如果 promise resolve, 则吐出数据并 complete(),
  // 如果 promise reject,  则 error()
  it('should work', async () => {
    const actual: Array<number> = [];

    from(Promise.resolve(1)).subscribe({
      next: (value) => {
        actual.push(value);

        from(Promise.reject(2)).subscribe({
          error: (e) => {
            actual.push(e);

            expect(JSON.stringify(actual)).toEqual(JSON.stringify([1, 2]));
          },
        });
      },
    });
  });
});
