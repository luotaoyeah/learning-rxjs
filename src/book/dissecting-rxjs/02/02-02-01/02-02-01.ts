import chalk from "chalk";
import { Observable, of } from "rxjs";

/*
 * 2.2.1 观察者模式（observer pattern）
 */
console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  /*
   * RxJS 中最重要的两个概念：
   *     Observable（被观察的）
   *     Observer（在观察的）
   *
   * RsJS 中的数据流，指的就是 Observable 对象
   *
   * Observable 实现了两种设计模式：
   *     观察者模式（Observer Pattern）
   *     迭代器模式（Iterator Pattern）
   *
   * 观察者模式，包含两个对象：
   *     publisher
   *         Observable 对象就是其中的 publisher，它负责产生事件，推送数据
   *     observer
   *         Observer 对象就是其中的 observer，它负责订阅事件，处理数据
   */
}

console.log(
  chalk.green("\n-------------------------------------------------- 01"),
);
{
  /*
   * 如下，observable01 对象就是一个 publisher，
   * console.log() 函数就是一个 observer，
   * 通过 Observable.subscribe() 方法实现订阅
   */
  const observable01: Observable<number> = of(1, 2, 3);
  observable01.subscribe(console.log);
}
