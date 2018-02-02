import chalk from "chalk";
import { Observable, Subscriber } from "rxjs";

/*
 * 2.2.3 创造 Observable
 */
console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  /*
   * 使用 Observable constructor 创建一个 observable 对象
   */
  const source$: Observable<number> = new Observable(
    (subscriber: Subscriber<number>) => {
      subscriber.next(1);
      subscriber.next(2);
      subscriber.next(3);

      subscriber.complete();
    },
  );

  /*
   * 通过 Observable.subscribe() 方法，注册一个 observer，
   * observer 有两种形式，一种是一个 PartialObserver 对象，如下：
   */
  source$.subscribe({
    next: (value: number) => {
      console.log(chalk.white(value.toString()));
    },
  });

  /*
   * 也可以直接将三个函数（next，error，complete）作为 subscribe() 的参数
   */
  source$.subscribe((value: number) => {
    console.log(chalk.red(String(value)));
  });
}
