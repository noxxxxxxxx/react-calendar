import type { TooltipPlacement } from 'antd/es/tooltip'
import type { Weekday } from './constant'
import type { ReactNode } from 'react'

/* 组件 Props */
export type WeekdayPickerProps = {
  value?:
    | Weekday
    | {
        value: Weekday
      }
  placement?: TooltipPlacement
  children?: ReactNode
  onChange?: (data: WeekdayPickerValue) => void
}

/* onChange 对外传递的参数 */
export type WeekdayPickerValue = {
  label: string
  value: Weekday
}
