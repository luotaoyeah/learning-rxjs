import { EMPTY } from 'rxjs';

// EMPTY: 产生一个直接 complete 的数据流

EMPTY.subscribe({
    next: (value) => {
        console.log(value);
    },
    complete: () => {
        console.log('COMPLETE');
    },
});
