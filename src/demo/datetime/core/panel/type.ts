import type { DateGranularityValue } from '@/demo/dateGranularity'
import { TimeConstraintsType } from '@/lib/calendar/type'
import type { Dayjs } from 'dayjs'
import type { DynamicType, Type } from '../../constant'

/* 快捷日期选项 */
export type DateBlockOption = {
  label: string
  value: Dayjs[]
  dynamicType?: DynamicType | '' // 区分 本周，上周，本月，上月
  dateType?: string[]
  disabled?: [boolean, boolean] // 禁用哪个Tab
}

export type TabOption = {
  label: string
  value: Type
  dateBlockOptions?: (timezoneOffset: number) => DateBlockOption[]
}

/* 确认时透传的参数 */
export type ConfirmParams = {
  labels: string[]
  value: Dayjs[]
  type: Type
  dynamicType: DateBlockOption['dynamicType']
}

/* 组件参数 */
export type Props = {
  open: boolean
  mode: Type[]
  format: string
  hidePreset: boolean
  dateFormat: string
  timezoneOffset?: number // 时区偏移量
  type: Type // 动态/静态/动静态类型
  dynamicType?: DynamicType | '' // 动态时间具体类型
  value: Dayjs[] // 选中的时间区间值
  granularity: DateGranularityValue // 时间粒度 用于展示小时
  startTimeLimit?: string
  endTimeLimit?: string
  startTimeConstraints?: TimeConstraintsType
  endTimeConstraints?: TimeConstraintsType
  handleConfirm: (value: ConfirmParams) => void
  handleCancel: () => void
}
