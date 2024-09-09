import { ViewMode } from '@/lib/calendar/type'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'
import Calendar from '../../lib'
import '../entry'

describe('closeOnSelect', () => {
  it('close when click month calendar', () => {
    const { container } = render(
      <Calendar
        initialViewMode={ViewMode.Month}
        closeOnSelect={true}
        dateFormat="YYYY-MM-DD"
        timeFormat={false}
      />,
    )
    fireEvent.click(container.querySelector('input')!)
    fireEvent.click(container.querySelector('[data-value="4"]')!)
    fireEvent.click(container.querySelector('[data-value="9"]')!)
    const target = dayjs().format('YYYY-05-09')

    expect(container.querySelector('input')!.value).equal(target)
  })

  it('jump to month view mode', () => {
    const { container } = render(
      <Calendar
        initialViewMode={ViewMode.Year}
        closeOnSelect={false}
      />,
    )
    fireEvent.click(container.querySelector('input')!)
    fireEvent.click(container.querySelector(`[data-value="${dayjs().format('YYYY')}"]`)!)

    expect(container.querySelector('.nc-month')!).toBeTruthy()
  })

  it('jump to month calendar', () => {
    const { container } = render(<Calendar initialViewMode={ViewMode.Year} />)
    fireEvent.click(container.querySelector('input')!)
    fireEvent.click(container.querySelector(`[data-value="${dayjs().format('YYYY')}"]`)!)

    expect(container.querySelector('.nc-month')!).toBeTruthy()
  })
})
