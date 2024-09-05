import { Props, State, ViewMode } from '@/index.d'
import type { Dayjs, ManipulateType, UnitTypeLong } from 'dayjs'
import dayjs from 'dayjs'
import { FC, MouseEvent, useEffect, useRef } from 'react'
import { useImmer } from 'use-immer'
import { NextView, timeConstraints, ViewToMethod } from './constant'
import { formatDate, getDateFormat, getLocalDate, getTimeFormat } from './helper'
import useClickOutside from './helper/useClickoutside'
import { Input } from './input'
import './style.scss'
import { Day } from './view/day'
import { Month } from './view/month/month'
import { Time } from './view/time/time'
import { Year } from './view/year/year'

export const Calendar: FC<Props> = (props) => {
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
    timeLimit = 'HH:mm:ss',
    showTime = true,
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
  } = props

  const [state, updateState] = useImmer<State>({
    open: open ?? false,
    selectedDate: dayjs(formatDate(value || initialValue, timezoneOffset, dateFormat, timeFormat)),
    inputValue: undefined,
    currentView: viewMode || initialViewMode,
    viewDate: getLocalDate(timezoneOffset),
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

    updateState((draft) => {
      draft.open = true
    })
    onOpen?.()
  }

  const closeCalendar = () => {
    if (!isOpen()) return

    updateState((draft) => {
      draft.open = false
    })
    onClose?.(state.selectedDate)
  }

  const _showView = (nextView: ViewMode, date: Dayjs) => {
    const d = (date || state.viewDate).clone()
    const nextViewMode = onBeforeNavigate?.(nextView, state.currentView, d)
    const next = nextViewMode ?? nextView
    onNavigate?.(next)
    updateState((draft) => {
      draft.currentView = next
    })
  }

  const updateDate = (e: MouseEvent) => {
    const target = e.target as HTMLElement
    if (target) {
      const currentView = state.currentView
      let viewDate: Dayjs
      const value = Number(target.dataset.value)
      const year = Number(target.dataset.year)
      const month = Number(target.dataset.month)

      if (currentView === ViewMode.Day) {
        viewDate = state.viewDate.clone().year(year).month(month).date(value).hour(state.viewDate.hour())
        updateState((draft) => {
          draft.selectedDate = viewDate.clone()
        })
      } else {
        const key = ViewToMethod[currentView]
        // @ts-expect-error ts defination
        viewDate = state.viewDate[key](value)
      }

      const result = viewDate.clone()
      updateState((draft) => {
        draft.viewDate = result
      })
      onChange?.(result)

      // close immediately when select date
      if (currentView === viewMode || (closeOnSelect && viewMode === undefined && currentView === ViewMode.Day)) {
        updateState((draft) => {
          draft.selectedDate = viewDate.clone()
        })
        closeCalendar()
        return
      }

      updateState((draft) => {
        draft.currentView = NextView[currentView]
      })
    }
  }

  const navigate = (modifier: number, unit: ViewMode) => {
    let viewDate = state.viewDate.clone()

    // Subtracting is just adding negative time
    viewDate = viewDate.add(modifier, unit as ManipulateType)

    const navigateTo = modifier > 0 ? onNavigateForward : onNavigateBack
    navigateTo?.(modifier, unit)

    updateState((draft) => {
      draft.viewDate = viewDate
    })
  }

  const setTime = (type: UnitTypeLong, v: number) => {
    let date = state.viewDate?.clone()

    if (date) {
      date = date[type](v)
      updateState((draft) => {
        if (date) {
          draft.selectedDate = date
          draft.viewDate = date?.clone()
        }
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
      dayjs: dayjs,
      showView: _showView,
      timezoneOffset,
      isEndDate: false,
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
      updateState((draft) => {
        draft.selectedDate = selectedDate
        draft.viewDate = selectedDate.clone()
        draft.ready = true
      })
    } else {
      updateState((draft) => {
        draft.ready = true
      })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        onInputChange={onChange}
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
