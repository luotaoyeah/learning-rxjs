import { Observable } from 'rxjs';

describe('src/book/dissecting-rxjs/02/02/03/01.ts', () => {
  it('should work', () => {
    const source$ = new Observable<number>((observer) => {
      observer.next(1);
      observer.next(2);
      observer.next(3);

      observer.complete();
    });

    const actual: Array<number> = [];

    source$.subscribe({
      next: (value: number) => {
        actual.push(value);
      },
    });

    expect(JSON.stringify(actual)).toBe(JSON.stringify([1, 2, 3]));
  });
});
