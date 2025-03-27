import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import { DateFormat, Type } from '../../constant'
import { QUICK_DATE_OPTIONS } from './constant'

/* 判断是否为数字格式 */
export const isNumber = (str: string) => {
  return /^\d+$/.test(str)
}

/* 格式化数字为有效值 */
export const formatNumber = (str: string) => {
  // 如果输入的字符串是 0 或者以 0 开头的数字，则去掉开头的 0
  let value: string | number = str
  if (value.startsWith('0')) {
    value = Number(str) // 将字符串转换为数字，去掉开头的 0
  }
  value = Number(str) // 否则直接返回原字符串

  if (value > 10000) {
    value = 10000
  }

  return String(value)
}

/* 判断是否为正确的日期字符串格式 */
export const isValidDateString = (str: string) => {
  const date = new Date(str)
  const validDate = date.toString() !== 'Invalid Date'
  if (!validDate) return false
  const regex = /^\d{4}\/(0[1-9]|1[0-2])\/(0[1-9]|[1-2][0-9]|3[0-1])$/
  return regex.test(str)
}

/* 将动态天和静态时间字符串转换为 dayjs 格式 */
export const toDayJs = (value: number | string) => {
  const v = Number(value)
  if (typeof v === 'number') {
    return dayjs().subtract(v, 'day')
  }
  return dayjs(value)
}

/* 根据时区获取当前日期 */
export const getLocalDate = (timezoneOffset?: number) => {
  if (timezoneOffset === undefined) {
    return dayjs().startOf('day')
  }
  return dayjs().utcOffset(timezoneOffset).startOf('day')
}

/* 动态时间 静态时间相互转换为日期字符串或数字 */
export const transformDate = (value: Dayjs, type: string, format: string, timezoneOffset?: number) => {
  const today = getLocalDate(timezoneOffset)
  if (type === 'static') {
    return value.format(format) // 格式化成字符串
  }
  return today.diff(value.clone().startOf('day'), 'day') // 返回间隔，去除小时干扰造成偏移
}

/* 根据日期区间转为中文展示名 */
export const transformDateToText = (
  date: Dayjs[],
  startDateType: string,
  endDateType: string,
  quickSelected: number,
  format: string,
  timezoneOffset?: number,
) => {
  if (date.length === 0) return []
  // 优先快捷选项
  const options = QUICK_DATE_OPTIONS(timezoneOffset)
  if (quickSelected > -1 && quickSelected < options.length && startDateType === Type.dynamic) {
    return [options[quickSelected].label]
  }
  // 动态静态混合
  const today = getLocalDate(timezoneOffset)
  const yesterday = today.subtract(1, 'day').startOf('day')
  let endLabelPrefix = ''
  let startLabelPrefix = ''
  const startGap = today.diff(date[0].startOf('day'), 'day')
  const endGap = today.diff(date[1].startOf('day'), 'day')
  const result = []
  // 全部为动态时间
  if (startDateType === endDateType && startDateType === Type.dynamic) {
    if (date[1].isSame(yesterday, 'day')) {
      startLabelPrefix = '过去' + startGap + '天'
    } else if (date[1].isSame(today, 'day')) {
      startLabelPrefix = '最近' + (Number(startGap) + 1) + '天' // 最近需要加上当天
    } else {
      startLabelPrefix = startGap + '天前'
      endLabelPrefix = endGap + '天前'
    }
  } else if (startDateType === Type.static && endDateType === Type.dynamic) {
    startLabelPrefix = date[0].format(format)
    let temp = '天前'
    if (endGap === 0) {
      temp = '今日'
    } else if (endGap === 1) {
      temp = '昨日'
    } else {
      temp = endGap + temp
    }
    endLabelPrefix = temp
  } else {
    // 全部是静态时间
    startLabelPrefix = date[0].format(format)
    endLabelPrefix = date[1].format(format)
  }
  if (result.length === 0) {
    if (startLabelPrefix) {
      result.push(startLabelPrefix)
    }
    if (endLabelPrefix) {
      result.push(endLabelPrefix)
    }
  }
  // 校正动态时间下 开始和结束日期相等 只展示一个
  if (result[0] === result[1] && startDateType === Type.dynamic) return [result[0]]
  return result
}

/* 获取组合类型 */
export const getType = (startDateType: string, endDateType: string): Type => {
  if (startDateType === endDateType && startDateType === Type.dynamic) {
    return Type.dynamic
  }
  if (startDateType === endDateType && startDateType === Type.static) {
    return Type.static
  }
  if (startDateType === Type.static && endDateType === Type.dynamic) {
    return Type.from
  }
  return '' as Type
}

/* 辅助信息 时间区间展示逻辑 */
export const getRangeText = (
  value: Dayjs[],
  startDateType: Type,
  endDateType: Type,
  quickSelected: number,
  format = DateFormat,
  type?: Type,
) => {
  console.log(format, '///')
  if (!value?.length) return ''
  let label = ''
  if (startDateType === endDateType && startDateType === Type.static && type !== Type.from) return ''
  if (quickSelected > 1 || startDateType === Type.dynamic || endDateType === Type.dynamic) {
    label = value[0].format(format) + ' ~ ' + value[1].format(format)
  }
  if (quickSelected <= 1 && quickSelected > -1) {
    label = value[0].format(format)
  }
  return label ? '(' + label + ')' : ''
}
