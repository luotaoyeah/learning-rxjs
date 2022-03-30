import { interval, map, Subject, take, tap } from 'rxjs';
import { log } from '../../util';

describe('Subject', () => {
    /**
     * Subject 既是一个 Hot Observable, 又是一个 Observer.
     * Subject 类似于 EventEmitter.
     * Subject 通过内部属性记录了自己所有的订阅者.
     */
    it('01', (cb) => {
        const subject = new Subject<number>();

        subject
            .pipe(
                tap({
                    subscribe: () => log('SUBSCRIBE'),
                    next: (value) => log(`-----| ${value}`),
                }),
            )
            .subscribe({
                complete: () => {
                    log('COMPLETE');
                    cb();
                },
                error: (e) => {
                    log(`ERROR | ${e.message}`);
                    cb();
                },
            });

        subject.next(1);
        subject.next(2);
        subject.next(3);
        subject.error(new Error('错'));
    });

    /**
     * 让 Cold Observable 作为 Subject 的上游, 经过 Subject 之后就变成了一个 Hot Observable, 从而实现多播.
     * 多播指的是: 多个 Observer 订阅了同一个 Observable, 这个 Observable 必须是一个 Hot Observable (比如 Subject).
     */
    it('02', (cb) => {
        const subject = new Subject<number>();

        // source$ 是一个 Cold Observable
        const source$ = interval(1000).pipe(take(10));
        // Subject 是一个 Observer (因为 Subject 拥有 next/complete/error 三个方法),
        // 所以直接将一个 Subject 作为参数传给 subscribe() 方法
        source$.subscribe(subject);

        subject.pipe(tap((value) => log(`--| ${value}`))).subscribe();

        setTimeout(() => {
            subject.pipe(tap((value) => log(`----------| ${value}`))).subscribe({ complete: () => cb() });
        }, 5000);
    });

    /**
     * 调用 Subject.unsubscribe() 之后, 下游将不会再收到 next/complete/error 通知.
     */
    it('03', (cb) => {
        const subject = new Subject<number>();

        const source$ = interval(1000).pipe(take(10));
        source$.subscribe(subject);

        subject.subscribe({
            next: (value) => log(`--| ${value}`),
            complete: () => {
                log('COMPLETE');
                cb();
            },
            error: (e) => {
                log(`ERROR | ${e.message}`);
                cb();
            },
        });

        setTimeout(() => {
            subject.unsubscribe();
        }, 3000);
    });

    /**
     * Subject 作为 Observer 可以订阅多个 Observable (即可以有多个上游),
     * 但是只要其中一个 Observable 发生了 complete/error, 它就会调用 Subject 的 complete/error, Subject 又会去调用它所有的订阅者的 complete/error.
     */
    it('04', (cb) => {
        const subject = new Subject<string>();

        const source01$ = interval(1000).pipe(
            take(2),
            map(() => 'A'),
        );
        source01$.subscribe(subject);

        const source02$ = interval(1000).pipe(
            take(2),
            map(() => 'B'),
        );
        source02$.subscribe(subject);

        subject.subscribe({
            next: (value) => log(`--| ${value}`),
            complete: () => {
                log('COMPLETE');
                cb();
            },
            error: (e) => {
                log(`ERROR | ${e.message}`);
                cb();
            },
        });
    });
});
