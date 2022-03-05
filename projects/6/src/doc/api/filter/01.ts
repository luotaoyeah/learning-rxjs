/*
 * API
 *     filter
 */

import chalk from 'chalk';
import { from } from 'rxjs';
import { filter } from 'rxjs/operators';

console.log(chalk.red('\n-------------------------------------------------- 01'));
{
  /*
   * 类似于 Array.prototype.filter() 方法，对 source observable 的数据进行过滤，
   * 只推送满足过滤条件的数据
   */

  const observable = from<Array<number>>([1, 2, 3, 4, 5, 6, 7, 8, 9]);

  observable.pipe<number>(filter<number>((value: number) => value % 2 === 0)).subscribe((value: number) => {
    console.log(chalk.red(value.toString()));
  });
}
