import { every, interval, of, tap } from 'rxjs';
import { log } from '../../util';

describe('every', () => {
    it('01', (cb) => {
        of(3, 1, 4, 1, 5, 9)
            .pipe(
                tap((value) => log(`上游:${value}`)),
                every((value, index, source$) => value > 0),
            )
            .subscribe({
                next: (value) => {
                    log(value);
                },
                complete: () => cb(),
            });
    });

    it('02', (cb) => {
        interval(1000)
            .pipe(
                tap((value) => log(`上游:${value}`)),
                every((value, index, source$) => value < 3),
            )
            .subscribe({
                next: (value) => {
                    log(value);
                },
                complete: () => cb(),
            });
    });
});
