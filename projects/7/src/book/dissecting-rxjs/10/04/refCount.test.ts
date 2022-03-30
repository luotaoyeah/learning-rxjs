import { interval, multicast, refCount, Subject, tap } from 'rxjs';
import { log } from '../../util';

describe('refCount', () => {
    /**
     * 除了 ConnectableObservable.refCount() 方法, 我们还可以使用 refCount 操作符.
     */
    it('01', (cb) => {
        const cold$ = interval(1000);

        const observable = cold$.pipe(
            tap({
                subscribe: () => log('SUBSCRIBE'),
                next: (value) => log(`-----| ${value}`),
            }),
            multicast<string>(new Subject()),
            refCount(),
        );

        observable.subscribe({ next: (value) => log(`---------------| ${value}`) });

        setTimeout(() => {
            observable.subscribe({ next: (value) => log(`-------------------------| ${value}`) });
        }, 3000);

        setTimeout(() => cb(), 1000 * 10);
    });
});
