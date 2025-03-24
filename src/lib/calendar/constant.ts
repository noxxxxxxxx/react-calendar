import { TimeConstraintsType } from '@/lib/calendar/type'

export enum Mode {
  StartDate = 'startDate',
  EndDate = 'endDate',
}

export enum ViewMode {
  Year = 'year',
  Month = 'month',
  Day = 'day',
  Time = 'time',
}

export enum TimeConstraintsKeys {
  Hour = 'hour',
  Minute = 'minute',
  Second = 'second',
  Millisecond = 'millisecond',
  Ampm = 'ampm',
}

export const ViewToMethod: Record<string, string> = {
  [ViewMode.Day]: 'date',
  [ViewMode.Month]: ViewMode.Month,
  [ViewMode.Year]: ViewMode.Year,
}

export const NextView: Record<string, ViewMode> = {
  [ViewMode.Day]: ViewMode.Time,
  [ViewMode.Month]: ViewMode.Day,
  [ViewMode.Year]: ViewMode.Month,
}

export const TimeConstraints: TimeConstraintsType = {
  hour: {
    min: 0,
    max: 23,
    step: 1,
  },
  minute: {
    min: 0,
    max: 59,
    step: 1,
  },
  second: {
    min: 0,
    max: 59,
    step: 1,
  },
  millisecond: {
    min: 0,
    max: 999,
    step: 1,
  },
}
export const DateFormat = 'L'

export const TimeFormat = 'LTS'

export const DateTimeFormat = `${DateFormat} ${TimeFormat}`

export enum FormatType {
  Date = 'date',
  Time = 'time',
}
