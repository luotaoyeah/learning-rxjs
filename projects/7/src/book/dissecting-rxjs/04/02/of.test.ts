import { of } from 'rxjs';

describe('of', () => {
    it('01', (cb) => {
        of(1, 2, 3).subscribe({
            next: (data) => {
                console.log(data);
            },
            complete: () => {
                console.log('COMPLETE');
                cb();
            },
        });
    });
});
