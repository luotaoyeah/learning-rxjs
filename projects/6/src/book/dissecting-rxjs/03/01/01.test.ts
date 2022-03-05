import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';

describe('src/book/dissecting-rxjs/03/01/01.ts', () => {
  // array 中的 `filter()` 和 `map()` 方法
  it('should work 01', () => {
    const arr01 = [1, 2, 3, 4, 5, 6, 7, 8, 9];
    const result = arr01.filter((i) => i % 2 === 0).map((i) => i * 2);
    expect(JSON.stringify(result)).toEqual(JSON.stringify([4, 8, 12, 16]));
  });

  // observable 中的 `filter()` 和 `map()` 操作符
  it('should work 02', () => {
    const source$ = new Observable<number>((observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);
      observer.next(4);
      observer.next(5);
      observer.next(6);
      observer.next(7);
      observer.next(8);
      observer.next(9);
    });

    const result: Array<number> = [];

    source$
      .pipe(
        filter<number>((i) => i % 2 === 0),
        map<number, number>((i) => i * 2),
      )
      .subscribe({
        next: (value) => {
          result.push(value);
        },
      });

    expect(JSON.stringify(result)).toEqual(JSON.stringify([4, 8, 12, 16]));
  });
});
