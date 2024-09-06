import { callHandler, formatDate } from '@/lib/calendar/helper'
import { InputProps } from '@/lib/calendar/type'
import dayjs from 'dayjs'
import { ChangeEvent, FC, KeyboardEvent, MouseEvent, useEffect, useState } from 'react'

export const Input: FC<InputProps> = (props) => {
  const {
    value,
    showInput,
    timezoneOffset,
    dateFormat,
    timeFormat,
    inputProps,
    onInputChange,
    openCalendar,
    closeCalendar,
  } = props

  const [localValue, setLocalValue] = useState('')

  useEffect(() => {
    setLocalValue(formatDate(value, timezoneOffset, dateFormat, timeFormat) ?? '')
  }, [value, timezoneOffset, dateFormat, timeFormat])

  if (!showInput) return

  const onFocus = (e: ChangeEvent<HTMLInputElement>) => {
    if (!callHandler(inputProps?.onFocus, e)) return
    openCalendar?.()
  }

  const onClick = (e: MouseEvent<HTMLInputElement>) => {
    if (!callHandler(inputProps?.onClick, e)) return
    openCalendar?.()
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!callHandler(inputProps?.onChange, e)) return
    const value = e.target.value
    const result = dayjs(value).isValid() ? formatDate(dayjs(value), timezoneOffset, dateFormat) : value
    setLocalValue(value)
    onInputChange?.(result ?? '')
  }

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!callHandler(inputProps?.onKeyDown, e)) return
    if (e.key === 'Tab') {
      closeCalendar()
    }
  }

  const FinalProps = {
    ...inputProps,
    type: 'text',
    value: localValue,
    onFocus,
    onChange,
    onKeyDown,
    onClick,
  }

  return <input {...FinalProps} />
}
