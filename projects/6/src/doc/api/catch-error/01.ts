/*
 * API
 *     catchError
 */

import chalk from 'chalk';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

console.log(chalk.red('\n-------------------------------------------------- 01'));
{
  /*
   * catchError 用来捕获并处理 observable 中抛出来的错误
   */

  /*
   * 如下，默认情况下没有处理错误，
   * 如果 observable 中抛出了错误，程序会直接终止运行
   */
  of(1, 2, 3, 4, 5)
    .pipe(
      map((i: number) => {
        if (i % 4 === 0) {
          throw new Error('FOUR');
        }

        return i;
      }),
    )
    .subscribe((value: number) => {
      console.log(chalk.red(value.toString()));
    });
}
