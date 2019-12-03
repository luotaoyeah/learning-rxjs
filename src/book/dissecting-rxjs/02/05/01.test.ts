import { source$ } from './01';
import { map } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/02/05/01.ts', () => {
  it('should work', () => {
    // 数据在从 observable 到达 observer 之间, 可以经过多个 operator 的处理,
    // operator 是一种特殊的 function, 它接收一个 observable 对象, 返回一个新的 observable 对象

    const actual: Array<number> = [];

    source$.pipe(map<number, number>((value) => value * 2)).subscribe({
      next: (value: number) => {
        actual.push(value);
      },
    });

    expect(JSON.stringify(actual)).toEqual(JSON.stringify([2, 4, 6]));
  });
});
