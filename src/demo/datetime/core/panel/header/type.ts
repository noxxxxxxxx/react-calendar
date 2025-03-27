import { Dayjs } from 'dayjs'
import { Type } from '../../../constant'

export interface Props {
  value: Dayjs[]
  type?: Type
  format: string
  startDateType: Type
  endDateType: Type
  presetSelected: number
  timezoneOffset?: number
}
