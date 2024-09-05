import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Calendar } from '../../lib'
import '../entry'

describe('className', () => {
  it('add className', () => {
    const { container } = render(<Calendar className="test" />)
    fireEvent.click(container.querySelector('input')!)
    expect(container.querySelector('.rdt.test')).toBeTruthy()
  })
})
