import { DateGranularityValue } from '@/demo/dateGranularity'
import { Type } from '@/demo/datetime/constant'
import { forwardRef, useImperativeHandle, useState } from 'react'
import { QUICK_DATE_OPTIONS, QuickRangeOptions } from '../constant'
import { DateBlockOption } from '../type'
import { Props, Ref } from './type'

export const Preset = forwardRef<Ref, Props>(({ hidePreset, granularity, timezoneOffset, onChange }, ref) => {
  const quickOptions = QUICK_DATE_OPTIONS(timezoneOffset) // 快捷选择选项
  const quickRangeOptions = QuickRangeOptions(timezoneOffset) // 快捷区间选择选项
  const [quickSelected, setQuickSelected] = useState(-1) // 快捷选中下标

  useImperativeHandle(ref, () => ({
    updateSelectedOption: (index: number) => setQuickSelected(index),
  }))

  /* 选择快捷时间选项 */
  const handleQuickDate = (option: DateBlockOption, index: number) => {
    setQuickSelected(index)
    let startDate
    let endDate
    let dynamicType
    let type
    let startDateType
    let endDateType
    // 分钟和小时粒度需要设置结束小时为 23
    if ([DateGranularityValue.Minute, DateGranularityValue.Hour].includes(granularity)) {
      option.value[1] = option.value[1].hour(23)
    }
    // 开始-结束均为动态时间
    if (index < quickOptions.length) {
      startDate = option.value[0]
      endDate = option.value[1]
      dynamicType = quickOptions[index].dynamicType
      type = Type.dynamic
      startDateType = Type.dynamic
      endDateType = Type.dynamic
    } else {
      // 自某日开始 - 只取结束时间
      endDate = option.value[1]
      dynamicType = quickRangeOptions[index - quickOptions.length].dynamicType
      type = Type.from
      startDateType = Type.static
      endDateType = Type.dynamic
    }

    onChange(startDate, endDate, dynamicType, type, startDateType, endDateType)
  }

  if (hidePreset) return null

  return (
    <section className="quick-selection">
      <div className="simple">
        {quickOptions.map((option, index) => {
          return (
            <div
              data-v={quickSelected}
              className="quick-item"
              data-selected={quickSelected === index}
              key={option.label}
              onClick={() => handleQuickDate(option, index)}
            >
              {option.label}
            </div>
          )
        })}
      </div>
      <div className="range">
        {quickRangeOptions.map((option, index) => {
          return (
            <div
              className="quick-item"
              data-selected={quickSelected === quickOptions.length + index}
              key={option.label}
              onClick={() => handleQuickDate(option, quickOptions.length + index)}
            >
              {option.label}
            </div>
          )
        })}
      </div>
    </section>
  )
})
