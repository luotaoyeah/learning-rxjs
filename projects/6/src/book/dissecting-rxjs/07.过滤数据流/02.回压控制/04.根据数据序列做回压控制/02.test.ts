import { of } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

// ----------------------------------------------------------------------------------------------------
// distinctUntilChanged()
// ----------------------------------------------------------------------------------------------------
describe('src/book/dissecting-rxjs/07.过滤数据流/02.回压控制/04.根据数据序列做回压控制/02.test.ts', () => {
  // ----------------------------------------------------------------------------------------------------
  // 如果该数据跟上一个数据相同, 则该数据会被丢弃,
  // 默认使用 === 判断相等性
  // ----------------------------------------------------------------------------------------------------
  it('01', () => {
    of(1, 1, '1', '1')
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        console.log(`[${typeof value}] ${value}`);
      });
  });

  // ----------------------------------------------------------------------------------------------------
  // 可以自定义比较方式
  // ----------------------------------------------------------------------------------------------------
  it('02', () => {
    of(1, 1, '1', '1')
      .pipe(distinctUntilChanged((x, y) => x == y))
      .subscribe((value) => {
        console.log(`[${typeof value}] ${value}`);
      });
  });
});
