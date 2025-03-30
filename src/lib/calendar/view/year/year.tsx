import ViewNavigation from '@/lib/calendar/parts/navigation'
import { WraperProps, YearProps } from '@/lib/calendar/type'
import { FC, MouseEvent, ReactNode } from 'react'
import { ViewMode } from '../../constant'

export const Year: FC<YearProps> = (props) => {
  const { renderYear, navigate, showView, viewDate, selectedDate, updateDate, isValidDate } = props

  const isDisabledYear = (year: number) => {
    const cache: Record<string, boolean> = {}
    if (cache[year] !== undefined) {
      return cache[year]
    }

    if (!isValidDate) {
      return false
    }

    const date = viewDate?.clone().set('year', year)

    if (!date) return false

    let day = date.endOf('year').dayOfYear() + 1

    while (day-- > 1) {
      if (isValidDate(date.dayOfYear(day))) {
        cache[year] = false
        return false
      }
    }

    cache[year] = true
    return true
  }

  /* 单个年数据结构 */
  const _renderYear = (year: number): ReactNode => {
    const selectedYear = viewDate?.year()
    let className = 'nc-year'
    let onClick: WraperProps['onClick'] = () => {}

    if (isDisabledYear(year)) {
      className += ' nc-disabled'
    } else {
      onClick = (e: MouseEvent) => {
        updateDate(e)
      }
    }

    if (selectedYear === year) {
      className += ' nc-active'
    }

    const tdProps: WraperProps = { 'key': year, className, 'data-value': year, onClick }

    if (renderYear) {
      return renderYear(tdProps, year, selectedDate?.clone())
    }

    return (
      <td
        {...tdProps}
        key={tdProps.key}
      >
        {year}
      </td>
    )
  }

  const getViewYear = () => {
    if (viewDate && typeof viewDate.year === 'function') {
      return Math.floor(viewDate.year() / 10) * 10
    }
    return 0
  }

  /* 渲染导航 */
  const renderNavigation = () => {
    const viewYear = getViewYear()
    return (
      <ViewNavigation
        onClickPrev={() => navigate(-10, ViewMode.Year)}
        onClickSwitch={() => showView(ViewMode.Year)}
        onClickNext={() => navigate(10, ViewMode.Year)}
        switchContent={`${viewYear}-${viewYear + 9}`}
        switchColSpan="5"
      />
    )
  }

  const getRow = (rows: ReactNode[][], year: number) => {
    if (year < 3) {
      return rows[0]
    }
    if (year < 7) {
      return rows[1]
    }
    return rows[2]
  }

  /* 渲染所有年份 */
  const _renderYears = () => {
    const viewYear = getViewYear()
    const rows: ReactNode[][] = [[], [], []]
    if (viewYear) {
      for (let year = viewYear - 1; year < viewYear + 11; year++) {
        const row = getRow(rows, year - viewYear)
        row.push(_renderYear(year))
      }
    }

    return rows.map((years, i) => <tr key={i}>{years}</tr>)
  }

  return (
    <div className="nc-years">
      <table>
        <thead>{renderNavigation()}</thead>
      </table>
      <table>
        <tbody>{_renderYears()}</tbody>
      </table>
    </div>
  )
}
