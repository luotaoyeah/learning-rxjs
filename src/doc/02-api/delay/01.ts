/*
 * API
 *     delay
 */

import chalk from "chalk";
import { interval } from "rxjs";
import { delay } from "rxjs/operators";

console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  /*
   * 将 source observable 的数据推送延迟 n 毫秒
   */

  interval(1000)
    .pipe(delay<number>(3000))
    .subscribe((value: number) => {
      console.log(chalk.red(value.toString()));
    });
}
