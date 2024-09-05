import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it } from 'vitest'
import { Calendar } from '../lib'
import './entry'

describe('test calendar component initial render', () => {
  it('render nothing', () => {
    const { container } = render(<Calendar />)
    const ele = container.querySelector('input')
    expect(ele).toBeTruthy()
  })

  it('render calendar pannel with time', async () => {
    const { container } = render(<Calendar />)
    const ele = container.querySelector('input')!
    const time = container.querySelector('.nc-time-toggle')
    fireEvent.click(ele)
    await expect.poll(() => expect(time).toBeTruthy())
  })
})
