import { ConnectableObservable, interval, multicast, Subject, tap } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('multicast', () => {
    /**
     * multicast() 返回一个 ConnectableObservable,
     * 当我们调用 ConnectableObservable.connect() 方法时, multicast 才会去订阅上游的冷流,
     * 一般我们在添加完订阅者之后, 再掉用 connect() 方法, 避免数据丢失.
     */
    it('01', (cb) => {
        const cold$ = interval(1000);

        const observable = cold$.pipe(
            logSubscribe(),
            tap((value) => log(`-----| ${value}`)),
            multicast<string>(new Subject()),
        ) as ConnectableObservable<string>;

        observable.subscribe({ next: (value) => log(`---------------| ${value}`) });

        setTimeout(() => {
            observable.subscribe({ next: (value) => log(`-------------------------| ${value}`) });
        }, 3000);

        setTimeout(() => cb(), 10000);

        observable.connect();
    });
});
