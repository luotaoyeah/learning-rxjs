/*
 * API
 *     catchError
 */

import chalk from "chalk";
import { of } from "rxjs";
import { catchError, map } from "rxjs/operators";

console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  /*
   * catchError 里面可以重新抛出一个新的 Error
   */

  of(1, 2, 3, 4, 5)
    .pipe(
      map((i: number) => {
        if (i % 4 === 0) {
          throw new Error("FOUR");
        }

        return i;
      }),
      catchError((e: Error) => {
        throw new Error(`CAUGHT: ${e.message}`);
      }),
    )
    .subscribe((value: number) => {
      console.log(chalk.red(value.toString()));
    });
}
