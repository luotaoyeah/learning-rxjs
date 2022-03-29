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

        setTimeout(() => cb(), 1000 * 10);

        // connect() 方法的作用: 由于 connectable() 返回的是一个热流, 我们需要先订阅这个热流, 再调用 connect() 方法让热流去订阅上游的冷流,
        // 这样就避免了热流导致的数据丢失, 否则有可能我们还没来得及订阅这个热流, 这个热流的数据就吐完了
        const subscription = connectableObservable.connect();
    });
});
