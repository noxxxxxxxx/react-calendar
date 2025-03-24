import { ViewMode } from '@/lib/calendar/constant'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Calendar from '../../lib'
import '../entry'

describe('onNavigate', () => {
  it('trigger onNavigate event', () => {
    const onNavigate = vi.fn()
    const { container } = render(<Calendar onNavigate={onNavigate} />)
    const ele = container.querySelector('input')!

    fireEvent.click(ele)
    fireEvent.click(container.querySelector('.nc-switch')!)
    expect(onNavigate).toHaveBeenCalledOnce()
    // const res = ViewMode.Month
    // expect(res).toEqual(result)
    expect(onNavigate).toHaveBeenCalledWith(ViewMode.Month)
  })
})
