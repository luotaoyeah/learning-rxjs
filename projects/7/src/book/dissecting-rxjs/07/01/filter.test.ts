import { filter, interval } from 'rxjs';
import { log } from '../../util';

describe('filter', () => {
    it('01', (cb) => {
        interval(1000)
            .pipe(filter((value) => value % 2 === 0))
            .subscribe({
                next: (value) => log(value),
                complete: () => cb(),
            });
    });
});
