import { ViewMode } from '@/lib/calendar/type'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'
import Calendar from '../../lib'
import '../entry'

describe('onBeforeNavigate', () => {
  it('trigger onBeforeNavigate event', async () => {
    const onBeforeNavigate = vi.fn()
    const { container } = render(<Calendar onBeforeNavigate={onBeforeNavigate} />)
    const ele = container.querySelector('input')!

    fireEvent.click(ele)
    fireEvent.click(container.querySelector('.nc-switch')!)
    expect(onBeforeNavigate).toBeCalledTimes(1)
    expect(onBeforeNavigate).toHaveBeenCalledWith(ViewMode.Month, ViewMode.Day, expect.any(dayjs))
  })
})
