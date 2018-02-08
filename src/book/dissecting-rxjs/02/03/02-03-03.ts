import chalk from "chalk";
import { Observable, Subscriber, Subscription } from "rxjs";

/*
 * 2.3 退订 Observer
 */
console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  const observable = new Observable((subscriber: Subscriber<number>) => {
    let n = 0;

    const timer = setInterval(() => {
      const value = ++n;
      console.log(chalk.white(String(value)));
      subscriber.next(value);
    }, 1000);

    /*
     * 在 Observable 的构造函数参数(subscribe 函数)中, 除了可以返回一个 function,
     * 也可以返回一个 object, 这个 object 需要有一个 unsubscribe() 方法
     */
    return {
      unsubscribe(): void {
        clearInterval(timer);
        console.log(chalk.blue("DISPOSING"));
      },
    };
  });

  const subscription: Subscription = observable.subscribe((value: number) => {
    console.log(chalk.yellow(String(value)));
  });

  setTimeout(() => {
    subscription.unsubscribe();
  }, 3999);
}
