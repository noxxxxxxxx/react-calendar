import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Calendar } from '../../lib'
import '../entry'

describe('closeOnClickOutside', () => {
  it('always show the calendar', () => {
    const { container } = render(<Calendar closeOnClickOutside={false} />)
    fireEvent.click(container.querySelector('input')!)
    fireEvent.click(document, { target: { tagName: 'BODY' } })
    expect(container.querySelector('.nc-day')).toBeTruthy()
  })
})
