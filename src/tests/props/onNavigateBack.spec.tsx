import { ViewMode } from '@/lib/calendar/type'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Calendar from '../../lib'
import '../entry'

describe('onNavigateBack', () => {
  it('trigger onNavigateBack event', async () => {
    const onNavigateBack = vi.fn()
    const { container } = render(<Calendar onNavigateBack={onNavigateBack} />)
    const ele = container.querySelector('input')!

    fireEvent.click(ele)
    fireEvent.click(container.querySelector('.nc-prev')!)
    expect(onNavigateBack).toBeCalledTimes(1)
    expect(onNavigateBack).toHaveBeenCalledWith(-1, ViewMode.Month)
  })
})
