export const DateFormat = 'YYYY/MM/DD' // input 内展示格式

export enum Type {
  /** 动态时间 */
  dynamic = 'dynamic',
  /** 静态时间 */
  static = 'static',
  /** 从动态 -> 静态 | 从静态 ->动态 */
  from = 'from',
}

/* 动态日期 快捷选择枚举 */
export enum DynamicType {
  yesterday = 'yesterday', // 昨日
  today = 'today', // 今日
  last7Days = 'last7Days', // 最近 7 日
  past7Days = 'past7Days', // 过去 7 日
  last30Days = 'last30Days', // 最近 30 日
  past30Days = 'past30Days', // 过去 30 日
  week = 'week', // 本周
  lastWeek = 'lastWeek', // 上周
  month = 'month', // 本月
  lastMonth = 'lastMonth', // 上个月
  previousStage = 'previousStage', // 上一阶段
  toYesterday = 'toYesterday', // 从某日至昨日
  toToday = 'toToday', // 从某日至今日
}

/* 时间粒度 */
export enum Granularity {
  Minute = 'minute',
  Hour = 'hour',
  Day = 'day',
  Week = 'week',
  Month = 'month',
  Total = 'total',
}
export enum DateTimeScene {
  Dashboard = 'dashboard',
  Default = 'default',
}
