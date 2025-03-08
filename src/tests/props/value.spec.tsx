import { pad } from '@/lib/calendar/helper'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'
import Calendar from '../../lib'
import '../entry'

describe('value', () => {
  it('render with given value prop', () => {
    const year = new Date().getFullYear()
    const month = pad('month', new Date().getMonth() + 1)
    const value = dayjs(`${year}-${month}-21 00:00:00`)
    const { container } = render(
      <Calendar
        value={value}
        dateFormat="YYYY-MM-DD"
        timeFormat={false}
      />,
    )

    expect(container.querySelector('input')!.value).toEqual(`${year}-${month}-21`)
  })
})
