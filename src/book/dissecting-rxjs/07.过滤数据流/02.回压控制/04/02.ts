import { interval, merge, of } from 'rxjs';
import { concatAll, map, mergeAll, take, zipAll } from 'rxjs/operators';

const ob01 = interval(1000).pipe(
  // 0,1,2,3,4.....
  take(2),
  // 0,1
  map((i) => of('A_' + i)),
  // A_0, A_1
);

const ob02 = interval(1500).pipe(
  // 0,1,2,3,4.....
  take(3),
  // 0,1,2
  map((i) => of('B_' + i)),
  // B_0,B_1,B_2
);

// A_0,  A_1,
// B_0,    B_1,   B_2,

merge(ob01, ob02)
  .pipe(zipAll())
  .subscribe((value) => {
    console.log(value);
  });
