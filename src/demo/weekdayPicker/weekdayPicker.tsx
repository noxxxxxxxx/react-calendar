import type { WeekdayPickerProps, WeekdayPickerValue } from './type'
import { Options, Weekday, WeekdayLabel } from './constant'
import { useEffect, useState } from 'react'
import { Button, Popover } from 'antd'
import type { FC } from 'react'
import './style.scss'

/* 选择星期粒度组件 */
export const WeekdayPicker: FC<WeekdayPickerProps> = (props) => {
  const { placement, children, value, onChange } = props
  let initialValue = typeof value === 'object' ? value?.value : value || Weekday.Monday // 兼容 form 中使用和单独使用
  initialValue = Object.values(Weekday).includes(initialValue) ? initialValue : Weekday.Monday // 外部传入其他错误值，默认使用周一
  const [data, setData] = useState(initialValue)
  const [open, setOpen] = useState(false)

  /* 点击每一项日期 */
  const handleOnclick = (option: WeekdayPickerValue) => {
    setData(option.value)
  }

  /* 点击取消 */
  const handleCancel = () => {
    setOpen(false)
    setData(initialValue)
  }

  /* 点击确认 */
  const handleConfirm = () => {
    onChange?.({
      label: WeekdayLabel[data],
      value: data,
    })
    setOpen(false)
  }

  /* 按下 Esc 关闭弹窗 */
  const handleEscKey = (event: KeyboardEvent) => {
    if (event.key === 'Escape') {
      setOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('keydown', handleEscKey)
    return () => {
      document.removeEventListener('keydown', handleEscKey)
    }
  }, [])

  return (
    <Popover
      placement={placement || 'bottomLeft'}
      trigger={['click']}
      open={open}
      onOpenChange={(value) => setOpen(value)}
      arrow={false}
      overlayStyle={{
        zIndex: 1050,
      }}
      overlayInnerStyle={{
        padding: 0,
      }}
      content={
        <div
          className="week-granularity"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="content">
            <div className="title">自定义周</div>
            <div className="desc">
              按周统计时，将 <span className="value">{WeekdayLabel[data]}</span> 作为周起始日
            </div>
            <div className="item-wrap">
              {Options.map((option) => {
                return (
                  <button
                    className="item"
                    key={option.value}
                    data-v={data}
                    data-active={data === option.value}
                    onClick={() => handleOnclick(option)}
                  >
                    {option.label}
                  </button>
                )
              })}
            </div>
          </div>
          <div className="action-wrap">
            <Button
              onClick={handleCancel}
              className="w-80px"
            >
              取消
            </Button>
            <Button
              type="primary"
              className="confirm w-80px"
              onClick={handleConfirm}
            >
              确认
            </Button>
          </div>
        </div>
      }
    >
      {children}
    </Popover>
  )
}
