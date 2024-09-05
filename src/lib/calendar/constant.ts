import { TimeConstraintsType, ViewMode } from '@/index.d'

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

export const timeConstraints: TimeConstraintsType = {
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
