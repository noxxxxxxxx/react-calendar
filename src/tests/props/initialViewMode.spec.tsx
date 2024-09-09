import { ViewMode } from '@/lib/calendar/type'
import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Calendar from '../../lib'
import '../entry'

describe('initialViewMode', () => {
  it('render day view without initialViewMode', () => {
    const { container } = render(<Calendar />)
    fireEvent.click(container.querySelector('input')!)
    expect(container.querySelector('.nc-picker')).toBeTruthy()
  })

  it('render day view initialViewMode equal day', () => {
    const { container } = render(<Calendar initialViewMode={ViewMode.Day} />)
    fireEvent.click(container.querySelector('input')!)
    expect(container.querySelector('.nc-days')).toBeTruthy()
  })

  it('render day view initialViewMode equal month', () => {
    const { container } = render(<Calendar initialViewMode={ViewMode.Month} />)
    fireEvent.click(container.querySelector('input')!)
    expect(container.querySelector('.nc-months')).toBeTruthy()
  })

  it('render day view initialViewMode equal year', () => {
    const { container } = render(<Calendar initialViewMode={ViewMode.Year} />)
    fireEvent.click(container.querySelector('input')!)
    expect(container.querySelector('.nc-years')).toBeTruthy()
  })
})
