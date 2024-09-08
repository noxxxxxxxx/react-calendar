import '@testing-library/jest-dom'
import dayjs from 'dayjs'
import { describe, it } from 'vitest'
import { DateFormat, TimeConstraints } from '../../lib/calendar/constant'
import { createConstraints, getAMPM, getDateFormat, getTimeParts, isAMPM, pad } from '../../lib/calendar/helper'

describe('pad function', () => {
  it('Pad with a zero when the hour value is less than 10.', () => {
    expect(pad('hour', 1)).toEqual('01')
  })
  it('Pad with a zero when the minute value is less than 10.', () => {
    expect(pad('minute', 1)).toEqual('01')
  })
  it('Pad with a zero when the second value is less than 10.', () => {
    expect(pad('second', 1)).toEqual('01')
  })
  it('Pad with a zero when the millisecond value is less than 10', () => {
    expect(pad('millisecond', 1)).toEqual('001')
  })

  it('Display the original value when the hour count exceeds 10.', () => {
    expect(pad('hour', 13)).toEqual('13')
  })
  it('Display the original value when the minute count exceeds 10.', () => {
    expect(pad('minute', 12)).toEqual('12')
  })
  it('Display the original value when the second count exceeds 10.', () => {
    expect(pad('second', 11)).toEqual('11')
  })
  it('Display the original value when the millisecond count exceeds 10.', () => {
    expect(pad('millisecond', 11)).toEqual('011')
  })
})

describe('isAMPM function', () => {
  it('equal false when first param is not valid dayjs Object', () => {
    expect(isAMPM(undefined, '')).toEqual(false)
  })

  it('equal true when second param is true', async () => {
    const [localeData, localizedFormat] = await Promise.all([
      import('dayjs/plugin/localeData'),
      import('dayjs/plugin/localizedFormat'),
    ])
    dayjs.extend(localeData.default)
    dayjs.extend(localizedFormat.default)

    expect(isAMPM(dayjs(), true)).toEqual(true)
  })

  it('equal true when second param is invalid time format', async () => {
    const [localeData, localizedFormat] = await Promise.all([
      import('dayjs/plugin/localeData'),
      import('dayjs/plugin/localizedFormat'),
    ])
    dayjs.extend(localeData.default)
    dayjs.extend(localizedFormat.default)
    expect(isAMPM(dayjs(), 'L')).toEqual(false)
  })
})

describe('getAMPM function', () => {
  it('equal empty when first param is not valid dayjs Object', () => {
    expect(getAMPM(undefined, '')).toEqual('')
  })

  it('exist ampm keywords when second param is valid', async () => {
    const [localeData, localizedFormat] = await Promise.all([
      import('dayjs/plugin/localeData'),
      import('dayjs/plugin/localizedFormat'),
    ])
    dayjs.extend(localeData.default)
    dayjs.extend(localizedFormat.default)

    expect(getAMPM(dayjs('2024-01-01 10:10'), true).split(' ')[1]).toEqual('AM')
    expect(getAMPM(dayjs('2024-01-01 14:10'), true).split(' ')[1]).toEqual('PM')
  })
})

describe('getDateFormat function', () => {
  it('equal constant DateFormat', () => {
    expect(getDateFormat(true)).toEqual(DateFormat)
    expect(getDateFormat(undefined)).toEqual(DateFormat)
  })

  it('equal enpty string', () => {
    expect(getDateFormat(false)).toEqual('')
  })

  it('equal param string', () => {
    expect(getDateFormat('L')).toEqual('L')
  })
})

describe('getTimeParts function', () => {
  it('equal default result', () => {
    expect(getTimeParts(undefined)).toEqual({
      hour: '00',
      minute: '00',
      second: '00',
      millisecond: '00',
      ampm: 'am',
    })
  })

  it('equal given dayjs format time', () => {
    expect(getTimeParts(dayjs('2024-01-01 10:10:11'))).toEqual({
      hour: '10',
      minute: '10',
      second: '11',
      millisecond: '000',
      ampm: 'am',
    })

    expect(getTimeParts(dayjs('2024-01-01 13:10:11'))).toEqual({
      hour: '13',
      minute: '10',
      second: '11',
      millisecond: '000',
      ampm: 'pm',
    })
  })
})

describe('createConstraints function', () => {
  it('equal default TimeConstraints', () => {
    expect(createConstraints()).toStrictEqual(TimeConstraints)
  })

  it('equal given time constraints object', () => {
    const params = {
      hour: {
        min: 10,
        max: 123,
        step: 1,
      },
      minute: {
        min: 10,
        max: 159,
        step: 1,
      },
      second: {
        min: 10,
        max: 519,
        step: 12,
      },
      millisecond: {
        min: 30,
        max: 9499,
        step: 11,
      },
    }
    expect(JSON.stringify(createConstraints(params))).toEqual(JSON.stringify(params))
  })
})
