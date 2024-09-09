import { ViewMode } from '@/lib/calendar/type'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Calendar from '../../lib'
import '../entry'

describe('onNavigateForward', () => {
  it('trigger onNavigateForward event', async () => {
    const onNavigateForward = vi.fn()
    const { container } = render(<Calendar onNavigateForward={onNavigateForward} />)
    const ele = container.querySelector('input')!

    fireEvent.click(ele)
    fireEvent.click(container.querySelector('.nc-next')!)
    expect(onNavigateForward).toBeCalledTimes(1)
    expect(onNavigateForward).toHaveBeenCalledWith(1, ViewMode.Month)
  })
})
