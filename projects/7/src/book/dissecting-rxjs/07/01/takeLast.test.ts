import { interval, take, takeLast, tap } from 'rxjs';
import { log } from '../../util';

describe('takeLast', () => {
    it('01', (cb) => {
        interval(1000)
            .pipe(
                take(5),
                tap((value) => log('take:' + value)),
                takeLast(3),
                tap((value) => log('takeLast:' + value)),
            )
            .subscribe({ complete: () => cb() });
    });
});
