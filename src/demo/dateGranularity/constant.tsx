import { CalendarOutlined, RightOutlined } from '@ant-design/icons'
// import { Icon } from '@diezhi/jax'
import { Weekday } from '../weekdayPicker'
import { WeekdayLabel } from '../weekdayPicker/constant'
import type { MenuItem } from './type'

/* 组件内部的日期粒度枚举值 */
export enum DateGranularityEnum {
  FiveMinutes = '5minutes',
  TenMinutes = '10minutes',
  OneMinute = '1minute',
  Minute = 'minute',
  Hour = 'hour',
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Quarter = 'quarter',
  Year = 'year',
  Total = 'total',
  More = 'more',
}

/* 菜单项 */
export const Options: Record<string, MenuItem[]> = {
  // 默认 - 事件分析场景使用
  1: [
    {
      key: DateGranularityEnum.Minute,
      label: '按分钟',
      name: '按分钟',
      expandIcon: (
        <></>
        // <Icon
        //   type="RightPlatform"
        //   className="text-neutral-1100 text-12px"
        // />
      ),
      children: [
        {
          key: DateGranularityEnum.OneMinute,
          label: '1分钟',
          name: '1分钟',
        },
        {
          key: DateGranularityEnum.FiveMinutes,
          label: '5分钟',
          name: '5分钟',
        },
        {
          key: DateGranularityEnum.TenMinutes,
          label: '10分钟',
          name: '10分钟',
        },
      ],
    },
    {
      key: DateGranularityEnum.Hour,
      label: '按小时',
      name: '按小时',
    },
    {
      key: DateGranularityEnum.Day,
      label: '按天',
      name: '按天',
    },
    {
      key: DateGranularityEnum.Week,
      name: '按周',
      expandIcon: <CalendarOutlined />,
      label: '按周',
      childItems: [
        { label: WeekdayLabel.monday, value: Weekday.Monday },
        { label: WeekdayLabel.tuesday, value: Weekday.Tuesday },
        { label: WeekdayLabel.wednesday, value: Weekday.Wednesday },
        { label: WeekdayLabel.thursday, value: Weekday.Thursday },
        { label: WeekdayLabel.friday, value: Weekday.Friday },
        { label: WeekdayLabel.saturday, value: Weekday.Saturday },
        { label: WeekdayLabel.sunday, value: Weekday.Sunday },
      ],
    },
    {
      key: DateGranularityEnum.Month,
      label: '按月',
      name: '按月',
    },
    {
      key: DateGranularityEnum.More,
      label: '更多',
      name: '更多',
      expandIcon: <RightOutlined className="h-8px w-8px" />,
      children: [
        {
          key: DateGranularityEnum.Quarter,
          label: '按季',
          name: '按季',
        },
        {
          key: DateGranularityEnum.Year,
          label: '按年',
          name: '按年',
        },
      ],
    },
    {
      key: DateGranularityEnum.Total,
      label: '合计',
      name: '合计',
    },
  ],
  // 日期类型的属性进行分组时使用的汇总粒度
  2: [
    {
      key: DateGranularityEnum.Minute,
      label: '按分钟',
      name: '按分钟',
    },
    {
      key: DateGranularityEnum.Hour,
      label: '按小时',
      name: '按小时',
    },
    {
      key: DateGranularityEnum.Day,
      label: '按天',
      name: '按天',
    },
    {
      key: DateGranularityEnum.Week,
      name: '按周',
      label: '按周',
    },
    {
      key: DateGranularityEnum.Month,
      label: '按月',
      name: '按月',
    },
    {
      key: 'more',
      label: '更多',
      name: '更多',
      expandIcon: <RightOutlined className="h-8px w-8px" />,
      children: [
        {
          key: DateGranularityEnum.Quarter,
          label: '按季',
          name: '按季',
        },
        {
          key: DateGranularityEnum.Year,
          label: '按年',
          name: '按年',
        },
      ],
    },
  ],
  // 分布分析场景使用
  3: [
    {
      key: DateGranularityEnum.Day,
      label: '按天',
      name: '按天',
    },
    {
      key: DateGranularityEnum.Week,
      name: '按周',
      expandIcon: <CalendarOutlined />,
      label: '按周',
      childItems: [
        { label: WeekdayLabel.monday, value: Weekday.Monday },
        { label: WeekdayLabel.tuesday, value: Weekday.Tuesday },
        { label: WeekdayLabel.wednesday, value: Weekday.Wednesday },
        { label: WeekdayLabel.thursday, value: Weekday.Thursday },
        { label: WeekdayLabel.friday, value: Weekday.Friday },
        { label: WeekdayLabel.saturday, value: Weekday.Saturday },
        { label: WeekdayLabel.sunday, value: Weekday.Sunday },
      ],
    },
    {
      key: DateGranularityEnum.Month,
      label: '按月',
      name: '按月',
    },
    {
      key: DateGranularityEnum.Total,
      label: '合计',
      name: '合计',
    },
  ],
}

/* 组件对外传递的值 */
export enum DateGranularityValue {
  Minute = 'minute',
  Minute5 = 'minute5',
  Minute10 = 'minute10',
  Hour = 'hour',
  Day = 'day',
  Week = 'week',
  Monday = '1',
  Tuesday = '2',
  Wednesday = '3',
  Thursday = '4',
  Friday = '5',
  Saturday = '6',
  Sunday = '7',
  Month = 'month',
  Quarter = 'quarter',
  Year = 'year',
  Total = 'total',
}

