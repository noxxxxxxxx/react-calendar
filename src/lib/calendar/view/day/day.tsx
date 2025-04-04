import { getDaysOfWeek, getLocalDate } from '@/lib/calendar/helper'
import ViewNavigation from '@/lib/calendar/parts/navigation'
import { DayProps, WraperProps } from '@/lib/calendar/type'
import type { Dayjs, InstanceLocaleDataReturn } from 'dayjs'
import { FC, MouseEvent, ReactNode } from 'react'
import { ViewMode } from '../../constant'

export const Day: FC<DayProps> = (props) => {
  const {
    viewDate,
    selectedDate,
    isValidDate = () => true,
    updateDate,
    renderDay,
    navigate,
    showView,
    timeFormat,
    siblingDate,
    timezoneOffset,
    showTime,
  } = props

  /* 渲染导航 */
  const renderNavigation = () => {
    const locale = viewDate?.localeData()
    return (
      <ViewNavigation
        onClickPrev={() => navigate(-1, ViewMode.Month)}
        onClickSwitch={() => showView(ViewMode.Month)}
        onClickNext={() => navigate(1, ViewMode.Month)}
        switchContent={`${locale?.months(viewDate)} ${viewDate?.year()}`}
        switchColSpan={5}
        switchProps={{ 'data-value': viewDate?.month() }}
      />
    )
  }

  /* 渲染 周一～周日 */
  const renderDayHeaders = () => {
    const locale = viewDate?.localeData()
    const dayItems = getDaysOfWeek(locale as InstanceLocaleDataReturn)?.map((day, index) => (
      <th
        key={day + index}
        className="dow"
      >
        {day}
      </th>
    ))
    return <tr>{dayItems}</tr>
  }

  /* 构造渲染数据 */
  const _renderDay = (date: Dayjs, startOfMonth: Dayjs | undefined, endOfMonth: Dayjs | undefined, today: Dayjs) => {
    const day = date.date()
    const month = date.month()
    const year = date.year()

    const _setDate = (e: MouseEvent) => {
      updateDate(e)
    }

    const dayProps: WraperProps = {
      'key': date.format('M_D'),
      'data-value': day,
      'data-month': month,
      'data-year': year,
      'onClick': () => {},
      'className': '',
    }

    let className = 'nc-day'
    if (date.isBefore(startOfMonth)) {
      className += ' nc-before'
    } else if (date.isAfter(endOfMonth)) {
      className += ' nc-after'
    }

    if (selectedDate?.isBefore(siblingDate, 'day')) {
      if (date.isBefore(siblingDate, 'day') && date.isAfter(selectedDate, 'day')) {
        className += ' in-range'
      }
    }
    if (siblingDate && selectedDate?.isAfter(siblingDate, 'day')) {
      if (siblingDate && date.isAfter(siblingDate, 'day') && date.isBefore(selectedDate, 'day')) {
        className += ' in-range'
      }
    }
    if (siblingDate?.isSame(date, 'day')) {
      className += ' nc-sibling'
    }
    if (selectedDate?.isSame(date, 'day')) {
      className += ' nc-active'
    }
    if (date.isSame(today, 'day')) {
      className += ' nc-today'
    }

    if (isValidDate(date.clone().year(year).month(month).date(day).startOf('day'))) {
      dayProps.onClick = _setDate
    } else {
      className += ' nc-disabled'
    }

    dayProps.className = className

    if (renderDay) {
      return renderDay(dayProps, date.clone().date(), selectedDate?.clone())
    }

    return (
      <td
        {...dayProps}
        key={dayProps.key}
      >
        {date.clone().date()}
      </td>
    )
  }

  /* 渲染天 */
  const renderDays = () => {
    const today = getLocalDate(timezoneOffset)
    const date = viewDate
    const startOfMonth = date?.clone().startOf('month')
    const endOfMonth = date?.clone().endOf('month')

    // We need 42 days in 6 rows
    // starting in the last week of the previous month
    const rows: ReactNode[][] = [[], [], [], [], [], []]

    let startDate = date?.clone().subtract(1, 'month').endOf('month').startOf('week').startOf('day')

    const endDate = startDate?.clone().add(42, 'day')

    let i = 0

    while (startDate?.isBefore(endDate)) {
      const index = Math.floor(i / 7)
      const row = rows[index > 5 ? 5 : index]
      const day = _renderDay(startDate, startOfMonth, endOfMonth, today)
      row.push(day)
      startDate = startDate.add(1, 'd')
      i += 1
    }

    return rows.map((r, i) => <tr key={`${endDate?.month()}_${i}`}>{r}</tr>)
  }

  const renderFooter = () => {
    if (!showTime || !timeFormat) return

    return (
      <tfoot>
        <tr>
          <td
            onClick={() => showView('time')}
            colSpan={7}
            className="nc-time-toggle"
          >
            {viewDate?.format(timeFormat as string)}
          </td>
        </tr>
      </tfoot>
    )
  }

  return (
    <div className="nc-days">
      <table>
        <thead>
          {renderNavigation()}
          {renderDayHeaders()}
        </thead>
        <tbody>{renderDays()}</tbody>
        {renderFooter()}
      </table>
    </div>
  )
}
