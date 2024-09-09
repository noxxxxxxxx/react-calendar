import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Calendar from '../../lib'
import '../entry'

describe('open', () => {
  it('display the calendar panel', () => {
    const { container } = render(<Calendar open={true} />)
    expect(container.querySelector('.nc-days')).toBeTruthy()
  })

  it('not display the calendar panel', () => {
    const { container } = render(<Calendar open={false} />)
    expect(container.querySelector('.nc-days')).toBeNull()
  })

  it('open calendar panel after click input', () => {
    const { container } = render(<Calendar />)
    fireEvent.click(container.querySelector('input')!)
    expect(container.querySelector('.nc-days')).toBeTruthy()
  })

  it('do nothing after click input', () => {
    const { container } = render(<Calendar />)
    fireEvent.click(container.querySelector('input')!)
    expect(container.querySelector('.nc-days')).toBeTruthy()
    fireEvent.click(container.querySelector('input')!)
    expect(container.querySelector('.nc-picker')).toBeInTheDocument()
  })
})
