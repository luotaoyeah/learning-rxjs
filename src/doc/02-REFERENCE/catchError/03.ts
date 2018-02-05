/*
 * API
 *     catchError
 */

import chalk from "chalk";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs/operators";

console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  /*
   * 在捕获到错误之后，catchError 可以直接返回抛出错误的这个 source observable，
   * 进行再次尝试
   */

  of<number, number, number, number, number>(1, 2, 3, 4, 5)
    .pipe(
      map<number, number>((value: number) => {
        if (value % 4 === 0) {
          throw new Error("FOUR");
        }

        return value;
      }),
      catchError((e: Error, caught: Observable<number>) => {
        /*
         * catchError() 的参数是一个函数，它的第二个参数就是抛出错误的 source observable
         */
        return caught;
      }),
    )
    .subscribe((value: number) => {
      console.log(chalk.red(value.toString()));
    });
}
