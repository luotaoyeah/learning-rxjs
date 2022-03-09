import { defer, of } from 'rxjs';
import { log } from '../../util';

describe('defer', () => {
    /**
     * 在被订阅的时候, 才会调用工厂方法 observableFactory(), 返回真正作为数据流的 Observable.
     * 由于数据流是延迟创建的, 我们可以根据不同的条件, 创建不同的数据流.
     */
    it('01', (cb) => {
        const source$ = defer(() => {
            log('调用 observableFactory(), 返回真正的数据流');
            return of(1);
        });

        log('source$ 创建成功');

        setTimeout(() => {
            source$.subscribe({
                next: (value) => {
                    log(value);
                },
                complete: () => cb(),
            });
        }, 2000);
    });
});
