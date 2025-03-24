import { capitalize, getRow } from '@/lib/calendar/helper'
import ViewNavigation from '@/lib/calendar/parts/navigation'
import { MonthProps, WraperProps } from '@/lib/calendar/type'
import { FC, MouseEvent, ReactNode } from 'react'
import { ViewMode } from '../../constant'

export const Month: FC<MonthProps> = (props) => {
  const { viewDate, updateDate, renderMonth, isValidDate, navigate, showView, selectedDate } = props

  const renderNavigation = () => {
    const year = viewDate?.year()
    return (
      <ViewNavigation
        onClickPrev={() => navigate(-1, ViewMode.Year)}
        onClickSwitch={() => showView(ViewMode.Year)}
        onClickNext={() => navigate(1, ViewMode.Year)}
        switchContent={year}
        switchColSpan="2"
      />
    )
  }

  const isDisabledMonth = (month: number) => {
    if (!isValidDate || !viewDate) {
      return false
    }

    const date = viewDate?.clone().set('month', month)
    let day = date.endOf('month').date() + 1

    while (day-- > 1) {
      if (isValidDate(date.date(day))) {
        return false
      }
    }
    return true
  }

  const getMonthText = (month: number) => {
    const monthStr = viewDate?.localeData().monthsShort(viewDate.month(month))
    return capitalize(monthStr as unknown as string)
  }

  /* 设置月的数据结构 */
  const _renderMonth = (month: number) => {
    let className = 'nc-month'
    let onClick: WraperProps['onClick'] = () => {}

    if (isDisabledMonth(month)) {
      className += ' nc-disabled'
    } else {
      onClick = (e: MouseEvent) => {
        updateDate(e)
      }
    }

    if (selectedDate && selectedDate.year() === viewDate?.year() && selectedDate.month() === month) {
      className += ' nc-active'
    }

    const props: WraperProps = { 'key': month, className, 'data-value': month, onClick }

    if (renderMonth) {
      return renderMonth(props, month, selectedDate?.year(), selectedDate?.clone())
    }

    return (
      <td
        {...props}
        key={props.key}
      >
        {getMonthText(month)}
      </td>
    )
  }

  const renderMonths = () => {
    // 12 months in 3 rows for every view
    const rows: ReactNode[][] = [[], [], []]

    for (let month = 0; month < 12; month++) {
      const row = getRow(rows, month)

      row.push(_renderMonth(month))
    }

    return rows.map((months, i) => <tr key={i}>{months}</tr>)
  }

  return (
    <div className="nc-months">
      <table>
        <thead>{renderNavigation()}</thead>
      </table>
      <table>
        <tbody>{renderMonths()}</tbody>
      </table>
    </div>
  )
}
