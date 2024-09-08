import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import localeData from 'dayjs/plugin/localeData'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import utc from 'dayjs/plugin/utc'
dayjs.extend(utc)
dayjs.extend(localeData)
dayjs.extend(localizedFormat)
dayjs.extend(dayOfYear)
// dayjs.locale('zh-CN')
