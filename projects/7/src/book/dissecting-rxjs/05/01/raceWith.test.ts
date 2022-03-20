import { map, raceWith, take, timer } from 'rxjs';
import { log } from '../../util';

describe('race', () => {
    it('01', (cb) => {
        const source01$ = timer(500, 1000).pipe(map((i) => `A_${i}`));
        const source02$ = timer(0, 2000).pipe(map((i) => `B_${i}`));

        source01$.pipe(raceWith(source02$), take(9)).subscribe({
            next: (value) => {
                log(value);
            },
            complete: () => cb(),
        });
    });
});
