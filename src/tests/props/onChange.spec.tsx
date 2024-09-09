import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'
import { Calendar } from '../../lib'
import '../entry'

describe('onChange', () => {
  it('trigger onChange event with parma', () => {
    const onChange = vi.fn()
    const { container } = render(<Calendar onChange={onChange} />)
    fireEvent.click(container.querySelector('input')!)
    fireEvent.click(container.querySelector('[data-value="4"]')!)
    expect(onChange).toBeCalledTimes(1)
    expect(onChange).toHaveBeenCalledWith(expect.any(dayjs))

    fireEvent.click(container.querySelector('input')!)
    fireEvent.click(container.querySelector('.nc-time-toggle')!)
    fireEvent.mouseDown(container.querySelector('.nc-counter .nc-btn:last-child')!)
    expect(onChange).toBeCalledTimes(2)
  })

  it('trigger onChange event with input value', () => {
    const onChange = vi.fn()
    const value = 'invalid date'
    const { container } = render(<Calendar onChange={onChange} />)
    const ele = container.querySelector('input')!
    fireEvent.click(ele)
    fireEvent.change(ele, { target: { value } })
    expect(onChange).toHaveBeenLastCalledWith(value)
  })
})
