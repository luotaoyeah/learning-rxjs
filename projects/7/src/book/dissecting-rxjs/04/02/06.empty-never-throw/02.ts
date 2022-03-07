import { NEVER } from 'rxjs';

// NEVER: 产生一个不吐数据, 且永不完结的数据流

NEVER.subscribe({
    next: (value) => {
        console.log(value);
    },
    complete: () => {
        console.log('COMPLETE');
    },
});
