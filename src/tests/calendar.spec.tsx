import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'
import Calendar from '../lib'
import './entry'

describe('test calendar component', () => {
  it('render nothing', () => {
    const { container } = render(<Calendar />)
    const ele = container.querySelector('input')
    expect(ele).toBeTruthy()
  })

  it('render time pannel', () => {
    const { container } = render(<Calendar />)
    const ele = container.querySelector('input')!
    fireEvent.click(ele)
    const time = container.querySelector('.nc-time-toggle')!
    fireEvent.click(time)
    expect(container.querySelector('.nc-time')).toBeInTheDocument()
  })

  it('increase hour', () => {
    const { container } = render(<Calendar initialValue={dayjs('01/01/2024 12:01:01 PM')} />)
    const ele = container.querySelector('input')!
    fireEvent.click(ele)
    const time = container.querySelector('.nc-time-toggle')!
    fireEvent.click(time)
    const increase = container.querySelector('.nc-btn')!
    fireEvent.mouseDown(increase)
    expect(container.querySelector('input')?.value).equal('01/01/2024 1:01:01 PM')
  })

  it('decrease hour', () => {
    const { container } = render(<Calendar initialValue={dayjs('01/01/2024 12:01:01 PM')} />)
    const ele = container.querySelector('input')!
    fireEvent.click(ele)
    const time = container.querySelector('.nc-time-toggle')!
    fireEvent.click(time)
    const increase = container.querySelector('.nc-counter .nc-btn:last-child')!
    fireEvent.mouseDown(increase)
    expect(container.querySelector('input')?.value).equal('01/01/2024 11:01:01 AM')
  })
})
