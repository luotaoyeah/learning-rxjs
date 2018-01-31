/*
 * API
 *     catchError
 */

import chalk from "chalk";
import { from, Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

console.log(
  chalk.red("\n-------------------------------------------------- 01")
);
{
  /*
   * 在捕获到错误之后，catchError 可以返回一个新的 observable
   */

  of(1, 2, 3, 4, 5)
    .pipe<number, number>(
      map<number, number>((i: number) => {
        if (i % 4 === 0) {
          throw new Error("FOUR");
        }

        return i;
      }),
      catchError<number, Observable<number>>((e: Error) => {
        return from([40]);
      })
    )
    .subscribe((value: number) => {
      console.log(chalk.red(value.toString()));
    });
}
