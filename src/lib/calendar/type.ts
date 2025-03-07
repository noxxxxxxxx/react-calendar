declare module '*.scss'

import { Dayjs, UnitTypeLong } from 'dayjs'
import { MouseEvent, ReactNode } from 'react'

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

export type TimeConstraintsType = {
  [TimeConstraintsKeys.Hour]: {
    min: number
    max: number
    step: number
  }
  [TimeConstraintsKeys.Minute]: {
    min: number
    max: number
    step: number
  }
  [TimeConstraintsKeys.Second]: {
    min: number
    max: number
    step: number
  }
  [TimeConstraintsKeys.Millisecond]: {
    min: number
    max: number
    step: number
  }
}

export type WraperProps = {
  'key': string | number
  'data-value'?: number
  'data-month'?: number
  'data-year'?: number
  'onClick': (e: MouseEvent) => void
  'className': string
}

export type State = {
  open: boolean | undefined
  selectedDate: Dayjs | undefined
  inputValue: Dayjs | undefined
  currentView: ViewMode
  viewDate: Dayjs
  ready: boolean
}

export interface props {
  [key: string]: unknown
}

export interface Props {
  value?: Dayjs
  initialValue?: Dayjs
  initialViewMode?: ViewMode

  viewMode?: ViewMode
  className?: string | string[]
  viewDate?: Dayjs // 下标高亮时间
  closeOnSelect?: boolean // 选中后是否立即关闭弹层
  closeOnClickOutside?: boolean
  isEndDate?: boolean // 是否为结束日期
  open?: boolean // 是否展示弹窗
  timeLimit?: string // 控制时分秒
  showTime?: boolean // 是否展示时间

  showInput?: boolean // 是否需要展示 Input
  inputProps?: {
    [key: string]: unknown
    onFocus?: (...args: unknown[]) => boolean | void
    onClick?: (...args: unknown[]) => boolean | void
    onChange?: (...args: unknown[]) => void
    onKeyDown?: (...args: unknown[]) => boolean | void
  }

  isValidDate?: (currentDate: Dayjs, selectedDate?: Dayjs) => boolean // 校验是否为合法的日期
  timezoneOffset?: number

  siblingDate?: Dayjs // 可以表示开始时间/结束时间
  granularity?: string // 时间粒度
  dateFormat?: string | boolean // YYYY-MM-DD
  timeFormat?: string | boolean // HH:mm:ss
  onOpen?: () => void // calendar open
  onChange?: (selectedDate: Dayjs | string) => void
  onClose?: (date: Dayjs | undefined) => void
  renderYear?: (props: props, year: number | undefined, selectedDate: Dayjs | undefined) => ReactNode
  renderMonth?: (
    props: props & { key: number | string },
    month: number,
    year: number | undefined,
    selectedDate: Dayjs | undefined,
  ) => ReactNode
  renderDay?: (props: Props & { key: number | string }, day: number, selectedDate: Dayjs | undefined) => ReactNode
  onBeforeNavigate?: (nextView: ViewMode, currentView: ViewMode, viewDate: Dayjs) => ViewMode
  onNavigate?: (currentView: ViewMode) => void
  onNavigateForward?: (amount: number, ViewMode: ViewMode) => void
  onNavigateBack?: (amount: number, ViewMode: ViewMode) => void
}

export interface DayProps extends Props {
  selectedDate?: Dayjs
  updateDate: (e: MouseEvent) => void
  navigate: any
  showView: any
  isEndDate: boolean
  showTime: boolean
}

export interface MonthProps extends Props {
  selectedDate?: Dayjs
  updateDate: (e: MouseEvent) => void
  navigate: any
  showView: any
  isEndDate: boolean
  showTime: boolean
}

export interface YearProps extends Props {
  selectedDate?: Dayjs
  updateDate: (e: MouseEvent) => void
  navigate: any
  showView: any
  isEndDate: boolean
  showTime: boolean
}

export interface TimeProps extends Props {
  selectedDate?: Dayjs
  updateDate: (e: MouseEvent) => void
  navigate: any
  showView: any
  isEndDate: boolean
  showTime: boolean
  setTime?: (type: UnitTypeLong, value: number) => void
  timeLimit: string
  timeConstraints: TimeConstraintsType
}

export interface InputProps {
  showInput?: boolean // 是否渲染 input
  // 是否渲染自定义 input
  renderInput?: (
    props: Props,
    openCalendar: InputProps['openCalendar'],
    closeCalendar: InputProps['closeCalendar'],
  ) => React.ReactNode
  value: Dayjs | undefined
  dateFormat?: Props['dateFormat']
  timeFormat?: Props['timeFormat']
  timezoneOffset?: number
  inputProps?: Props['inputProps']
  openCalendar: () => void
  onInputChange?: (value: Dayjs | string) => void
  closeCalendar: () => void
}
