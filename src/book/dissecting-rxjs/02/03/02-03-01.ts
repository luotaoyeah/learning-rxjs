import chalk from "chalk";
import { Observable, Subscriber, Subscription } from "rxjs";

/*
 * 2.3 退订 Observer
 */
console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  const observable01: Observable<number> = new Observable(
    (subscriber: Subscriber<number>) => {
      let n = 0;
      setInterval(() => {
        const value = ++n;
        console.log(chalk.white(String(value)));
        subscriber.next(value);
      }, 1000);
    },
  );

  /*
   * Observable.subscribe() 方法返回一个 Subscription 对象,
   * 调用 Subscription.unsubscribe() 方法, 可以取消订阅
   */
  const subscription: Subscription = observable01.subscribe((value: number) => {
    console.log(chalk.yellow(String(value)));
  });

  setTimeout(() => {
    subscription.unsubscribe();
  }, 3999);
}
