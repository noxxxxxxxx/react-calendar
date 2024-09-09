import '@testing-library/jest-dom'
import { fireEvent, render } from '@testing-library/react'
import { describe, expect, it, vi } from 'vitest'
import Calendar from '../../lib'
import '../entry'

describe('inputProps', () => {
  it('setting props in input element', () => {
    const { container } = render(
      <Calendar
        inputProps={{
          placeholder: 'test',
        }}
      />,
    )
    expect(container.querySelector('input')?.placeholder).equal('test')
  })

  it('trigger event', () => {
    const onClick = vi.fn()
    const onChange = vi.fn()
    const onFocus = vi.fn()
    const onKeyDown = vi.fn()
    const { container } = render(
      <Calendar
        inputProps={{
          onClick,
          onChange,
          onFocus,
          onKeyDown,
        }}
      />,
    )
    const ele = container.querySelector('input')!

    fireEvent.click(ele)
    expect(onClick).toBeCalledTimes(1)

    fireEvent.keyDown(ele)
    expect(onKeyDown).toBeCalledTimes(1)

    fireEvent.keyDown(ele, { key: 'Tab', keyCode: 9, code: 'Tab' })
    expect(container.querySelector('.nc-days')).toBeNull()

    fireEvent.focus(ele)
    expect(onFocus).toBeCalledTimes(1)

    fireEvent.change(ele, { target: { value: 1 } })
    expect(onChange).toBeCalledTimes(1)
  })
})
