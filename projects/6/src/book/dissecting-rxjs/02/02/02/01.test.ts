describe('src/book/dissecting-rxjs/02/02/02/01.ts', () => {
  it('should work', () => {
    // iterator 是用来遍历数据集合的迭代器,
    // 使用 for/of 循环时, 使用的就是 iterator 对象来进行遍历,
    // 通过 `Array.values()` 方法, 可以获取一个 iterator 对象

    const arr01: Array<number> = [1, 2, 3];
    const iterator: IterableIterator<number> = arr01.values();

    const actual: Array<number> = [];

    let result: IteratorResult<number> = iterator.next();
    while (!result.done) {
      actual.push(result.value);
      result = iterator.next();
    }

    expect(JSON.stringify(actual)).toBe(JSON.stringify([1, 2, 3]));
  });
});
