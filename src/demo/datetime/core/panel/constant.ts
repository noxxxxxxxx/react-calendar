import { DateGranularityValue } from '@/demo/dateGranularity'
import dayjs from 'dayjs'
import { DateFormat, DynamicType, Type } from '../../constant'
import type { DateBlockOption, TabOption } from './type'

export const QUICK_DATE_OPTIONS = (timezoneOffset?: number): DateBlockOption[] => {
  if (timezoneOffset === undefined) {
    return [
      {
        label: '昨日',
        dynamicType: DynamicType.yesterday,
        value: [dayjs().subtract(1, 'day').startOf('day'), dayjs().subtract(1, 'day').startOf('day')],
      },
      {
        label: '今日',
        dynamicType: DynamicType.today,
        value: [dayjs().startOf('day'), dayjs().startOf('day')],
      },
      {
        label: '上周',
        dynamicType: DynamicType.lastWeek,
        value: [
          dayjs().startOf('week').subtract(1, 'week').startOf('day'),
          dayjs().endOf('week').subtract(1, 'week').endOf('week').startOf('day'),
        ],
      },
      {
        label: '本周',
        dynamicType: DynamicType.week,
        value: [dayjs().startOf('week').startOf('day'), dayjs().startOf('day')],
      },
      {
        label: '上月',
        dynamicType: DynamicType.lastMonth,
        value: [
          dayjs().startOf('month').subtract(1, 'month').startOf('day'),
          dayjs().endOf('month').subtract(1, 'month').endOf('month').startOf('day'),
        ],
      },
      {
        label: '本月',
        dynamicType: DynamicType.month,
        value: [dayjs().startOf('month').startOf('day'), dayjs().startOf('day')],
      },
      {
        label: '过去7天',
        dynamicType: DynamicType.past7Days,
        value: [dayjs().subtract(7, 'day').startOf('day'), dayjs().subtract(1, 'day').startOf('day')],
      },
      {
        label: '最近7天',
        dynamicType: DynamicType.last7Days,
        value: [dayjs().subtract(6, 'day').startOf('day'), dayjs().startOf('day')],
      },
      {
        label: '过去30天',
        dynamicType: DynamicType.past30Days,
        value: [dayjs().subtract(30, 'day').startOf('day'), dayjs().subtract(1, 'day').startOf('day')],
      },
      {
        label: '最近30天',
        dynamicType: DynamicType.last30Days,
        value: [dayjs().subtract(29, 'day').startOf('day'), dayjs().startOf('day')],
      },
    ]
  }
  return [
    {
      label: '昨日',
      dynamicType: DynamicType.yesterday,
      value: [
        dayjs().utcOffset(timezoneOffset).subtract(1, 'day').startOf('day'),
        dayjs().utcOffset(timezoneOffset).subtract(1, 'day').startOf('day'),
      ],
    },
    {
      label: '今日',
      dynamicType: DynamicType.today,
      value: [dayjs().utcOffset(timezoneOffset).startOf('day'), dayjs().utcOffset(timezoneOffset).startOf('day')],
    },

    {
      label: '上周',
      dynamicType: DynamicType.lastWeek,
      value: [
        dayjs().utcOffset(timezoneOffset).startOf('week').subtract(1, 'week').startOf('day'),
        dayjs().utcOffset(timezoneOffset).endOf('week').subtract(1, 'week').endOf('week').startOf('day'),
      ],
    },
    {
      label: '本周',
      dynamicType: DynamicType.week,
      value: [
        dayjs().utcOffset(timezoneOffset).startOf('week').startOf('day'),
        dayjs().utcOffset(timezoneOffset).startOf('day'),
      ],
    },
    {
      label: '上月',
      dynamicType: DynamicType.lastMonth,
      value: [
        dayjs().utcOffset(timezoneOffset).startOf('month').subtract(1, 'month').startOf('day'),
        dayjs().utcOffset(timezoneOffset).endOf('month').subtract(1, 'month').endOf('month').startOf('day'),
      ],
    },
    {
      label: '本月',
      dynamicType: DynamicType.month,
      value: [
        dayjs().utcOffset(timezoneOffset).startOf('month').startOf('day'),
        dayjs().utcOffset(timezoneOffset).startOf('day'),
      ],
    },
    {
      label: '过去7天',
      dynamicType: DynamicType.past7Days,
      value: [
        dayjs().utcOffset(timezoneOffset).subtract(7, 'day').startOf('day'),
        dayjs().utcOffset(timezoneOffset).subtract(1, 'day').startOf('day'),
      ],
    },
    {
      label: '最近7天',
      dynamicType: DynamicType.last7Days,
      value: [
        dayjs().utcOffset(timezoneOffset).subtract(6, 'day').startOf('day'),
        dayjs().utcOffset(timezoneOffset).startOf('day'),
      ],
    },
    {
      label: '过去30天',
      dynamicType: DynamicType.past30Days,
      value: [
        dayjs().utcOffset(timezoneOffset).subtract(30, 'day').startOf('day'),
        dayjs().utcOffset(timezoneOffset).subtract(1, 'day').startOf('day'),
      ],
    },
    {
      label: '最近30天',
      dynamicType: DynamicType.last30Days,
      value: [
        dayjs().utcOffset(timezoneOffset).subtract(29, 'day').startOf('day'),
        dayjs().utcOffset(timezoneOffset).startOf('day'),
      ],
    },
  ]
}

