import { NextView, ViewToMethod } from '@/lib/calendar/constant'
import { formatDate, getDateFormat, getTimeFormat } from '@/lib/calendar/helper'
import useClickOutside from '@/lib/calendar/helper/useClickoutside'
import { Input } from '@/lib/calendar/input'
import '@/lib/calendar/style.scss'
import { Props, State } from '@/lib/calendar/type'
import { Day } from '@/lib/calendar/view/day'
import { Month } from '@/lib/calendar/view/month/month'
import { Time } from '@/lib/calendar/view/time/time'
import { Year } from '@/lib/calendar/view/year/year'
import type { Dayjs, ManipulateType, UnitTypeLong } from 'dayjs'
import dayjs from 'dayjs'
import { FC, MouseEvent, useEffect, useRef, useState } from 'react'
import { ViewMode } from '..'

const Calendar: FC<Props> = (props) => {
  const {
    value,
    initialValue,
    initialViewMode = ViewMode.Day,
    timezoneOffset,
    closeOnSelect = true,
    className,
    showInput = true,
    open,
    inputProps,
    dateFormat = true,
    timeFormat = true,
    viewMode,
    closeOnClickOutside = true,
    timeLimit = 'HH:mm:ss', // 24 小时制
    showTime = true,
    isEndDate,
    siblingDate,
    isValidDate,
    renderYear,
    renderMonth,
    renderDay,
    onOpen,
    onClose,
    onChange,
    onBeforeNavigate,
    onNavigate,
    onNavigateForward,
    onNavigateBack,
    timeConstraints,
  } = props

  const [state, setState] = useState<State>({
    open: open ?? false,
    selectedDate: dayjs(formatDate(value || initialValue, timezoneOffset, dateFormat, timeFormat)),
    inputValue: undefined,
    currentView: viewMode || initialViewMode,
    viewDate: dayjs(formatDate(value || initialValue, timezoneOffset, dateFormat, timeFormat)),
    ready: false,
  })
  const ref = useRef<HTMLDivElement>(null)

  const isOpen = () => {
    return state.open || open === false
  }

  const getClassName = () => {
    let cn = 'rdt'
    const propCn = className

    if (Array.isArray(propCn)) {
      cn += ' ' + propCn.join(' ')
    } else if (propCn) {
      cn += ' ' + propCn
    }

    if (!showInput) {
      cn += ' nc-static'
    }
    if (isOpen()) {
      cn += ' nc-open'
    }

    return cn
  }

  const openCalendar = () => {
    if (isOpen()) return

    setState({
      ...state,
      open: true,
    })
    onOpen?.()
  }

  const closeCalendar = (data?: State) => {
    if (!isOpen()) return

    const result = {
      ...state,
      ...(data ?? {}),
      open: !closeOnSelect,
    }

    setState(result)

    if (closeOnSelect) {
      onClose?.(result.selectedDate)
    }
  }

  const _showView = (nextView: ViewMode, date: Dayjs) => {
    const d = (date || state.viewDate).clone()
    const nextViewMode = onBeforeNavigate?.(nextView, state.currentView, d)
    const next = nextViewMode ?? nextView
    onNavigate?.(next)
    setState({
      ...state,
      currentView: next,
    })
  }

  const updateDate = (e: MouseEvent) => {
    const t = e.target as HTMLElement
    if (t) {
      const currentView = state.currentView
      let viewDate: Dayjs
      const value = Number(t.dataset.value)
      const year = Number(t.dataset.year)
      const month = Number(t.dataset.month)
      const target: any = {}

      if (currentView === ViewMode.Day) {
        viewDate = state.viewDate.clone().year(year).month(month).date(value).hour(state.viewDate.hour())
        target.selectedDate = viewDate.clone()
      } else {
        const key = ViewToMethod[currentView]
        // @ts-expect-error ts defination
        viewDate = state.viewDate[key](value)
      }

      target.viewDate = viewDate.clone()
      onChange?.(target.viewDate)

      // close immediately when select date
      if (currentView === viewMode) {
        target.selectedDate = viewDate.clone()
        const newState = {
          ...state,
          ...target,
        }
        setState(newState)

        closeCalendar(newState)
        return
      }

      target.currentView = NextView[currentView]
      setState({
        ...state,
        ...target,
      })
    }
  }

  const navigate = (modifier: number, unit: ViewMode) => {
    let viewDate = state.viewDate.clone()

    // Subtracting is just adding negative time
    viewDate = viewDate.add(modifier, unit as ManipulateType)

    const navigateTo = modifier > 0 ? onNavigateForward : onNavigateBack
    navigateTo?.(modifier, unit)

    setState({
      ...state,
      viewDate,
    })
  }

  const setTime = (type: UnitTypeLong, v: number) => {
    let date = state.viewDate?.clone()

    if (date) {
      date = date.set(type, v)

      setState({
        ...state,
        selectedDate: date,
        viewDate: date.clone(),
      })
      onChange?.(date)
    }
  }

  /* 渲染日历 */
  const renderCalendar = () => {
    const viewProps = {
      selectedDate: state.selectedDate,
      viewDate: state.viewDate,
      updateDate,
      navigate,
      showView: _showView,
      timezoneOffset,
      isEndDate,
      siblingDate,
      isValidDate,
      renderYear,
      renderMonth,
      renderDay,
      setTime,
      dateFormat: getDateFormat(dateFormat),
      timeFormat: getTimeFormat(timeFormat),
      timeConstraints,
      timeLimit,
      showTime,
    }

    switch (state.currentView) {
      case ViewMode.Year:
        return <Year {...viewProps} />

      case ViewMode.Month:
        return <Month {...viewProps} />

      case ViewMode.Time:
        return <Time {...viewProps} />

      default:
        return <Day {...viewProps} />
    }
  }

  useClickOutside(ref, () => {
    if (!closeOnClickOutside) return
    closeCalendar()
  })

  useEffect(() => {
    if (value) {
      const selectedDate = dayjs(formatDate(value, timezoneOffset, dateFormat, timeFormat))
      setState({
        ...state,
        selectedDate,
        viewDate: selectedDate.clone(),
        ready: true,
      })
    } else {
      setState({
        ...state,
        ready: true,
      })
    }
  }, [value, timezoneOffset, dateFormat, timeFormat])

  if (!state.ready) return null

  return (
    <div
      className={getClassName()}
      ref={ref}
    >
      <Input
        showInput={showInput}
        value={state.selectedDate}
        dateFormat={dateFormat}
        timeFormat={timeFormat}
        inputProps={inputProps}
        openCalendar={openCalendar}
        closeCalendar={closeCalendar}
        timezoneOffset={timezoneOffset}
        onInputChange={(value) => onChange?.(dayjs(value))}
      />
      <div
        className="nc-picker"
        onClick={(e) => e.stopPropagation()}
      >
        {open === false ? null : state.open ? renderCalendar() : null}
      </div>
    </div>
  )
}

export default Calendar
