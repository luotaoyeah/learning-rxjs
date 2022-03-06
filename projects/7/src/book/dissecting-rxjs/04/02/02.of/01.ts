import { of } from 'rxjs';

of(1, 2, 3).subscribe({
    next: (data) => {
        console.log(data);
    },
    complete: () => {
        console.log('COMPLETE');
    },
});
