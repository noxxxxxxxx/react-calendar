import { DateTimeFormat } from '@/lib/calendar/constant'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'
import { Calendar } from '../../lib'
import '../entry'

describe('dateFormat', () => {
  it('display the setting date format with time', () => {
    const { container } = render(<Calendar dateFormat="YYYY-MM-DD" />)
    const ele = container.querySelector('input')!
    fireEvent.click(ele)
    fireEvent.click(container.querySelector('[data-value="15"]')!)
    const target = dayjs().format('YYYY-MM-15 LTS')

    expect(new Date(ele.value)).lessThanOrEqual(new Date(target))
  })

  it('display the setting date format without time', () => {
    const { container } = render(
      <Calendar
        dateFormat="YYYY-MM-DD"
        timeFormat={false}
      />,
    )
    fireEvent.click(container.querySelector('input')!)
    fireEvent.click(container.querySelector('[data-value="15"]')!)
    const target = dayjs().format('YYYY-MM-15')

    expect(container.querySelector('input')!.value).equal(target)
  })

  it('display the setting date format without time', () => {
    const { container } = render(
      <Calendar
        dateFormat={false}
        timeFormat={false}
      />,
    )
    fireEvent.click(container.querySelector('input')!)
    fireEvent.click(container.querySelector('[data-value="15"]')!)
    const value = container.querySelector('input')!.value
    const result = dayjs(value, "YYYY-MM-DD'T'HH:mm:ss.SSSZ").isValid()

    expect(result).true
  })

  it('display the preset local date format', () => {
    const { container } = render(<Calendar />)
    fireEvent.click(container.querySelector('input')!)
    fireEvent.click(
      container.querySelector(`[data-value="${dayjs().get('date')}"][data-month="${dayjs().get('month')}"]`)!,
    )
    const value = container.querySelector('input')!.value
    const result = dayjs().format(DateTimeFormat)

    expect(new Date(value).getTime()).toBeGreaterThanOrEqual(new Date(result).getTime())
  })
})
