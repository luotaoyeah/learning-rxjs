import { findIndex, of, tap } from 'rxjs';
import { log } from '../../util';

describe('findIndex', () => {
    it('01', (cb) => {
        of(3, 1, 4, 1, 5, 9)
            .pipe(
                tap((value) => log(`上游:${value}`)),
                findIndex((value, index, source$) => value % 2 === 0),
            )
            .subscribe({
                next: (value) => log(value),
                complete: () => cb(),
            });
    });
});
