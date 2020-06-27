import { interval } from 'rxjs';
import { take } from 'rxjs/operators';
import chalk from 'chalk';

// complete
const observable = interval(1000).pipe(take(3));

observable.subscribe({
  next: (value) => {
    console.log(chalk.greenBright('订阅者 01'), value);
  },
  complete: () => {
    console.log('COMPLETE');
  },
});
