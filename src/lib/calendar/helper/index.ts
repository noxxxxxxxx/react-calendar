import { DateFormat, TimeConstraints, TimeFormat } from '@/lib/calendar/constant'
import { TimeConstraintsType } from '@/lib/calendar/type'
import type { Dayjs, InstanceLocaleDataReturn } from 'dayjs'
import dayjs from 'dayjs'
import { ChangeEvent, KeyboardEvent, MouseEvent, ReactNode } from 'react'

export const pad = (type: string, value: number) => {
  const padValues: Record<string, number> = {
    hour: 2,
    minute: 2,
    second: 2,
    millisecond: 3,
  }

  let str = value + ''
  while (str.length < padValues[type]) str = '0' + str
  return str
}

/* 获取时间字段 */
export const getTimeParts = (date?: Dayjs) => {
  if (!date) {
    return {
      hour: '00',
      minute: '00',
      second: '00',
      millisecond: '00',
      ampm: 'am',
    }
  }
  const hours = date.hour()

  return {
    hour: pad('hour', hours),
    minute: pad('minute', date.minute()),
    second: pad('second', date.second()),
    millisecond: pad('millisecond', date.millisecond()),
    ampm: hours < 12 ? 'am' : 'pm',
  }
}

export const createConstraints = (overrideTimeConstraints?: TimeConstraintsType) => {
  const constraints: TimeConstraintsType = TimeConstraints

  Object.keys(TimeConstraints).forEach((type) => {
    constraints[type as keyof TimeConstraintsType] = {
      ...TimeConstraints[type as keyof TimeConstraintsType],
      ...(overrideTimeConstraints?.[type as keyof TimeConstraintsType] || {}),
    }
  })

  return constraints
}

export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}

export const getDateFormat = (dateFormat?: string | boolean) => {
  if (typeof dateFormat === 'boolean') {
    if (dateFormat) {
      return DateFormat
    }
    return ''
  }
  return dateFormat ?? DateFormat
}

export const getTimeFormat = (timeFormat?: string | boolean) => {
  if (typeof timeFormat === 'boolean') {
    if (timeFormat === true) {
      return TimeFormat
    }
    return ''
  }
  return timeFormat ?? TimeFormat
}

/* 经过偏移量计算后的日期 */
export const formatDate = (
  date: Dayjs | undefined,
  timezoneOffset?: string | number,
  dateFormat?: string | boolean,
  timeFormat?: string | boolean,
) => {
  if (!date) return undefined
  const d = getDateFormat(dateFormat)
  const t = getTimeFormat(timeFormat)
  const final = `${d || ''} ${t || ''}`.trim()

  if (timezoneOffset !== undefined && timezoneOffset !== 'local') {
    return date.clone().utcOffset(timezoneOffset).format(final)
  }
  return date.clone().format(final)
}

/* 获取当前本地日期 */
export const getLocalDate = (timezoneOffset?: string | number) => {
  if (timezoneOffset !== undefined && timezoneOffset !== 'local') {
    return dayjs().utcOffset(timezoneOffset)
  }
  return dayjs()
}

/* 获取本地化的星期 */
export const getDaysOfWeek = (locale: InstanceLocaleDataReturn) => {
  if (!locale) return
  const first = locale.firstDayOfWeek()
  const dow: string[] = []
  let i = 0

  locale.weekdaysMin().forEach(function (day) {
    dow[(7 + i++ - first) % 7] = day
  })

  return dow
}

export const callHandler = (
  method?: (...args: unknown[]) => boolean | void,
  e?: MouseEvent | KeyboardEvent | ChangeEvent,
) => {
  if (!method) return true
  return method(e) !== false
}

export const getRow = (rows: ReactNode[][], year: number) => {
  if (year < 4) {
    return rows[0]
  }
  if (year < 8) {
    return rows[1]
  }

  return rows[2]
}

export const isAMPM = (date: Dayjs | undefined, timeFormat?: string | boolean) => {
  if (!date) return false
  const result = dayjs(date).format(getTimeFormat(timeFormat)).toLowerCase()

  return result.indexOf('am') !== -1 || result.indexOf('pm') !== -1
}

export const getAMPM = (date: Dayjs | undefined, timeFormat?: string | boolean) => {
  if (!date) return ''
  return dayjs(date).format(getTimeFormat(timeFormat))
}
