/*
 * API
 *     tap
 */

import chalk from "chalk";
import { interval } from "rxjs";
import { map, tap } from "rxjs/operators";

console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  /*
   * tap() 用来监视+拦截 source observable 的数据，然后执行一些 side effect 操作，
   * 但是最终返回的还是 source observable
   */

  interval(1000)
    .pipe(
      tap({
        next(value: number) {
          console.log(chalk.yellow(`TAP ${value}`));
        },
      }),
      map((value: number) => value * 2),
    )
    .subscribe((value: number) => {
      console.log(chalk.red(value.toString()));
    });
}
