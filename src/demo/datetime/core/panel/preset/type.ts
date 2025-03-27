import { DateGranularityValue } from '@/demo/dateGranularity'
import { DynamicType, Type } from '@/demo/datetime/constant'
import { Dayjs } from 'dayjs'

export interface Props {
  hidePreset: boolean
  granularity: DateGranularityValue
  onChange: (
    startDate: Dayjs | undefined, // 自某日开始 - 只取结束时间，因此开始时间会为空
    endDate: Dayjs,
    dynamicType: DynamicType | undefined | '',
    type: Type,
    startDateType: Type,
    endDateType: Type,
  ) => void
  timezoneOffset?: number
}

export interface Ref {
  updateSelectedOption: (index: number) => void
}
