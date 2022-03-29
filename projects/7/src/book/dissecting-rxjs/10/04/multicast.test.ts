import { ConnectableObservable, interval, multicast, refCount, Subject, tap } from 'rxjs';
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

    /**
     * 默认情况下,
     *   1. 我们需要手动调用 connect() 方法去订阅上游冷流
     *   2. 我们需要手动调用 Subscription.unsubscribe() 方法去退订上游冷流
     *
     * 我们也可以调用 ConnectableObservable.refCount() 方法, 获取一个新的热流, 这个热流会帮我们:
     *   1. 在订阅者的数量由 0 变成 1 时, 自动去订阅上游冷流
     *   2. 在订阅者的数量变成 0 时, 自动去退订上游冷流
     */
    it('02', (cb) => {
        const cold$ = interval(1000);

        const observable = (
            cold$.pipe(
                logSubscribe(),
                tap((value) => log(`-----| ${value}`)),
                multicast<string>(new Subject()),
                refCount(),
            ) as ConnectableObservable<string>
        ).refCount();

        observable.subscribe({ next: (value) => log(`---------------| ${value}`) });

        setTimeout(() => {
            observable.subscribe({ next: (value) => log(`-------------------------| ${value}`) });
        }, 3000);

        setTimeout(() => cb(), 1000 * 10);
    });
});
