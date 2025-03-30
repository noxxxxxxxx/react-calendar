import { DateGranularityValue } from '@/components/selector/dateGranularity'
import { App } from 'antd'
import dayjs, { Dayjs } from 'dayjs'
import 'dayjs/locale/zh-cn'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import duration from 'dayjs/plugin/duration'
import { default as localeData } from 'dayjs/plugin/localeData'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc'
import { useState } from 'react'
import { DateTime, DynamicType, Type } from './components/datetime'
// import { ViewMode } from './types'
// import { Calendar, ViewMode } from './react-canendar.js'
dayjs.extend(utc)
dayjs.extend(localeData)
dayjs.extend(localizedFormat)
dayjs.extend(dayOfYear)
dayjs.locale('zh-CN')
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
  const [value, setValue] = useState([
    dayjs().startOf('day'),
    dayjs()
      .minute(dayjs().minute() - 5)
      .second(0),
  ])
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

  useState(() => {
    if (value[0].isAfter(value[1])) {
      setValue([value[1].startOf('day'), value[1]])
    }
  }, [])

  return (
    <>
      <App>
        <div>
          <DateTime
            sortBy={DateGranularityValue.Minute}
            timezoneOffset={undefined}
            type={Type.dynamic}
            value={[dayjs(), dayjs().endOf('day')]}
            format="YYYY/MM/DD" // 影响全局的格式化
            startDateDiff={1}
            endDateDiff={1}
            dynamicType={DynamicType.last30Days} // 第一优先级
            defaultOpen={false}
            afterConfirm={onDateChange}
            afterCancel={onDateCancel}
            startTimeLimit="HH" // 控制能点击哪些时间
            endTimeLimit="HH:mm:ss"
          />
        </div>
        <div>
          <DateTime
            sortBy={DateGranularityValue.Day}
            showTime={true}
            timezoneOffset={undefined}
            type={Type.dynamic}
            value={value}
            startDateDiff={1}
            endDateDiff={1}
            dynamicType={DynamicType.last30Days} // 第一优先级
            mode={Type.static}
            defaultOpen={false}
            afterConfirm={onDateChange}
            afterCancel={onDateCancel}
            format="YYYY/MM/DD HH:mm:ss"
            startTimeLimit="HH" // 控制能点击哪些时间
            endTimeLimit="HH:mm:ss"
            beforeStartDateChange={(current: Dayjs, endDate: Dayjs) => {
              let result: [Dayjs, Dayjs] = [current, endDate]
              // 开始时间和结束时间相差大于1天，校正结束时间
              if (Math.abs(current.startOf('day').diff(endDate, 'day')) > 1 || current.isAfter(endDate)) {
                result = [current.startOf('day'), current.endOf('day')]
              }
              return result
            }}
            beforeEndDateChange={(current: Dayjs, range: [Dayjs, Dayjs]) => {
              // 结束时间小于开始时间，校正开始时间为零点，结束时间保持上一次的时分秒
              if (current < range[0].startOf('day')) {
                return [current.startOf('day'), current]
              }
              return [range[0], current]
            }}
            disabledEndDate={(current: Dayjs, range: [Dayjs, Dayjs]) => {
              if (current.diff(range[0], 'day') >= 1) return false
              return true
            }}
          />
        </div>
      </App>
    </>
  )
}

export default Demo
