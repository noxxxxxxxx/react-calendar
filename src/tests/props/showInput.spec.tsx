import '@testing-library/jest-dom'
import { render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Calendar from '../../lib'
import '../entry'

describe('showInput', () => {
  it('render input', async () => {
    const { container } = render(<Calendar />)
    expect(container.querySelector('input')).toBeTruthy()
  })

  it('render nothing', async () => {
    const { container } = render(<Calendar showInput={false} />)
    expect(container.querySelector('input')).toBeNull()
  })
})
