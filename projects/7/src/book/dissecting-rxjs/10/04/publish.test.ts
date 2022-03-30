import { interval, publish, refCount, tap } from 'rxjs';
import { log } from '../../util';

describe('publish', () => {
    /**
     * publish() 等于 multicast(new Subject())
     */
    it('01', (cb) => {
        const cold$ = interval(1000);

        const observable = cold$.pipe(
            tap({
                subscribe: () => log('SUBSCRIBE'),
                next: (value) => log(`-----| ${value}`),
            }),
            publish(),
            refCount(),
        );

        observable.subscribe({ next: (value) => log(`---------------| ${value}`) });

        setTimeout(() => {
            observable.subscribe({ next: (value) => log(`-------------------------| ${value}`) });
        }, 3000);

        setTimeout(() => cb(), 1000 * 10);
    });
});
