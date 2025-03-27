import { TimeConstraintsType } from '@/lib/calendar/type'
import type { Dayjs } from 'dayjs'
import type { DateGranularityValue } from '../dateGranularity'
import type { DateTimeScene, DynamicType, Type } from './constant'

/* BI 业务层使用的数据 */
export type DateTimeValue = {
  staticDate: string[] // 静态时间区间
  startDateDiff: number // 开始时间偏移量
  endDateDiff: number // 结束时间偏移量
  sortBy: DateGranularityValue // 时间粒度
  type: Type // 区分动态/静态/动静态类型
  dynamicType: DynamicType | undefined // 动态时间类型

  // 暂未返回的字段
  value?: Dayjs[]
  granularity?: DateGranularityValue
}

/* 组件参数 */
export type Props = {
  beforeConfirm?: () => Promise<boolean>
  beforeCancel?: () => Promise<boolean>
  afterConfirm?: (value: DateTimeValue) => void
  afterCancel?: () => void
  hidePreset?: boolean // 隐藏预设
  timezoneOffset?: number | string // 时区偏移量
  granularity?: DateGranularityValue // 时间粒度 用于控制展示小时
  dynamicType?: DynamicType | '' // 快捷选择类型
  type?: Type
  mode?: Type[] // 展示类型 默认展示动态和静态，出现一种时禁用另一种模式
  startDateDiff?: number
  endDateDiff?: number
  value?: Dayjs[] | string[] // 选中的时间区间值
  sortBy?: DateGranularityValue // BI 业务字段 等同 granularity 优先使用该字段
  defaultOpen?: boolean
  disabled?: boolean
  scene?: DateTimeScene // 入口样式展示
  startTimeLimit?: string // 限制开始时间展示 hh 还是 mm 还是 ss
  endTimeLimit?: string // 限制结束时间展示 hh 还是 mm 还是 ss
  initialStartTime?: string // 初始化时展示的 hh:mm:ss | hh | mm | ss
  initialEndTime?: string // 初始化时展示的 hh:mm:ss | hh | mm | ss
  startTimeConstraints?: TimeConstraintsType // 时间约束
  endTimeConstraints?: TimeConstraintsType // 时间约束
  format: string // 展示的时间格式
}
