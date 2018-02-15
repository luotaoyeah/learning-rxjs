/*
 * 5.1.4 combineLatest: 合并最后一个数据
 *   1. 定制下游数据
 */

/*
 * 默认, combineLatest() 根 zip() 一样, 最终的 observable 吐出的数据是配对之后的数据组成的数组,
 * 如果要对最终吐出的数据进行修改和定制, 可以是用 pipe(map) 的方式来进行定制
 */
