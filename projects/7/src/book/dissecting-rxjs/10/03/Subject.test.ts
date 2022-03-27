import { Subject, tap } from 'rxjs';
import { log, logSubscribe } from '../../util';

describe('Subject', () => {
    /**
     * Subject 既是一个 Hot Observable, 又是一个 Observer.
     * Subject 类似于 EventEmitter.
     * Subject 通过 Subject.currentObservers 属性记录了自己所有的订阅者.
     */
    it('01', (cb) => {
        const subject = new Subject<number>();

        subject
            .pipe(
                logSubscribe(),
                tap((value) => log(`----------| ${value}`)),
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
});
