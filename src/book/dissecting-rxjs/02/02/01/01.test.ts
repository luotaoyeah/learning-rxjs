import { Observable, of } from 'rxjs';

describe('src/book/dissecting-rxjs/02/02/01/01.ts', () => {
  it('should work', () => {
    /*
     * 如下，publisher 对象就是一个 publisher，
     * console.log() 函数就是一个 observer，
     * 通过 Observable.subscribe() 方法实现订阅
     */

    const actual: Array<number> = [];

    const publisher: Observable<number> = of(1, 2, 3);
    const observer = (v: number) => {
      actual.push(v);
    };
    publisher.subscribe(observer);

    expect(JSON.stringify(actual)).toBe(JSON.stringify([1, 2, 3]));
  });
});
