import { interval, map, mergeAll, take } from 'rxjs';
import { log } from '../../util';

describe('mergeAll', () => {
    it('01', (cb) => {
        const ho$ = interval(1000).pipe(
            take(2),
            map((i) =>
                interval(2000).pipe(
                    take(2),
                    map((j) => `${i}:${j}`),
                ),
            ),
        );

        ho$.pipe(mergeAll()).subscribe({
            next: (value) => {
                log(value);
            },
            complete: () => cb(),
        });
    });
});
