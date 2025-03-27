import { DateGranularityValue } from './dateGranularity'
/**
 * 校验日期区间是否符合粒度范围限制
 * @param sortBy 日期粒度 DateGranularityValue
 * @param diff 动态时间开始、结束日期的天数
 * @returns DateGranularityValue
 */
export const checkDateRange = (sortBy: DateGranularityValue, diff: number[]) => {
  if (sortBy === DateGranularityValue.Hour && diff[0] - diff[1] > 30) {
    return DateGranularityValue.Hour
  }
  if (sortBy === DateGranularityValue.Minute && diff[0] - diff[1] > 0) {
    return DateGranularityValue.Minute
  }
  if (sortBy === DateGranularityValue.Minute10 && diff[0] - diff[1] > 13) {
    return DateGranularityValue.Minute10
  }
  if (sortBy === DateGranularityValue.Minute5 && diff[0] - diff[1] > 6) {
    return DateGranularityValue.Minute5
  }
  return DateGranularityValue.Day
}

/**
 * 日期区间不符合粒度范围限制作出提示
 * @param sortBy 日期粒度 DateGranularityValue
 * @param diff 动态时间开始、结束日期的天数
 * @returns string | boolean
 */
export const validateDateRange = (sortBy: DateGranularityValue, diff: number[]) => {
  if (checkDateRange(sortBy, diff) === DateGranularityValue.Hour) {
    return '按小时查看，时间范围一次最多展示 31 天'
  }
  if (checkDateRange(sortBy, diff) === DateGranularityValue.Minute) {
    return '按分钟查看，时间范围一次最多展示 1 天'
  }
  if (checkDateRange(sortBy, diff) === DateGranularityValue.Minute10) {
    return '按 10 分钟查看，时间范围一次最多展示 14 天'
  }
  if (checkDateRange(sortBy, diff) === DateGranularityValue.Minute5) {
    return '按 5 分钟查看，时间范围一次最多展示 7 天'
  }
  return false
}
