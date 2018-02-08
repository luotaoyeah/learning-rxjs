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
     * 在 Observable 的构造函数参数(subscribe 函数)中, 可以返回一个 function,
     * 当调用 Subscription.unsubscribe() 方法时, 这个返回的 function 就会执行,
     * 可以在这个 function 中释放资源
     */
    return () => {
      clearInterval(timer);
      console.log(chalk.green("DISPOSING"));
    };
  });

  const subscription: Subscription = observable.subscribe((value: number) => {
    console.log(chalk.yellow(String(value)));
  });

  setTimeout(() => {
    subscription.unsubscribe();
  }, 3999);
}
