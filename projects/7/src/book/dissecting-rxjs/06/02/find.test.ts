import { find, of, tap } from 'rxjs';
import { log } from '../../util';

describe('find', () => {
    /**
     * 如果找不到, 则返回 undefined.
     */
    it('01', (cb) => {
        of(3, 1, 4, 1, 5, 9)
            .pipe(
                tap((value) => log(`上游:${value}`)),
                find((value, index, source$) => value % 2 === 0),
            )
            .subscribe({
                next: (value) => log(value),
                complete: () => cb(),
            });
    });
});
