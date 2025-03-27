export enum Weekday {
  Monday = '1',
  Tuesday = '2',
  Wednesday = '3',
  Thursday = '4',
  Friday = '5',
  Saturday = '6',
  Sunday = '7',
}

export const WeekdayLabel: Record<string, string> = {
  '1': '星期一',
  '2': '星期二',
  '3': '星期三',
  '4': '星期四',
  '5': '星期五',
  '6': '星期六',
  '7': '星期日',
}

export const Options = [
  {
    label: '星期一',
    value: Weekday.Monday,
  },
  {
    label: '星期二',
    value: Weekday.Tuesday,
  },
  {
    label: '星期三',
    value: Weekday.Wednesday,
  },
  {
    label: '星期四',
    value: Weekday.Thursday,
  },
  {
    label: '星期五',
    value: Weekday.Friday,
  },
  {
    label: '星期六',
    value: Weekday.Saturday,
  },
  {
    label: '星期日',
    value: Weekday.Sunday,
  },
]
