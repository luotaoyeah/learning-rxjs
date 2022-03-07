import { throwError } from 'rxjs';

/**
 * throwError(): 产生一个直接 error 的数据流
 */
describe('throwError', () => {
    it('01', (cb) => {
        throwError(() => new Error('SOME ERROR')).subscribe({
            next: (value) => {
                console.log(value);
            },
            error: (error: any) => {
                console.log(error);
                cb();
            },
        });
    });
});
