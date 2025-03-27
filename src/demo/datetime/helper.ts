import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { DateGranularityValue } from '../dateGranularity'

/* 应用层日期统一转为 dayjs 格式 */
export const transformDate = (value: any[]) => {
  return [dayjs(value[0]).startOf('day'), dayjs(value[1]).startOf('day')]
}

/* 校验应用层传入的日期是否正确 */
export const isValidDate = (value: Dayjs[]) => {
  if (value.length !== 2) {
    return false
  }
  if (value[0].isAfter(value[1], 'day')) {
    return false
  }
  if (value[1].isBefore(value[0], 'day')) {
    return false
  }
  return true
}

const parseTime = (timeStr: string) => {
  // 按冒号分割字符串
  const parts = timeStr.split(':')
  let hours, minutes, seconds

  // 根据分割后的部分数量来判断时间格式
  switch (parts.length) {
    case 3: // HH:mm:ss 格式
      hours = parseInt(parts[0], 10)
      minutes = parseInt(parts[1], 10)
      seconds = parseInt(parts[2], 10)
      break
    case 2: // HH:mm 格式
      hours = parseInt(parts[0], 10)
      minutes = parseInt(parts[1], 10)
      seconds = 0
      break
    case 1: // HH 格式
      hours = parseInt(parts[0], 10)
      minutes = 0
      seconds = 0
      break
    default:
      throw new Error('Invalid time format')
  }

  return { hours, minutes, seconds }
}

/* 根据时间粒度展示格式后的时间文本 */
export const foramtStr = (granularity?: string) => {
  const exist = granularity?.includes('minute') || granularity?.includes('hour')
  if (exist) {
    return 'YYYY-MM-DD HH'
  }
  return 'YYYY-MM-DD'
}

export const formatTimeValue = (initialTime?: string, sortBy?: DateGranularityValue, value?: Dayjs) => {
  const showTime = sortBy?.includes(DateGranularityValue.Minute) || sortBy?.includes(DateGranularityValue.Hour)
  const isValid = dayjs(value, 'YYYY-MM-DD HH:mm:ss').isValid()

  if (value && isValid) {
    if (initialTime) {
      return parseTime(initialTime)
    }
    if (showTime) {
      return {
        hours: dayjs(value).hour(), // 分析场景只取小时
        minutes: 0,
        seconds: 0,
      }
    }
  }
  return {
    hours: 0,
    minutes: 0,
    seconds: 0,
  }
}
