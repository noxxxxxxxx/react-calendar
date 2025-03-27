import { validateDateRange } from '../utils'
// import { Icon } from '@diezhi/jax'
import { App, Button, Popover } from 'antd'
import type { Dayjs } from 'dayjs'
import dayjs from 'dayjs'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { DateGranularityValue } from '../dateGranularity'
import { DateFormat, DateTimeScene, Type } from './constant'
import type { PanelConfirmParams } from './core'
import { Panel, transformDateToText } from './core'
import { QUICK_DATE_OPTIONS } from './core/panel/constant'
import { formatTimeValue } from './helper'
import './style.scss'
import { type DateTimeValue, type Props } from './type'

export const DateTime: FC<Props> = ({
  value,
  hidePreset = false,
  sortBy,
  type,
  mode = [Type.dynamic, Type.static],
  startDateDiff,
  endDateDiff,
  granularity,
  dynamicType,
  timezoneOffset,
  defaultOpen = false,
  beforeConfirm,
  afterConfirm,
  afterCancel,
  disabled,
  startTimeLimit,
  endTimeLimit,
  startTimeConstraints,
  endTimeConstraints,
  initialStartTime = dayjs().format('HH:mm:ss'),
  initialEndTime = dayjs().format('HH:mm:ss'),
  scene = DateTimeScene.Default,
  format = DateFormat,
}) => {
  const { message } = App.useApp()
  const [open, setOpen] = useState(false)
  const [labels, setLabels] = useState<string[]>([]) // 展示文案
  const [innerValue, setInnerValue] = useState<Dayjs[]>([]) // 内部维护开始时间-结束时间
  const [innerType, setInnerType] = useState<Type>(type || Type.dynamic) // 动态/静态/from
  const [innerGranularity, setInnerGranularity] = useState<DateGranularityValue>(DateGranularityValue.Day) // 颗粒度
  const [innerTmezoneOffset, setInnerTimezoneOffset] = useState<undefined | number>(undefined) // 时区偏移量

  /* 确认 */
  const handleConfirm = (params: PanelConfirmParams) => {
    const value = params.value
    const startDateDiff = dayjs().startOf('day').diff(dayjs(params.value[0]).startOf('day'), 'day')
    const endDateDiff = dayjs().startOf('day').diff(dayjs(params.value[1]).startOf('day'), 'day')
    // 分钟/小时的场景下校验，日期切换时会在 panel 组件内进行校验
    if (value[0].isAfter(value[1])) {
      return message.warning('开始日期大于结束日期')
    }
    // 校验是否符合日期粒度
    const validMsg = validateDateRange(sortBy ?? DateGranularityValue.Day, [startDateDiff, endDateDiff])
    if (validMsg && mode.includes(Type.dynamic)) {
      return message.warning(validMsg)
    }
    const result: DateTimeValue = {
      sortBy: sortBy || DateGranularityValue.Day,
      type: params.type,
      staticDate: params.value.map((item: Dayjs) => {
        // return item.format(foramtStr(sortBy))
        return item.format('YYYY-MM-DD HH:mm:ss') // todo
      }),
      startDateDiff,
      endDateDiff,
      dynamicType: params.dynamicType || undefined,
    }
    if (beforeConfirm) {
      beforeConfirm().then((res) => {
        if (res) {
          setOpen(false)
          setLabels(params.labels)
          afterConfirm?.(result)
          setInnerValue(params.value)
          setInnerType(params.type)
        }
      })
    } else {
      setOpen(false)
      setLabels(params.labels)
      afterConfirm?.(result)
      setInnerValue(params.value)
      setInnerType(params.type)
    }
  }

  const handleCancel = () => {
    setOpen(false)
  }

  const handleOpenChange = (value: boolean) => {
    setOpen(value)
  }

  const handleAfterOpenChange = (value: boolean) => {
    if (!value) {
      afterCancel?.()
    }
  }

  /* 初始化日期组件配置 */
  const init = () => {
    const offset = timezoneOffset === 'local' || !timezoneOffset ? undefined : Number(timezoneOffset)
    setInnerTimezoneOffset(offset)
    let startDiff = Number(startDateDiff) ?? 7
    let endDiff = Number(endDateDiff) ?? 1
    let startDateType = type || Type.dynamic
    let endDateType = type || Type.dynamic
    const quickOptions = QUICK_DATE_OPTIONS(offset)
    const quickSelected = quickOptions.findIndex((option) => option.dynamicType === dynamicType)
    const startTime = formatTimeValue(initialStartTime, sortBy, (value?.[0] as Dayjs) ?? dayjs())
    const endTime = formatTimeValue(initialEndTime, sortBy, (value?.[1] as Dayjs) ?? dayjs())
    let result: Dayjs[] = []
    if (value) {
      if (type === Type.dynamic && (startDateDiff === undefined || endDateDiff === undefined)) {
        return console.error('动态时间，需要传入【开始日期偏移量】和【结束日期偏移量】参数')
      }
      // 选择快捷日期后需要动态调整 diff 值
      if (dynamicType && quickSelected > -1) {
        const [start, end] = quickOptions[quickSelected].value.map((v) =>
          dayjs().startOf('day').diff(dayjs(v).startOf('day'), 'day'),
        )
        startDiff = start
        endDiff = end
      }
      if (type === Type.dynamic) {
        if (offset) {
          result = [
            dayjs()
              .utcOffset(offset)
              .subtract(startDiff, 'day')
              .startOf('day')
              .set('hour', startTime.hours)
              .set('minute', startTime.minutes)
              .set('second', startTime.seconds),
            dayjs()
              .utcOffset(offset)
              .subtract(endDiff, 'day')
              .startOf('day')
              .set('hour', endTime.hours)
              .set('minute', endTime.minutes)
              .set('second', endTime.seconds),
          ]
        } else {
          result = [
            dayjs()
              .subtract(startDiff, 'day')
              .startOf('day')
              .set('hour', startTime.hours)
              .set('minute', startTime.minutes)
              .set('second', startTime.seconds),
            dayjs()
              .subtract(endDiff, 'day')
              .startOf('day')
              .set('hour', endTime.hours)
              .set('minute', endTime.minutes)
              .set('second', endTime.seconds),
          ]
        }
      } else if (type === Type.from) {
        if (offset) {
          result = [
            dayjs(value[0])
              .startOf('day')
              .set('hour', startTime.hours)
              .set('minute', startTime.minutes)
              .set('second', startTime.seconds),
            dayjs()
              .utcOffset(offset)
              .subtract(endDateDiff!, 'day')
              .startOf('day')
              .set('hour', endTime.hours)
              .set('minute', endTime.minutes)
              .set('second', endTime.seconds),
          ]
        } else {
          result = [
            dayjs(value[0])
              .startOf('day')
              .set('hour', startTime.hours)
              .set('minute', startTime.minutes)
              .set('second', startTime.seconds),
            dayjs()
              .subtract(endDateDiff!, 'day')
              .startOf('day')
              .set('hour', endTime.hours)
              .set('minute', endTime.minutes)
              .set('second', endTime.seconds),
          ]
        }
      } else {
        result = [
          dayjs(value[0])
            .startOf('day')
            .set('hour', startTime.hours)
            .set('minute', startTime.minutes)
            .set('second', startTime.seconds),
          dayjs(value[1])
            .startOf('day')
            .set('hour', endTime.hours)
            .set('minute', endTime.minutes)
            .set('second', endTime.seconds),
        ]
      }
      if (type === Type.from) {
        startDateType = Type.static
        endDateType = Type.dynamic
      }
      const labels = transformDateToText(result, startDateType, endDateType, quickSelected, format, offset)
      console.log(labels)
      setLabels(labels)
      setInnerType(type || Type.dynamic) // 默认为动态时间
      setInnerValue(result)
      setInnerGranularity(sortBy || granularity || DateGranularityValue.Day) // 默认为天选择
    } else {
      if (offset) {
        result = [
          dayjs().utcOffset(offset).subtract(startDiff, 'day').startOf('day'),
          dayjs().utcOffset(offset).subtract(endDiff, 'day').startOf('day'),
        ]
      } else {
        result = [dayjs().subtract(startDiff, 'day').startOf('day'), dayjs().subtract(endDiff, 'day').startOf('day')]
      }
      const labels = transformDateToText(result, startDateType, endDateType, quickSelected, format, offset)
      setLabels(labels)
      setInnerType(type || Type.dynamic) // 默认为动态时间
      setInnerValue(result)
      setInnerGranularity(sortBy || granularity || DateGranularityValue.Day) // 默认为天选择
    }
  }

  useEffect(() => {
    init() // 根据传入的数据进行初始化
  }, [value, timezoneOffset, startDateDiff, endDateDiff, type, sortBy, granularity, dynamicType])

  useEffect(() => {
    setOpen(defaultOpen)
  }, [defaultOpen])

  return (
    <Popover
      content={() => (
        <Panel
          open={open}
          mode={mode}
          format={format}
          value={innerValue}
          type={innerType}
          hidePreset={hidePreset}
          dateFormat={DateFormat}
          dynamicType={dynamicType}
          granularity={innerGranularity}
          timezoneOffset={innerTmezoneOffset}
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
          startTimeLimit={startTimeLimit}
          endTimeLimit={endTimeLimit}
          startTimeConstraints={startTimeConstraints}
          endTimeConstraints={endTimeConstraints}
        />
      )}
      fresh
      destroyTooltipOnHide
      open={open && !disabled}
      arrow={false}
      trigger="click"
      autoAdjustOverflow
      placement="bottomLeft"
      onOpenChange={handleOpenChange}
      afterOpenChange={handleAfterOpenChange}
      styles={{
        body: {
          padding: 0,
          width: 'fit-content',
        },
      }}
    >
      {scene === DateTimeScene.Dashboard ? (
        <div className="cursor-pointer text-neutral-1100 text-13px hover:text-brand-600">{labels.join(' → ')}</div>
      ) : (
        <Button
          disabled={disabled}
          className="shadow-none datetime-btn"
        >
          {labels.join(' → ')}
          {/* <Icon
            className="text-14px text-neutral-600"
            type="CalendarPlatform"
          /> */}
        </Button>
      )}
    </Popover>
  )
}
