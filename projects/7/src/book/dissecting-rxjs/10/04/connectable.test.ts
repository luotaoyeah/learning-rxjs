import { Connectable, connectable, interval, Subject } from 'rxjs';
import { log } from '../../util';

describe('connectable', () => {
    /**
     * multicast 已经废弃, 可以使用 connectable.
     */
    it('01', (cb) => {
        const cold$ = interval(1000);

        const connectableObservable: Connectable<number> = connectable(cold$, { connector: () => new Subject() });

        connectableObservable.subscribe({ next: (value) => log(`-----| ${value}`) });

        setTimeout(() => {
            connectableObservable.subscribe({ next: (value) => log(`---------------| ${value}`) });
        }, 3000);

        setTimeout(() => cb(), 10000);

        const subscription = connectableObservable.connect();
    });
});
