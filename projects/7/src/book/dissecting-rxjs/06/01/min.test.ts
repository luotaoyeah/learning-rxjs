import { min, of } from 'rxjs';
import { log } from '../../util';

describe('min', () => {
    it('01', (cb) => {
        const source$ = of({ name: 'RxJS', year: 2011 }, { name: 'React', year: 2013 }, { name: 'Redux', year: 2015 });

        source$.pipe(min((x, y) => x.year - y.year)).subscribe({
            next: (value) => {
                log(value);
            },
            complete: () => cb(),
        });
    });
});