/* value（服务端使用的枚举值） 作为对象 key，去匹配对应的展示文案和高亮的菜单 key，这里直接写死做映射 */
// https://papergames.feishu.cn/wiki/wikcnDUIo4fnhmdKAZXalOXdhHf
export const ValueMap: Record<string, any> = {
  1: {
    [DateGranularityValue.Minute]: {
      keys: [DateGranularityEnum.Minute, DateGranularityEnum.OneMinute],
      label: '1分钟',
    },
    [DateGranularityValue.Minute5]: {
      keys: [DateGranularityEnum.Minute, DateGranularityEnum.FiveMinutes],
      label: '5分钟',
    },
    [DateGranularityValue.Minute10]: {
      keys: [DateGranularityEnum.Minute, DateGranularityEnum.TenMinutes],
      label: '10分钟',
    },
    [DateGranularityValue.Hour]: {
      keys: [DateGranularityEnum.Hour],
      label: '按小时',
    },
    [DateGranularityValue.Day]: {
      keys: [DateGranularityEnum.Day],
      label: '按天',
    },
    [DateGranularityValue.Week]: {
      keys: [DateGranularityEnum.Week, DateGranularityValue.Monday],
      label: '按周',
    },
    [DateGranularityValue.Monday]: {
      keys: [DateGranularityEnum.Week, DateGranularityValue.Monday],
      label: '按周',
    },
    [DateGranularityValue.Tuesday]: {
      keys: [DateGranularityEnum.Week, DateGranularityValue.Tuesday],
      label: '按周',
    },
    [DateGranularityValue.Wednesday]: {
      keys: [DateGranularityEnum.Week, DateGranularityValue.Wednesday],
      label: '按周',
    },
    [DateGranularityValue.Thursday]: {
      keys: [DateGranularityEnum.Week, DateGranularityValue.Thursday],
      label: '按周',
    },
    [DateGranularityValue.Friday]: {
      keys: [DateGranularityEnum.Week, DateGranularityValue.Friday],
      label: '按周',
    },
    [DateGranularityValue.Saturday]: {
      keys: [DateGranularityEnum.Week, DateGranularityValue.Saturday],
      label: '按周',
    },
    [DateGranularityValue.Sunday]: {
      keys: [DateGranularityEnum.Week, DateGranularityValue.Sunday],
      label: '按周',
    },
    [DateGranularityValue.Month]: {
      keys: [DateGranularityEnum.Month],
      label: '按月',
    },
    [DateGranularityValue.Quarter]: {
      keys: [DateGranularityEnum.More, DateGranularityEnum.Quarter],
      label: '按季',
    },
    [DateGranularityValue.Year]: {
      keys: [DateGranularityEnum.More, DateGranularityEnum.Year],
      label: '按年',
    },
    [DateGranularityValue.Total]: {
      keys: [DateGranularityEnum.Total],
      label: '合计',
    },
  },
  2: {
    [DateGranularityValue.Minute]: {
      keys: [DateGranularityEnum.Minute],
      label: '按分钟',
    },
    [DateGranularityValue.Hour]: {
      keys: [DateGranularityEnum.Hour],
      label: '按小时',
    },
    [DateGranularityValue.Day]: {
      keys: [DateGranularityEnum.Day],
      label: '按天',
    },
    [DateGranularityValue.Week]: {
      keys: [DateGranularityEnum.Week],
      label: '按周',
    },
    [DateGranularityValue.Month]: {
      keys: [DateGranularityEnum.Month],
      label: '按月',
    },
    [DateGranularityValue.Quarter]: {
      keys: [DateGranularityEnum.More, DateGranularityEnum.Quarter],
      label: '按季',
    },
    [DateGranularityValue.Year]: {
      keys: [DateGranularityEnum.More, DateGranularityEnum.Year],
      label: '按年',
    },
  },
  3: {
    [DateGranularityValue.Day]: {
      keys: [DateGranularityEnum.Day],
      label: '按天',
    },
    [DateGranularityValue.Week]: {
      keys: [DateGranularityEnum.Week, DateGranularityValue.Monday],
      label: '按周',
    },
    [DateGranularityValue.Monday]: {
      keys: [DateGranularityEnum.Week, DateGranularityValue.Monday],
      label: '按周',
    },
    [DateGranularityValue.Tuesday]: {
      keys: [DateGranularityEnum.Week, DateGranularityValue.Tuesday],
      label: '按周',
    },
    [DateGranularityValue.Wednesday]: {
      keys: [DateGranularityEnum.Week, DateGranularityValue.Wednesday],
      label: '按周',
    },
    [DateGranularityValue.Thursday]: {
      keys: [DateGranularityEnum.Week, DateGranularityValue.Thursday],
      label: '按周',
    },
    [DateGranularityValue.Friday]: {
      keys: [DateGranularityEnum.Week, DateGranularityValue.Friday],
      label: '按周',
    },
    [DateGranularityValue.Saturday]: {
      keys: [DateGranularityEnum.Week, DateGranularityValue.Saturday],
      label: '按周',
    },
    [DateGranularityValue.Sunday]: {
      keys: [DateGranularityEnum.Week, DateGranularityValue.Sunday],
      label: '按周',
    },
    [DateGranularityValue.Month]: {
      keys: [DateGranularityEnum.Month],
      label: '按月',
    },
    [DateGranularityValue.Total]: {
      keys: [DateGranularityEnum.Total],
      label: '合计',
    },
  },
}
export enum DateGranularityScene {
  Dashboard = 'dashboard',
  Default = 'default',
}
