import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import localeData from 'dayjs/plugin/localeData'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc'
import { Calendar } from './lib'
import { ViewMode } from './lib/calendar/type'
// import { ViewMode } from './types'
// import { Calendar, ViewMode } from './react-canendar.js'
dayjs.extend(utc)
dayjs.extend(localeData)
dayjs.extend(localizedFormat)
dayjs.extend(dayOfYear)

dayjs.locale('zh-CN')

function Demo() {
  return (
    <Calendar
      // onBeforeNavigate={(nextView: ViewMode, currentView: ViewMode, viewDate: Dayjs) => {
      //   console.log(nextView, currentView, viewDate)

      //   return ViewMode.Year
      // }}
      initialViewMode={ViewMode.Year}
      onNavigate={(e) => console.log(e)}
    />
  )
}

export default Demo
