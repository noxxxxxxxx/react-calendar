import { CalendarOutlined } from '@ant-design/icons'
import { Tooltip } from 'antd'
import { useState, type FC } from 'react'
import type { Weekday } from '../weekdayPicker'
import { WeekdayPicker } from '../weekdayPicker'
import { DateGranularityEnum, Options } from './constant'
import { type ItemProps, type MenuItem } from './type'

// 渲染菜单项
const RenderMenuItems = (
  items: MenuItem[],
  onClick?: ItemProps['onClick'],
  selectedKeys?: string[],
  parentKey?: string,
): JSX.Element[] => {
  const [open, setOpen] = useState(false)
  return items.map((item) => {
    if (item.children) {
      return (
        <div key={item.key}>
          <div className="relative item">
            <div
              className="content"
              data-active={selectedKeys?.includes(item.key)}
            >
              {item.label}
              {item?.expandIcon}
            </div>
            <div className="sub-menu">{RenderMenuItems(item.children, onClick, selectedKeys, item.key)}</div>
          </div>
        </div>
      )
    }
    return (
      <div
        key={item.key}
        className="item"
        data-key={item.key}
        onClick={() => onClick?.(parentKey ? [parentKey, item.key] : [item.key])}
      >
        <div
          className="content"
          data-active={
            !![item.key, ...(item?.childItems?.map((child) => child.value) || [])].some((key) =>
              selectedKeys?.includes(key),
            )
          }
        >
          {item.label}
          {item.key === DateGranularityEnum.Week && item.childItems && (
            <WeekdayPicker
              value={selectedKeys?.[selectedKeys.length - 1] as Weekday}
              onChange={(data) => onClick?.([item.key, data.value])}
            >
              <Tooltip
                title="自定义周"
                placement="right"
                open={open}
                onOpenChange={(value) => setOpen(value)}
                color="#091E42D9"
              >
                <div
                  className="week-icon"
                  onClick={(e) => {
                    e.stopPropagation()
                    setOpen(false)
                  }}
                >
                  <CalendarOutlined
                    style={{
                      color: 'var(--brand-600)',
                    }}
                  />
                </div>
              </Tooltip>
            </WeekdayPicker>
          )}
        </div>
      </div>
    )
  })
}

// 导出 Items 组件
const Items: FC<ItemProps> = (props) => {
  const { index, onClick, selectedKeys } = props
  return <div className="bg-white relative">{RenderMenuItems(Options[index || 1], onClick, selectedKeys)}</div>
}

export default Items
