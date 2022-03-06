import { range } from 'rxjs';

range(1.1, 5).subscribe((data) => {
    console.log(data);
});
