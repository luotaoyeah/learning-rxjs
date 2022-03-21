import { range, reduce } from 'rxjs';
import { log } from '../../util';

describe('reduce', () => {
    it('01', (cb) => {
        const source$ = range(1, 100);

        source$.pipe(reduce((acc, value) => acc + value)).subscribe({
            next: (value) => {
                log(value);
            },
            complete: () => cb(),
        });
    });
});
