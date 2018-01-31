/*
 * API
 *     take
 */

import chalk from "chalk";
import { interval } from "rxjs";
import { take } from "rxjs/operators";

console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  /*
   * take 表示从 source observable 中截取开始的 n 个数据，
   * 如果 source observable 中的数据少于 n 个，则全部截取
   */

  interval(1000)
    .pipe(take<number>(5))
    .subscribe((value: number) => {
      console.log(chalk.red(value.toString()));
    });
}
