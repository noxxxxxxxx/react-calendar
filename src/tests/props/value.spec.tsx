import { pad } from '@/lib/calendar/helper'
import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'
import { Calendar } from '../../lib'
import '../entry'

describe('value', () => {
  it('render with given value prop', () => {
    const value = dayjs('2024-09-21 00:00:00')
    const { container } = render(
      <Calendar
        value={value}
        dateFormat="YYYY-MM-DD"
        timeFormat={false}
      />,
    )
    const year = new Date().getFullYear()
    const month = pad('month', new Date().getMonth() + 1)

    expect(container.querySelector('input')!.value).toEqual(`${year}-${month}-21`)
  })
})
