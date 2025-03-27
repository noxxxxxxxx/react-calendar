import type { ReactNode } from 'react'
import type { Weekday } from '../weekdayPicker'
import type { DateGranularityScene, DateGranularityValue } from './constant'

/* 常量 类型 */
export interface MenuItem {
  key: string
  label: string | ReactNode
  name: string
  children?: MenuItem[]
  childItems?: {
    label: string
    value: Weekday
  }[]
  expandIcon?: JSX.Element
}

/* 组件参数 */
export type DateGranularityProps = {
  value?: {
    value: DateGranularityValue
    week?: Weekday
  } | null
  onChange?: (value: DateGranularityValue, week?: Weekday) => void
  disabled?: boolean
  index?: number // 使用哪一种常量配置
  size?: 'small' | 'middle' | 'large' | undefined // 按钮大小 同 antd 的 button props
  scene?: DateGranularityScene // 入口样式展示 dashboard看板展示文本 | 默认按钮
}

/* Items 组件 props */
export type ItemProps = {
  onClick?: (keys: string[]) => void
  selectedKeys?: string[]
  index?: number // 使用哪一种常量配置
}
