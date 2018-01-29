/*
 * Overview
 *     Subject
 *         Multicasted Observables
 */

import chalk from "chalk";
import { ConnectableObservable, from, Observable, Subject } from "rxjs";
import { multicast } from "rxjs/operators";

console.log(
  chalk.red("\n-------------------------------------------------- 01")
);
{
  /*
   * TODO
   */

  const sourceObservable: Observable<number> = from<Array<number>>([
    11,
    22,
    33
  ]);
  const subject: Subject<number> = new Subject<number>();

  const connectableObservable: ConnectableObservable<
    number
  > = sourceObservable.pipe<number>(
    multicast(subject)
  ) as ConnectableObservable<number>;

  connectableObservable.subscribe((value: number) => {
    console.log(chalk.red(value.toString()));
  });

  connectableObservable.subscribe((value: number) => {
    console.log(chalk.yellow(value.toString()));
  });

  connectableObservable.connect();
}
