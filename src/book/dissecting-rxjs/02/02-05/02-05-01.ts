import chalk from "chalk";
import { Observable, Subscriber } from "rxjs";
import { map } from "rxjs/operators";

/*
 * 2.5 操作符简介
 */
function fn01() {
  console.log(
    chalk.red("\n-------------------------------------------------- 02"),
  );
  {
    /*
     * 通常一个 observable 并不会直接被某个 observer 订阅,
     * 而是会在中间经过一个管道(pipe), 对数据流进行处理, 并最终推送给 observer,
     * 中间的这个 pipe 就是由各种 operator 组成的,
     * 通常, 一个 operator 接收一个上游的 observable, 并产生一个新的给下游的 observable,
     * 因此, 多个 operator 可以链接起来, 随意组合
     */

    const observable: Observable<number> = new Observable<number>(
      (subscriber: Subscriber<number>) => {
        subscriber.next(1);
        subscriber.next(2);
        subscriber.next(3);
        subscriber.complete();
      },
    );

    /*
     * 如下, map() 就是一个 operator,
     * 每个 operator 都是一个 function, 它们返回的是一个 OperatorFunction
     */
    observable
      .pipe(map((value: number) => value * value))
      .subscribe((value: number) => {
        console.log(chalk.red(value.toString()));
      });
  }
}

export { fn01 };
