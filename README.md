<div align="center">
  <a href="https://github.com/noxxxxxxxx/calendar" target="_blank">
    <img alt="Calendar Logo" width="150" src="https://github.com/noxxxxxxxx/calendar/blob/main/assets/calendar.svg"/>
  </a>
</div>

<div align="center">
  <h1>React Calendar</h1>
</div>

<div align="center">
<img alt="NPM Version" src="https://img.shields.io/npm/v/rc-calendar-picker">
<img alt="NPM dev or peer Dependency Version" src="https://img.shields.io/npm/dependency-version/rc-calendar-picker/peer/react">
<img alt="npm package minimized gzipped size" src="https://img.shields.io/bundlejs/size/rc-calendar-picker">
<img alt="NPM Downloads" src="https://img.shields.io/npm/dm/rc-calendar-picker">
<a href="https://codecov.io/github/noxxxxxxxx/calendar" > 
 <img src="https://codecov.io/github/noxxxxxxxx/calendar/graph/badge.svg?token=46941XHOAN"/> 
</a>
</div>

A lightweight but complete calendar picker react component.

## API

| Name                | Type                    | Default                                         | Description                                                                                                                                                                                                                                                                                                                                                                                             |
| ------------------- | ----------------------- | ----------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| value               | `Dayjs`                 | `undefined`                                     | Represents the selected date by the component, in order to use it as a controlled component. This prop is parsed by dayjs, so it is possible to use a date string or a dayjs object.                                                                                                                                                                                                                    |
| initialValue        | `Dayjs`                 | `undefined`                                     | Represents the selected date for the component to use it as a uncontrolled component. This prop is parsed by Dayjs, so it is possible to use a date string or a dayjs object. If you need to set the selected date programmatically after the picker is initialized, please use the value prop instead.                                                                                                 |
| initialViewMode     | `string`                | `day`                                           | The default view to display when the picker is shown for the first time ('year', 'month', 'day', 'time'). If you want to set the view mode after the component has been initialize see the imperative API.                                                                                                                                                                                              |
| showInput           | `boolean`               | `true`                                          | Whether to show an input field to edit the date manually.                                                                                                                                                                                                                                                                                                                                               |
| open                | `boolean`               | `undefined`                                     | Whether to open or close the picker. If not set react-calendar will open the datepicker on input focus and close it on click outside.                                                                                                                                                                                                                                                                   |
| timezoneOffset      | `number`                | `undefined`                                     | Specifies the timezone offset in hours, the input parameters will be adjusted based on the timezone offset after being passed in, it will also affect the result value                                                                                                                                                                                                                                  |
| closeOnSelect       | `boolean`               | `false`                                         | When true, once the day has been selected, the datepicker will be automatically closed.                                                                                                                                                                                                                                                                                                                 |
| className           | `string` or `string[]`  | `''`                                            | Extra class name for the outermost markup element.                                                                                                                                                                                                                                                                                                                                                      |
| inputProps          | `object`                | `undefined`                                     | Defines additional attributes for the input element of the component. For example: onClick, placeholder, disabled, required, name and className (className sets the class attribute for the input element). See Customize the Input Appearance.                                                                                                                                                         |
| dateFormat          | `string` \| `boolean`   | `LTS`                                           | Defines the format for the date. It accepts any dayjs date format. If it hasn't been set the date will be displayed using the defaults for the current locale.                                                                                                                                                                                                                                          |
| timeFormat          | `string` \| `boolean`   | `L`                                             | Defines the format for the time. It accepts any dayjs time format. If it hasn't been set the time will be displayed using the defaults for the current locale.                                                                                                                                                                                                                                          |
| viewMode            | `ViewMode \| undefined` | `undefined`                                     | Only display single mode                                                                                                                                                                                                                                                                                                                                                                                |
| closeOnClickOutside | `boolean`               | `true`                                          | When the calendar is open and closeOnClickOutside is true (its default value), clickin outside of the calendar or input closes the calendar. If false the calendar stays open.                                                                                                                                                                                                                          |
| timeLimit           | `string`                | `hh:mm:ss`                                      | Restrict the selectable time granularity.                                                                                                                                                                                                                                                                                                                                                               |
| showTime            | `boolean`               | `false`                                         | Whether to select the time.                                                                                                                                                                                                                                                                                                                                                                             |
| isEndDate           | `boolean`               | `false`                                         | This setting is required only when you are using two calendar components to select a time range. This parameter is used to affect whether the range style is displayed.                                                                                                                                                                                                                                 |
| siblingDate         | `DayJs`                 | `undefined`                                     | This parameter is used to determine and highlight the start date/end date. It is typically used in conjunction with `isEndDate` and is only needed when you want to build the capability for range selection.                                                                                                                                                                                           |
| isValidDate         | `function`              | `() => boolean`                                 | Define the dates that can be selected. The function receives (currentDate, selectedDate) and shall return a true or false whether the currentDate is valid or not. See selectable dates.                                                                                                                                                                                                                |
| timeConstraints     | `TimeConstraintsType`   | `undefined`                                     | It is used to constrain the maximum and minimum values of hours, minutes, and seconds, as well as their respective step sizes.                                                                                                                                                                                                                                                                          |
| onOpen              | `function`              | empty function                                  | Callback trigger for when the user opens the calendar.                                                                                                                                                                                                                                                                                                                                                  |
| onChange            | `function`              | empty function                                  | Callback trigger when the date changes. The callback receives the selected dayjs object as only parameter, if the date in the input is valid. If the date in the input is not valid, the callback receives the value of the input (a string).                                                                                                                                                           |
| onClose             | `function`              | empty function                                  | Callback trigger for when the calendar get closed. The callback receives the selected dayjs object as only parameter, if the date in the input is valid. If the date in the input is not valid, the callback returns the value in the input.                                                                                                                                                            |
| onBeforeNavigate    | `function`              | ( nextView, currentView, viewDate ) => nextView | Allows to intercept a change of the calendar view. The accepted function receives the view that it's supposed to navigate to, the view that is showing currently and the date currently shown in the view. Return a viewMode ( default ones are year, month, day or time) to navigate to it. If the function returns a "falsy" value, the navigation is stopped and we will remain in the current view. |
| onNavigate          | `function`              | empty function                                  | Callback trigger when the view mode changes. The callback receives the selected view mode string (year, month, day or time) as only parameter.                                                                                                                                                                                                                                                          |
| onNavigateForward   | `function`              | empty function                                  | Callback trigger when the user navigates to the next month, year or decade. The callback receives the amount and type ('month', 'year') as parameters.                                                                                                                                                                                                                                                  |
| onNavigateBack      | `function`              | empty function                                  | Callback trigger when the user navigates to the previous month, year or decade. The callback receives the amount and type ('month', 'year') as parameters.                                                                                                                                                                                                                                              |

## How to use

1. [Basic demo](https://codesandbox.io/p/sandbox/base-5dk3kr)
2. [isValidDate prop demo](https://codesandbox.io/p/sandbox/isvaliddate-222jgq)
3. [DateFormat & timeFormat demo](https://codesandbox.io/p/sandbox/83pk2c)
4. [ViewMode demo](https://codesandbox.io/p/sandbox/83pk2c)

## Develop

```
pnpm i

npm run dev
```

## Test

```
npm run test

npm run coverage
```

## LICENSE

This repository is published under [MIT license]()
