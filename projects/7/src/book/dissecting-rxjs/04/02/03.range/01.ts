import { range } from 'rxjs';

// range(): 产生连续递增 1 的数字序列

range(1.1, 5).subscribe((data) => {
    console.log(data);
});