export const QuickRangeOptions = (timezoneOffset?: number): DateBlockOption[] => {
  if (timezoneOffset === undefined) {
    return [
      {
        label: '从某日至昨日',
        disabled: [false, true],
        dateType: ['dynamic', 'static'],
        dynamicType: DynamicType.toYesterday,
        value: [dayjs(dayjs().subtract(8, 'day')), dayjs(dayjs().subtract(1, 'day'))],
      },
      {
        label: '从某日至今日',
        disabled: [false, true],
        dateType: ['dynamic', 'static'],
        dynamicType: DynamicType.toToday,
        value: [dayjs(dayjs().subtract(8, 'day')), dayjs().startOf('day')],
      },
    ]
  }
  return [
    {
      label: '从某日至昨日',
      disabled: [false, true],
      dateType: ['dynamic', 'static'],
      dynamicType: DynamicType.toYesterday,
      value: [
        dayjs(dayjs().utcOffset(timezoneOffset).subtract(7, 'day')),
        dayjs(dayjs().utcOffset(timezoneOffset).subtract(1, 'day')),
      ],
    },
    {
      label: '从某日至今日',
      disabled: [false, true],
      dateType: ['dynamic', 'static'],
      dynamicType: DynamicType.toToday,
      value: [
        dayjs(dayjs().utcOffset(timezoneOffset).subtract(7, 'day')),
        dayjs(dayjs().utcOffset(timezoneOffset)).startOf('day'),
      ],
    },
  ]
}

export const TAB_OPTIONS: TabOption[] = [
  {
    label: '动态时间',
    value: Type.dynamic,
    dateBlockOptions: (timezoneOffset: number) => QUICK_DATE_OPTIONS(timezoneOffset),
  },
  {
    label: '静态时间',
    value: Type.static,
    dateBlockOptions: (timezoneOffset: number) => QUICK_DATE_OPTIONS(timezoneOffset),
  },
]

/* 当前电脑下的时区 */
export const CurrentTimezoneOffset = () => {
  const offsetInMinutes = new Date().getTimezoneOffset()
  const offsetInHours = offsetInMinutes // 当前电脑下的时区
  return offsetInHours
}

/* 组件默认参数 */
export const DefaultProps = {
  open: false,
  mode: [Type.dynamic, Type.static],
  type: Type.dynamic,
  dateFormat: DateFormat,
  timezoneOffset: undefined,
  value: [dayjs(dayjs().subtract(7, 'day')), dayjs(dayjs().subtract(1, 'day'))], // 默认取过去7天 - 动态时间
  granularity: DateGranularityValue.Day,
  dynamicType: DynamicType.past7Days,
  hidePreset: false,
  format: 'YYYY/MM/DD',
  handleConfirm: () => {},
  handleCancel: () => {},
}

export const Theme = {
  token: {
    borderRadius: 4,
    controlHeight: 30,
    colorBorder: '#d9d9d9',
  },
  components: {
    Dropdown: {
      controlPaddingHorizontal: 0,
      paddingBlock: 0,
    },
    Input: {
      colorBgContainer: '#fff',
    },
    Radio: {
      colorBgContainer: '#fff',
    },
  },
}
