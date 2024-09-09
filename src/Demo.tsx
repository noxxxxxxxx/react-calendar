import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import localeData from 'dayjs/plugin/localeData'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc'
import { useState } from 'react'
import Calendar from './lib'
// import { ViewMode } from './types'
// import { Calendar, ViewMode } from './react-canendar.js'
dayjs.extend(utc)
dayjs.extend(localeData)
dayjs.extend(localizedFormat)
dayjs.extend(dayOfYear)

// dayjs.locale('zh-CN')

function Demo() {
  const [value, setValue] = useState(dayjs('2024-09-21'))
  return (
    <>
      <Calendar
        value={value}
        onChange={(v) => {
          console.log(v)
        }}
        onClose={(v) => console.log(v, 'close')}
      />
    </>
  )
}

export default Demo
