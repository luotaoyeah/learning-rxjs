import { interval, map, Observable, share } from 'rxjs';
import { log } from '../../util';

describe('unsubscribe', () => {
    it('01', (cb) => {
        const source$ = new Observable<number>((subscriber) => {
            let n = 1;

            const handle = setInterval(() => {
                log(`| ${n}`);
                subscriber.next(n++);
            }, 1000);

            return {
                unsubscribe() {
                    log('UNSUBSCRIBE');
                },
            };
        });

        const subscription = source$.subscribe((value) => {
            log(`----------| ${value}`);
        });

        setTimeout(() => {
            // 退订之后不再接收数据, 但是上游依然在吐数据
            subscription.unsubscribe();
        }, 3000);
    });

    it('02', (cb) => {
        let source$: Observable<string> | null = interval(1000).pipe(map(() => 'A'));

        source$.subscribe((value) => log(`----------| ${value}`));

        setTimeout(() => {
            // 上游为冷流, 当上游被赋值为 null 后, 上游依然在吐数据, 前面注册的订阅者也依然在收到数据
            source$ = null;
            log('NULL');
        }, 3000);
    });

    it('03', (cb) => {
        let source$: Observable<string> | null = interval(1000).pipe(
            map(() => 'A'),
            share({ resetOnComplete: false, resetOnError: false, resetOnRefCountZero: false }),
        );

        source$.subscribe((value) => log(`| ${value}`));
        source$.subscribe((value) => log(`----------| ${value}`));

        setTimeout(() => {
            // 上游为热流, 当上游被赋值为 null 后, 上游依然在吐数据, 前面注册的订阅者也依然在收到数据
            source$ = null;
            log('NULL');
        }, 3000);
    });
});
