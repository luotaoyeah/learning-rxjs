import { concatAll, interval, map, take } from 'rxjs';
import { log } from '../../util';

describe('concatAll', () => {
    it('01', (cb) => {
        const ho$ = interval(1000).pipe(
            take(2),
            map((i) =>
                interval(1500).pipe(
                    take(2),
                    map((j) => `${i}:${j}`),
                ),
            ),
        );

        ho$.pipe(concatAll()).subscribe({
            next: (value) => {
                log(value);
            },
            complete: () => cb(),
        });
    });
});
