import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Calendar } from '../../lib'
import '../entry'

describe('onOpen', () => {
  it('trigger onOpen event', async () => {
    let result = false
    const event = {
      handleOpen: () => {
        result = true
      },
    }
    const { container } = render(<Calendar onOpen={event.handleOpen} />)
    const ele = container.querySelector('input')!

    vi.spyOn(event, 'handleOpen')

    fireEvent.click(ele)
    await expect.poll(() => expect(event.handleOpen).toHaveBeenCalled())
    expect(result).toBeTruthy()
  })
})
