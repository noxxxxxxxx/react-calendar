import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import duration from 'dayjs/plugin/duration'
import { default as localData, default as localeData } from 'dayjs/plugin/localeData'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc'
import { DateGranularityValue } from './demo/dateGranularity'
import { DateTime, DynamicType, Type } from './demo/datetime'
import { TimeConstraintsKeys } from './lib/calendar/constant'
// import { ViewMode } from './types'
// import { Calendar, ViewMode } from './react-canendar.js'
dayjs.extend(utc)
dayjs.extend(localeData)
dayjs.extend(localizedFormat)
dayjs.extend(dayOfYear)
dayjs.locale('zh-CN')
dayjs.extend(utc)
dayjs.extend(localData)
dayjs.extend(localizedFormat)
dayjs.extend(dayOfYear)
dayjs.extend(duration)

// dayjs.locale('zh-CN')

export type TimeValueType = {
  type: Type
  staticDate: string[]
  startDateDiff: number
  endDateDiff: number
  sortBy?: DateGranularityValue
  dynamicType?: DynamicType
}

function Demo() {
  // const [value] = useState(dayjs('2024-09-21'))
  // return (
  //   <>
  //     <Calendar
  //       value={value}
  //       onChange={(v) => {
  //         console.log(v)
  //       }}
  //       onClose={(v) => console.log(v, 'close')}
  //     />
  //   </>
  // )

  const onDateChange = (value: TimeValueType) => {
    console.log(value)
  }
  const onDateCancel = () => {}

  return (
    <DateTime
      hidePreset={true}
      sortBy={DateGranularityValue.Minute}
      timezoneOffset={undefined}
      mode={[Type.static, Type.static]}
      type={Type.static}
      value={[dayjs(), dayjs()]}
      format="YYYY/MM/DD HH:mm:ss"
      startDateDiff={1}
      endDateDiff={7}
      dynamicType={DynamicType.today}
      defaultOpen={false}
      afterConfirm={onDateChange}
      afterCancel={onDateCancel}
      initialStartTime="00"
      initialEndTime={dayjs().subtract(5, 'minute').startOf('minute').format('HH:mm:00')}
      startTimeLimit="HH:mm:ss"
      endTimeLimit="HH:mm:ss"
      endTimeConstraints={{
        [TimeConstraintsKeys.Hour]: {
          min: 0,
          max: dayjs().hour(),
          step: 1,
        },
        [TimeConstraintsKeys.Minute]: {
          min: 0,
          max: dayjs().subtract(5, 'minute').minute(),
          step: 1,
        },
      }}
    />
  )
}

export default Demo
