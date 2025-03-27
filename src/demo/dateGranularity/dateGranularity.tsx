// import { Icon } from '@diezhi/jax'
import { Button, Dropdown } from 'antd'
import type { FC } from 'react'
import { useEffect, useState } from 'react'
import { Weekday } from '../weekdayPicker'
import { DateGranularityScene, DateGranularityValue, ValueMap } from './constant'
import Items from './items'
import './style.scss'
import type { DateGranularityProps } from './type'

/* 时间粒度选择组件 */
export const DateGranularity: FC<DateGranularityProps> = ({
  value,
  index,
  size,
  onChange,
  disabled,
  scene = DateGranularityScene.Default,
}) => {
  const [data, setData] = useState(ValueMap[DateGranularityValue.Day])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [innerIndex, setInnerIndex] = useState(index || 1)

  /* 点击菜单项触发 */
  const onClick = (keys: string[]) => {
    let result: DateGranularityValue | '' = ''
    let label: string | '' = ''

    // 星期的类型
    if (keys.length === 1 && keys[0] === DateGranularityValue.Week) {
      keys.push(DateGranularityValue.Monday)
    }
    for (const [key, value] of Object.entries(ValueMap[innerIndex])) {
      const valueKeys: string[] = (value as any)?.keys
      if (valueKeys.every((v) => keys.includes(v))) {
        result = key as DateGranularityValue
        label = (value as any)?.label
        break
      }
    }
    setData({
      keys,
      label,
    })
    // 选择星期，单独触发星期变化的事件
    if (keys[0] === DateGranularityValue.Week) {
      onChange?.(DateGranularityValue.Week, (result || Weekday.Monday) as Weekday)
    } else {
      onChange?.(result as DateGranularityValue)
    }
    setDropdownOpen(false)
  }

  useEffect(() => {
    if (value) {
      const idx = index || 1
      setInnerIndex(idx)
      // 默认配置
      const initialValue = ValueMap[idx][value.week || value.value]

      setData(initialValue)
    }
  }, [value])

  return (
    <span className="flex items-center">
      <Dropdown
        open={dropdownOpen && !disabled}
        destroyPopupOnHide // 防止 Items 组件被缓存 selectedKeys 不更新
        onOpenChange={setDropdownOpen}
        trigger={['click']}
        dropdownRender={() => (
          <Items
            index={innerIndex}
            onClick={onClick}
            selectedKeys={data.keys}
          />
        )}
        overlayClassName="date-granularity-selector"
      >
        {scene === DateGranularityScene.Dashboard ? (
          <div className="cursor-pointer flex text-neutral-1100 text-13px items-center justify-between hover:text-brand-600">
            <span>{data?.label}</span>
          </div>
        ) : (
          <Button
            size={size || 'middle'}
            className="flex shadow-none items-center justify-between"
          >
            <span className="text-neutral-1800">{data?.label}</span>
            {/* <Icon
              type="DownOnePlatform"
              className="-mr-4px -ml-4px text-neutral-600 !text-13px"
            /> */}
          </Button>
        )}
      </Dropdown>
    </span>
  )
}
