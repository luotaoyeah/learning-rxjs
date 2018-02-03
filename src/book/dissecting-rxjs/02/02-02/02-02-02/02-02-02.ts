import chalk from "chalk";

/*
 * 2.2.2 迭代器模式（iterator pattern）
 */
console.log(
  chalk.red("\n-------------------------------------------------- 01"),
);
{
  /*
   * iterator 是用来遍历数据集合的对象，
   * 使用 for/of 循环语句时，使用的就是 iterator 对象来进行遍历，
   * 通过 Array.values() 方法，可以获取一个 iterator 对象
   */

  const arr01: Array<number> = [1, 2, 3];
  const iterator: IterableIterator<number> = arr01.values();

  let result: IteratorResult<number> = iterator.next();
  while (!result.done) {
    console.log(chalk.white(String(result.value)));
    result = iterator.next();
  }
}
