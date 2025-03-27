import { FC } from 'react'
import { getRangeText, transformDateToText } from '../helper'
import { Props } from './type'

/** 顶部日期描述信息 */
export const Header: FC<Props> = ({
  value,
  type,
  startDateType,
  endDateType,
  presetSelected,
  format,
  timezoneOffset,
}) => {
  const labels = transformDateToText(value, startDateType, endDateType, presetSelected, format, timezoneOffset) // 日期展示文案
  return (
    <section className="datetime-header">
      <div className="title">当前日期</div>
      <div>
        <span className="value">{labels.join(' → ')}</span>
        <span className="time-range">
          {getRangeText(value, startDateType, endDateType, presetSelected, format, type)}
        </span>
      </div>
    </section>
  )
}
