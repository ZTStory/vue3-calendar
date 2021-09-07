/**
 * 阳历转阴历对象
 * @param y year
 * @param m month
 * @param d day
 */
export function solar2lunar(y: number, m: number, d: number): { IDayCn: string; festival: string; lunarFestival: string };
/**
 * 阴历转阳历对象
 * @param y year
 * @param m month
 * @param d day
 * @param isLeapMonth 是否为闰月
 */
export function lunar2solar(y: number, m: number, d: number, isLeapMonth: true): Object;
