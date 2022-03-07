import { throwError } from 'rxjs';

// throwError(): 产生一个直接 error 的数据流

throwError(() => new Error('SOME ERROR')).subscribe({
    next: (value) => {
        console.log(value);
    },
    complete: () => {
        console.log('COMPLETE');
    },
    error: (error: any) => {
        console.log(error);
    },
});
