/*
 * Overview
 *     Observable
 *         Observables as Generalizations Of Functions
 */

import chalk from "chalk";
import { Observable, Subscriber } from "rxjs";

console.log("\n-------------------------------------------------- 01");
{
  /*
   * 有一种误解，认为 observable 类似于 EventEmitter，或者类似于有多个值的 promise，实际上这两种看法都是不正确的，
   * 从某种程度上来说，observable 更加类似于一个 function
   */

  function foo() {
    console.log(chalk.red("foo"));
    return 9;
  }

  const x = foo.call(null);
  console.log(chalk.red(`${x}`));

  const y = foo.call(null);
  console.log(chalk.red(`${y}`));
}

console.log("\n-------------------------------------------------- 02");
{
  /*
   * observable 和 function 一样，都是 lazy-evaluated 的，
   * 对于 function 来说，只有被调用之后（调用 call() 方法），才会执行里面的逻辑，并返回数据，
   * 多次调用该 function，是相互独立的
   *
   * 对于 observable 来说，只有被订阅之后（调用 subscribe() 方法），才会执行里面的逻辑，并返回数据，
   * 多次订阅该 observable，是相互独立的
   *
   * 而对于 EventEmitter 来说，它不是 lazy-evaluated 的，而是 eager-executed 的，
   * 即不管是否添加了监听函数，在需要的时候 EventEmitter 都会 emit() 出某个事件
   */

  const observable = new Observable((subscriber: Subscriber<number>) => {
    console.log(chalk.yellow("foo"));
    subscriber.next(9);
  });

  observable.subscribe((x: number) => {
    console.log(chalk.yellow(`${x}`));
  });

  observable.subscribe((y: number) => {
    console.log(chalk.yellow(`${y}`));
  });
}
