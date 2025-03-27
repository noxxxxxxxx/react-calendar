import { DateGranularityValue } from '@/demo/dateGranularity'
// import { Icon } from '@diezhi/jax'
import type { RadioChangeEvent } from 'antd'
import { Button, ConfigProvider, Input, Radio, message } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import type { ChangeEvent, FC, KeyboardEvent } from 'react'
import { useEffect, useRef, useState } from 'react'
import { DynamicType, Type } from '../../constant'
import { PresetProps, PresetRef } from './preset'
// import Calendar from '../calendar'
import Calendar, { ViewMode } from '@/lib'
import { DefaultProps, QUICK_DATE_OPTIONS, QuickRangeOptions, TAB_OPTIONS, Theme } from './constant'
import './datetime.scss'
import { Header } from './header'
import {
  formatNumber,
  getLocalDate,
  getType,
  isNumber,
  isValidDateString,
  toDayJs,
  transformDate,
  transformDateToText,
} from './helper'
import { Preset } from './preset'
import './style.scss'
import type { Props } from './type'

export const Panel: FC<Props> = ({
  open,
  mode,
  hidePreset,
  dateFormat,
  timezoneOffset,
  type,
  dynamicType,
  value,
  granularity,
  handleConfirm,
  handleCancel,
  startTimeLimit,
  endTimeLimit,
  startTimeConstraints,
  endTimeConstraints,
  format,
} = DefaultProps) => {
  const preStartDate = useRef<string | number>('') // input 上一次开始日期
  const preEndDate = useRef<string | number>('') // input 上一次结束日期
  const [startDate, setStartDate] = useState<string | number>('') // input 开始日期
  const [endDate, setEndDate] = useState<string | number>('') // input 结束日期
  const [quickSelected] = useState(-1) // 快捷选中下标
  const [dynamicSelectedType, setDynamicSelectedType] = useState<DynamicType | '' | undefined>(dynamicType) // 快捷选中的语义类型
  const [innerType, setInnerType] = useState<Type | undefined>(type) // 组件内部维护当前选中快捷选项对应的 type 类型
  const [startDateType, setStartDateType] = useState<Type>(
    type === Type.from || type === Type.static ? Type.static : Type.dynamic,
  ) // 开始时间 - 动静态类型
  const [endDateType, setEndDateType] = useState<Type>(type === Type.static ? Type.static : Type.dynamic) // 结束时间 - 动静态类型
  const [startDateDisabled, setStartDateDisabled] = useState<boolean>(false) // 开始时间 - 动静态禁用
  const [innerValue, setInnerValue] = useState<Dayjs[]>(value) // 组件内部维护当前选中的日期区间
  const today = getLocalDate(timezoneOffset) // 根据时区获得的今天
  const quickOptions = QUICK_DATE_OPTIONS(timezoneOffset) // 快捷选择选项
  const quickRangeOptions = QuickRangeOptions(timezoneOffset) // 快捷区间选择选项
  const labels = transformDateToText(innerValue, startDateType, endDateType, quickSelected, format, timezoneOffset) // 日期展示文案
  const presetRef = useRef<PresetRef>(null) // 快捷选择组件 ref

  /* 更新关联的日期变量 */
  const updateDate = (innerValue: Dayjs[], _endDateType = endDateType) => {
    setInnerValue(innerValue)
    innerValue.forEach((value, index) => {
      if (index === 0) {
        const result = transformDate(value, startDateType, dateFormat, timezoneOffset)
        if (result !== startDate) {
          setStartDate(result)
          preStartDate.current = result
        }
      } else {
        const result = transformDate(value, _endDateType, dateFormat, timezoneOffset)
        if (result !== endDate) {
          setEndDate(result)
          preEndDate.current = result
        }
      }
    })
  }

  /* 开日日期 动态 - 静态 变化 */
  const handleStartDateTypeChange = ({ target: { value } }: RadioChangeEvent) => {
    const type = value
    setStartDateType(value)
    const result = transformDate(innerValue[0], type, dateFormat) // 切换开始日期展示
    setStartDate(result)
    preStartDate.current = result
    handleHightLightChange(type, endDateType)
  }

  /* 结束日期 动态 - 静态 变化 */
  const handleEndDateTypeChange = ({ target: { value } }: RadioChangeEvent) => {
    let _startDateType = startDateType
    let endDateType = value
    if (endDateType === Type.static) {
      _startDateType = Type.static
      setStartDateType(_startDateType)
      setStartDateDisabled(true)
      const result = transformDate(innerValue[0], endDateType, dateFormat) // 切换开始日期展示
      setStartDate(result)
      preStartDate.current = result
    } else {
      setStartDateDisabled(false)
      // 从静态时间切换到动态时间，需要检查是否超过当天
      const newDate = innerValue
      let override = false
      if (newDate[1].isAfter(today, 'day')) {
        newDate[1] = today
        override = true
      }
      if (newDate[0].isAfter(newDate[1])) {
        newDate[0] = newDate[1]
      }
      if (override) {
        message.warning('结束日期为动态时间时最大只能选择今日')
        // messageWarn({ text: '结束日期为动态时间时最大只能选择今日', duration: 2 })
      }
    }
    setEndDateType(endDateType) // 切换结束日期展示
    const result = transformDate(innerValue[1], endDateType, dateFormat)
    setEndDate(result)
    preEndDate.current = result
    handleHightLightChange(_startDateType, endDateType)
  }

  /* 选择快捷时间选项 */
  const handleQuickDate: PresetProps['onChange'] = (
    startDate,
    endDate,
    dynamicType,
    type,
    startDateType,
    endDateType,
  ) => {
    setStartDateDisabled(false)
    setInnerType(type)
    setStartDateType(startDateType)
    setEndDateType(endDateType)
    setDynamicSelectedType(dynamicType)
    updateDate([startDate ?? innerValue[0], endDate], endDateType)
  }

  /* 手动输入开始时间 */
  const handleStartDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setDynamicSelectedType(undefined)
    if (startDateType === Type.dynamic) {
      const value = formatNumber(v) // 校验是否是合法的数字
      if (isNumber(value)) {
        updateDate([toDayJs(value), innerValue[1]])
      } else {
        setStartDate(preStartDate.current)
      }
    } else {
      setStartDate(v) // 校验是否是合法的日期字符串
    }
  }

  /* 手动输入结束时间 */
  const handleEndDateChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value
    setDynamicSelectedType(undefined)
    if (endDateType === Type.dynamic) {
      const value = formatNumber(v)
      if (isNumber(value)) {
        if (toDayJs(value).isBefore(innerValue[0], 'day')) {
          message.warning('结束时间不能小于开始时间')
          setEndDate(preEndDate.current)
        } else if (toDayJs(value).isAfter(today, 'day')) {
          message.warning('结束时间不能大于今天')
          setEndDate(preEndDate.current)
        } else {
          // 分钟和小时粒度需要设置结束小时为 23
          if (granularity.includes(DateGranularityValue.Minute) || DateGranularityValue.Hour.includes(granularity)) {
            updateDate([innerValue[0], toDayJs(value).hour(23)])
          } else {
            updateDate([innerValue[0], toDayJs(value)])
          }
        }
      } else {
        setEndDate(preEndDate.current)
      }
    } else {
      setEndDate(v)
    }
  }

  /* 开始日期失焦事件 */
  const handleStartDateBlur = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setDynamicSelectedType(undefined)
    if (startDateType === Type.static) {
      const valid = isValidDateString(value)
      if (valid) {
        // 是否超过今天
        const result = dayjs(value).startOf('day')
        if (result.isAfter(today) && mode.length === 2) {
          message.warning('开始时间不能超过当天')
        } else {
          // 超过结束日期以结束日期作为开始结束时间
          if (result.isAfter(innerValue[1], 'day')) {
            updateDate([result, result])
          } else {
            updateDate([result, innerValue[1]])
          }
        }
      } else {
        setStartDate(preStartDate.current)
      }
    } else {
      handleStartDateChange({ target: e.target } as ChangeEvent<HTMLInputElement>)
    }
  }

  /* 开始日期回车键事件 */
  const handleStartDateKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleStartDateBlur({
        target: event.target,
      } as ChangeEvent<HTMLInputElement>)
    }
  }

  /* 结束日期失焦事件 */
  const handleEndDateBlur = (e: ChangeEvent<HTMLInputElement>) => {
    setDynamicSelectedType(undefined)
    const value = e.target.value
    if (endDateType === Type.static) {
      const valid = isValidDateString(value)
      if (valid) {
        updateDate([innerValue[0], dayjs(value)])
      } else {
        setEndDate(preEndDate.current)
      }
    }
  }

  /* 结束日期回车键事件 */
  const handleEndDateKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleEndDateBlur({
        target: event.target,
      } as ChangeEvent<HTMLInputElement>)
    }
  }

  /* 开始时间禁用逻辑 */
  const handleStartDateValid = (currentDate: Dayjs) => {
    if (currentDate.isAfter(innerValue[1], 'day') && startDateType === Type.dynamic) {
      return false
    }
    return true
  }

  /* 结束时间禁用逻辑 */
  const handleEndDateValid = (currentDate: Dayjs) => {
    // 大于当天 ｜ 小于开始日期
    if (
      (currentDate.isAfter(today, 'day') && endDateType === Type.dynamic) ||
      currentDate.isBefore(innerValue[0], 'day') ||
      (endDateType === Type.static && currentDate.startOf('day').diff(innerValue[0], 'day') > 1)
    ) {
      return false
    }
    return true
  }

  /* 日历开始时间切换 */
  const handleStartCalendarChange = (value: Dayjs) => {
    const now = dayjs()
    let result: Dayjs[] = []
    let _endDateType = endDateType
    // 超过结束日期以结束日期作为开始结束时间
    if (dayjs(value).isAfter(innerValue[1], 'day')) {
      if (_endDateType === Type.dynamic) {
        message.warning('开始时间大于当前时间结束日期类型须为静态时间')
        // messageWarn({ text: '开始时间大于当前时间结束日期类型须为静态时间', duration: 2 })
      }
      result = [value, value]
      _endDateType = Type.static
      setEndDateType(Type.static)
    } else {
      result = [value, innerValue[1]]
    }
    // 开始时间和结束时间相差大于1天，校正结束时间
    if (Math.abs(value.startOf('day').diff(innerValue[1], 'day')) > 1) {
      result = [
        value,
        value
          .add(1, 'day')
          .hour(now.hour())
          .minute(now.minute() - 5)
          .second(0),
      ]
    }
    updateDate(result, _endDateType)
  }

  /* 日历结束时间切换 */
  const handleEndCalendarChange = (value: Dayjs | string) => {
    const result = [innerValue[0], value]
    updateDate(result as Dayjs[])
  }

  /* 点击应用 */
  const confirm = () => {
    handleConfirm({
      labels,
      value: innerValue,
      type: getType(startDateType, endDateType),
      dynamicType: dynamicSelectedType,
    })
  }

  /* 点击取消 */
  const cancel = () => {
    handleCancel()
  }

  /* 处理预设选项高亮 */
  const handleHightLightChange = (startDateType: Type, endDateType: Type) => {
    debugger
    if (innerType === Type.from) {
      //  自某日至-
      if (startDateType === Type.static && endDateType === Type.dynamic) {
        const matchIndex = quickRangeOptions.findIndex((option) => option.value[1].isSame(innerValue[1], 'day'))
        if (matchIndex > -1) {
          presetRef.current?.updateSelectedOption(matchIndex + quickOptions.length)
          setDynamicSelectedType(quickRangeOptions[matchIndex]?.dynamicType)
        } else {
          setInnerType(undefined) // 类型符合但是结束时间不符合,取消高亮
          presetRef.current?.updateSelectedOption(-1)
          setDynamicSelectedType(undefined)
        }
      } else {
        // 类型切换 取消高亮
        presetRef.current?.updateSelectedOption(-1)
        setDynamicSelectedType(undefined)
      }
    } else if (startDateType === Type.dynamic && endDateType === Type.dynamic) {
      // 动态时间
      const matchIndex: number[] = []
      quickOptions.forEach((option, index) => {
        if (option.value[0].isSame(innerValue[0], 'day') && option.value[1].isSame(innerValue[1], 'day')) {
          matchIndex.push(index)
        }
      })
      // 当点击快捷日期时会遇到：本周和今日是同一天 ，最近7天和本周相同，本月和本周相同，过去7天和上周相同
      if (matchIndex.includes(quickSelected)) {
        return
      }
      // 首次打开弹窗的情况，matchIndex和传入的快捷选项会不一致，上周和过去七天重合的情况
      if (quickSelected === -1 && dynamicSelectedType) {
        matchIndex.forEach((index) => {
          if (quickOptions[index]?.dynamicType === dynamicSelectedType) {
            presetRef.current?.updateSelectedOption(index)
          }
        })
      } else {
        presetRef.current?.updateSelectedOption(matchIndex[0])
        setDynamicSelectedType(quickOptions[matchIndex[0]]?.dynamicType)
      }
    } else {
      presetRef.current?.updateSelectedOption(-1)
      setDynamicSelectedType(undefined)
    }
  }

  /* 监听打开状态变化 */
  useEffect(() => {
    if (open) {
      updateDate(value)
      presetRef.current?.updateSelectedOption(-1)
      setDynamicSelectedType(dynamicType)
      setStartDateDisabled(type === Type.static)
      if (mode.length === 1) {
        setStartDateType(mode[0])
        setEndDateType(mode[0])
      }
    }
  }, [open])

  /* 是否展示时分秒配置 */
  const isShowTime =
    granularity.includes(DateGranularityValue.Minute) || DateGranularityValue.Hour.includes(granularity)

  return (
    <ConfigProvider theme={Theme}>
      <section className="datetime-container">
        <Header
          value={innerValue}
          type={innerType}
          format={format}
          startDateType={startDateType}
          endDateType={endDateType}
          presetSelected={quickSelected}
          timezoneOffset={timezoneOffset}
        />
        <div className="content-container">
          <Preset
            ref={presetRef}
            hidePreset={hidePreset}
            granularity={granularity}
            onChange={handleQuickDate}
            timezoneOffset={timezoneOffset}
          />
          <section className="date-range-selection">
            <div className="main">
              <div className="start-container">
                <Radio.Group
                  buttonStyle="solid"
                  value={startDateType}
                  options={TAB_OPTIONS.filter((t) => mode.includes(t.value)).map((item) => {
                    if (item.value === Type.dynamic) {
                      return {
                        ...item,
                        disabled: startDateDisabled,
                      }
                    }
                    return item
                  })}
                  onChange={handleStartDateTypeChange}
                  optionType="button"
                />
                <div className="input-wrap">
                  <Input
                    value={startDate}
                    style={{ width: 179 }}
                    onChange={handleStartDateChange}
                    onBlur={handleStartDateBlur}
                    onKeyDown={handleStartDateKeyDown}
                  />
                  <span className="time-ago">{startDateType === Type.dynamic ? '天前' : ''}</span>
                </div>
                <Calendar
                  open={true}
                  closeOnClickOutside={false}
                  closeOnSelect={false}
                  showInput={false}
                  siblingDate={innerValue[1]}
                  value={innerValue[0]}
                  isValidDate={handleStartDateValid}
                  onChange={handleStartCalendarChange}
                  showTime={isShowTime}
                  timezoneOffset={timezoneOffset}
                  viewMode={ViewMode.Day}
                  timeLimit={startTimeLimit}
                  timeConstraints={startTimeConstraints}
                />
              </div>
              <div className="end-container">
                <Radio.Group
                  defaultValue="dynamic"
                  buttonStyle="solid"
                  value={endDateType}
                  options={TAB_OPTIONS.filter((t) => mode.includes(t.value))}
                  onChange={handleEndDateTypeChange}
                  optionType="button"
                />
                <div className="input-wrap">
                  {/* <Icon
                    className="arrow-right"
                    type="ArrowRightPlatform"
                  /> */}
                  <Input
                    value={endDate}
                    style={{ width: 179 }}
                    onChange={handleEndDateChange}
                    onBlur={handleEndDateBlur}
                    onKeyDown={handleEndDateKeyDown}
                  />
                  <span className="time-ago">{endDateType === Type.dynamic ? '天前' : ''}</span>
                </div>
                <Calendar
                  open={true}
                  closeOnClickOutside={false}
                  closeOnSelect={false}
                  showInput={false}
                  value={innerValue[1]}
                  onChange={handleEndCalendarChange}
                  siblingDate={innerValue[0]}
                  isValidDate={handleEndDateValid}
                  showTime={isShowTime}
                  isEndDate={true}
                  timezoneOffset={timezoneOffset}
                  viewMode={ViewMode.Day}
                  timeLimit={endTimeLimit}
                  timeConstraints={endTimeConstraints}
                />
              </div>
            </div>
            <div className="footer">
              <Button onClick={cancel}>取消</Button>
              <Button
                type="primary"
                onClick={confirm}
              >
                应用
              </Button>
            </div>
          </section>
        </div>
      </section>
    </ConfigProvider>
  )
}
