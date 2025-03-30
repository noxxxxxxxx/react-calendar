declare module '*.scss'

import { Dayjs, UnitTypeLong } from 'dayjs'
import { MouseEvent, ReactNode } from 'react'
import { TimeConstraintsKeys, ViewMode } from './constant'

/* 限制时分秒步进的配置 */
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
  initialViewMode?: ViewMode // 初始展示的视图
  timezoneOffset?: number
  closeOnSelect?: boolean // 选中后是否立即关闭弹层
  className?: string | string[]
  showInput?: boolean // 是否需要展示 Input
  open?: boolean // 是否展示弹窗，通常用于单独展示日历面板时使用，大多数情况会做二次封装，因此固定传false保持打开即可
  // 当启用showInput时，透传input的props
  inputProps?: {
    [key: string]: unknown
    onFocus?: (...args: unknown[]) => boolean | void
    onClick?: (...args: unknown[]) => boolean | void
    onChange?: (...args: unknown[]) => void
    onKeyDown?: (...args: unknown[]) => boolean | void
  }
  dateFormat?: string | boolean // YYYY-MM-DD 控制输出的格式类型
  timeFormat?: string | boolean // HH:mm:ss 控制输出的格式类型
  viewMode?: ViewMode // 展示的视图 是固定的视图么？
  closeOnClickOutside?: boolean
  timeLimit?: string // 控制时分秒格式 hh:mm:ss
  showTime?: boolean // 是否展示时间
  isEndDate?: boolean // 是否为结束日期
  isValidDate?: (currentDate: Dayjs, selectedDate?: Dayjs) => boolean // 校验是否为合法的日期
  siblingDate?: Dayjs // 可以表示开始时间/结束时间 用来决定日历范围的样式，不传则不开启样式
  timeConstraints?: TimeConstraintsType // 时间约束
  onOpen?: () => void // calendar open
  onChange?: (selectedDate: Dayjs) => void
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
  viewDate: Dayjs
  updateDate: (e: MouseEvent) => void
  navigate: any
  showView: any
  isEndDate?: boolean
  showTime: boolean
}

export interface MonthProps extends Props {
  viewDate: Dayjs
  selectedDate?: Dayjs
  updateDate: (e: MouseEvent) => void
  navigate: any
  showView: any
  isEndDate?: boolean
  showTime: boolean
}

export interface YearProps extends Props {
  viewDate: Dayjs
  selectedDate?: Dayjs
  updateDate: (e: MouseEvent) => void
  navigate: any
  showView: any
  isEndDate?: boolean
  showTime: boolean
}

export interface TimeProps extends Props {
  viewDate: Dayjs
  selectedDate?: Dayjs
  updateDate: (e: MouseEvent) => void
  navigate: any
  showView: any
  isEndDate?: boolean
  showTime: boolean
  setTime?: (type: UnitTypeLong, value: number) => void
  timeLimit: string
  timeConstraints?: TimeConstraintsType
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

export type onChangeFn = Props['onChange']
