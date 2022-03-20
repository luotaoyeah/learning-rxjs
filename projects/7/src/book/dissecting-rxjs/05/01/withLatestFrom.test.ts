import { map, take, timer, withLatestFrom } from 'rxjs';
import { log } from '../../util';

describe('withLatestFrom', () => {
    /**
     * 跟 combineLatest()/combineLatestWith() 的区别在于,
     *   withLatestFrom()    只能由第一个上游控制吐数据的节奏, 其他上游只贡献数据,
     *   combineLatestWith() 每个上游都可以控制吐数据的节奏
     */
    it('01', (cb) => {
        const source01$ = timer(1000, 2000).pipe(map((i) => `A_${i}`));
        const source02$ = timer(0, 1000).pipe(map((i) => `B_${i}`));

        source01$.pipe(withLatestFrom(source02$), take(9)).subscribe({
            next: (value) => {
                log(value);
            },
            complete: () => cb(),
        });
    });
});
