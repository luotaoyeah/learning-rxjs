import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import chalk from 'chalk';

const observable = interval(1000).pipe(take(3));

observable.subscribe((value) => {
  console.log(chalk.greenBright('订阅者 01'), value);
});

const subscription = observable.subscribe((value) => {
  console.log(chalk.yellowBright('订阅者 02'), value);
});
setTimeout(() => {
  subscription.unsubscribe();
}, 1500);

observable.subscribe((value) => {
  console.log(chalk.redBright('订阅者 03'), value);
});
