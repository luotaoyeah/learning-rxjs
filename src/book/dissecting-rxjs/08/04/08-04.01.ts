/*
 * 8.4 高阶的 map
 */

/*
 * 普通的 map() 操作符, 接收一个 project 函数, 将上游的数据投射为一个新的数据, 再吐给下游,
 * 高阶的 map 操作符, 接收一个 project 函数, 但是这个 project 函数会将上游的数据投射为一个 observable 对象, 因此高阶的 map 操作符返回的是一个高阶的 observable 对象,
 *   之后再使用 concat/merge/switchAll/exhaust 四个操作符将这个高阶的 observable 再进行平化之后, 再吐给下游
 *
 * 高阶的 map 操作符有 4 个:
 *   concatMap(), 相当于 map() + concatAll()
 *   mergeMap(), 相当于 map() + mergeAll()
 *   switchMap(), 相当于 map() + switchALl()
 *   exhaustMap(), 相当于 map() + exhaust()
 */
