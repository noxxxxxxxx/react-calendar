import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import Calendar from '../../lib'
import '../entry'

describe('showTime', () => {
  it('Do not display the content of the time', async () => {
    const { container } = render(<Calendar showTime={false} />)
    const ele = container.querySelector('input')!
    fireEvent.click(ele)
    await expect.poll(() => expect(container.querySelector('.nc-time-toggle')).toBeFalsy())
  })

  it('Display the content of the time', async () => {
    const { container } = render(<Calendar showTime={true} />)
    const ele = container.querySelector('input')!
    fireEvent.click(ele)
    await expect.poll(() => expect(container.querySelector('.nc-time-toggle')).toBeTruthy())
  })
})
