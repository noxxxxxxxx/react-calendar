import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import dayjs from 'dayjs'
import { describe, expect, it } from 'vitest'
import Calendar from '../../lib'
import '../entry'

describe('onClose', () => {
  it('trigger onClose event', async () => {
    const onClose = vi.fn()
    const { container } = render(<Calendar onClose={onClose} />)
    const ele = container.querySelector('input')!

    fireEvent.click(ele)
    fireEvent.click(container.querySelector('[data-value="15"]')!)
    expect(onClose).toHaveBeenCalledTimes(1)
    const [res] = onClose.mock.calls[0]

    expect(onClose).toHaveBeenCalledWith(dayjs(res))

    fireEvent.click(document, { target: { tagName: 'BODY' } })
    expect(onClose).toHaveBeenCalledTimes(1)
  })
})
