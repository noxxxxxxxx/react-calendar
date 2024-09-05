import { TimeConstraintsKeys, TimeConstraintsType, TimeProps, ViewMode } from '@/index.d'
import { UnitTypeLong } from 'dayjs'
import { FC, Fragment, MouseEvent } from 'react'
import { useImmer } from 'use-immer'
import { createConstraints, getAMPM, getDateFormat, getTimeParts, isAMPM, pad } from '../../helper'

export const Time: FC<TimeProps> = (props) => {
  const { selectedDate, viewDate, setTime, timeFormat, dateFormat, timeLimit, showView, timeConstraints } = props

  const timeConfig = createConstraints(timeConstraints) // user config time limit

  const [timeParts, updateTimeParts] = useImmer<Record<TimeConstraintsKeys, string>>(getTimeParts(viewDate))

  const getCounters = () => {
    const counters: TimeConstraintsKeys[] = []
    const format = timeLimit

    if (format.toLowerCase().indexOf('h') !== -1) {
      counters.push(TimeConstraintsKeys.Hour)
      if (format.indexOf('m') !== -1) {
        counters.push(TimeConstraintsKeys.Minute)
        if (format.indexOf('s') !== -1) {
          counters.push(TimeConstraintsKeys.Second)
          if (format.indexOf('S') !== -1) {
            counters.push(TimeConstraintsKeys.Millisecond)
          }
        }
      }
    }

    if (isAMPM(viewDate, timeFormat)) {
      counters.push(TimeConstraintsKeys.Ampm)
    }

    return counters
  }

  const renderHeader = () => {
    if (!dateFormat) return

    const date = selectedDate || viewDate

    return (
      <thead>
        <tr>
          <th
            className="nc-switch"
            colSpan={4}
            onClick={() => showView(ViewMode.Day)}
          >
            {date?.format(getDateFormat(dateFormat))}
          </th>
        </tr>
      </thead>
    )
  }

  const toggleDayPart = () => {
    let hours = parseInt(timeParts.hour, 10)
    if (hours >= 12) {
      hours -= 12
    } else {
      hours += 12
    }
    updateTimeParts((draft) => {
      draft.hour = pad('hour', hours)
      draft.ampm = draft.ampm === 'am' ? 'pm' : 'am'
    })
    setTime?.('hour', parseInt(String(hours), 10))
  }

  const increase = (type: string) => {
    const tc = timeConfig[type as keyof TimeConstraintsType]
    let value = parseInt(timeParts[type as keyof typeof timeParts], 10) + tc.step
    if (value > tc.max) {
      value = tc.min + (value - (tc.max + 1))
    }
    return pad(type, value)
  }

  const decrease = (type: string) => {
    const tc = timeConfig[type as keyof TimeConstraintsType]
    let value = parseInt(timeParts[type as keyof typeof timeParts], 10) - tc.step
    if (value < tc.min) value = tc.max + 1 - (tc.min - value)
    return pad(type, value)
  }

  const onStepClick = (e: MouseEvent, action: string, type: UnitTypeLong | string) => {
    if (e.button && e.button !== 0) {
      return
    }

    if (type === 'ampm') return toggleDayPart()

    const value = action === 'increase' ? increase(type) : decrease(type)
    updateTimeParts((draft) => {
      draft[type as keyof typeof timeParts] = value
    })
    setTime?.(type as UnitTypeLong, parseInt(value, 10))
  }

  const renderCounter = (type: string, value: string) => {
    let v: string | number | undefined = value
    if (type === 'hour' && isAMPM(viewDate, timeFormat)) {
      v = pad('hour', ((Number(v) - 1) % 12) + 1)

      if (Number(v) === 0) {
        v = 12
      }
    }

    if (type === 'ampm') {
      const res = getAMPM(viewDate, timeFormat)

      if (res.indexOf('M') !== -1) {
        v = viewDate?.format('A')
      } else {
        v = viewDate?.format('a')
      }
    }

    return (
      <div className="nc-counter">
        <span
          className="nc-btn"
          onMouseDown={(e) => onStepClick(e, 'increase', type)}
        >
          ▲
        </span>
        <div className="nc-count">{v}</div>
        <span
          className="nc-btn"
          onMouseDown={(e) => onStepClick(e, 'decrease', type)}
        >
          ▼
        </span>
      </div>
    )
  }

  return (
    <div className="nc-time">
      <table>
        {renderHeader()}
        <tbody>
          <tr>
            <td>
              <div className="nc-counters">
                {getCounters().map((c, i) => {
                  return <Fragment key={`sep${i}`}>{renderCounter(c, timeParts[c])}</Fragment>
                })}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}
