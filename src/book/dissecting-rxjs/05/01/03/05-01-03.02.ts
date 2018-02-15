/*
 * 5.1.3 zip: 拉链式组合
 *   2. 数据积压问题
 */

/*
 * 由于 zip() 需要对每个 observable 吐出的数据进行配对,
 * 如果一个 observable01 吐出数据的速度很快, 而另一个 observable02 吐出数据的速度很慢,
 * 则 observable01 吐出的所有的数据都要等着配对, 就会在内存中进行积压, 造成内存占用压力
 */
