import { useState } from 'react'
import { DateTimePicker } from '@mantine/dates'
import { Box, Text, CopyButton, ActionIcon, Tooltip } from '@mantine/core'
import { IconCopy, IconCheck } from '@tabler/icons-react'
//date
import dayjs from 'dayjs'
import toArray from 'dayjs/plugin/toArray'
import duration from 'dayjs/plugin/duration'
import relativeTime from 'dayjs/plugin/relativeTime'
import advancedFormat from 'dayjs/plugin/advancedFormat'
import isLeapYear from 'dayjs/plugin/isLeapYear'
import weekOfYear from 'dayjs/plugin/weekOfYear'
import dayOfYear from 'dayjs/plugin/dayOfYear'
import calendar from 'dayjs/plugin/calendar'
import weekday from 'dayjs/plugin/weekday'
import utc from 'dayjs/plugin/utc'

dayjs.extend(toArray)
dayjs.extend(duration)
dayjs.extend(relativeTime)
dayjs.extend(advancedFormat)
dayjs.extend(isLeapYear)
dayjs.extend(weekOfYear)
dayjs.extend(dayOfYear)
dayjs.extend(calendar)
dayjs.extend(weekday)
dayjs.extend(utc)

const calendarFormats = {
  sameDay: '[The same day]',
  nextDay: '[The next day]',
  nextWeek: 'dddd, [next week]',
  lastDay: '[The day before]',
  lastWeek: '[Last] dddd',
  sameElse: 'dddd, MMM D, YYYY',
}

const accentColor = 'violet.4'
const unixInfo = <>Unix time is a date and time by&nbsp;the number of seconds that have elapsed since 00:00:00&nbsp;UTC on 1 January 1970</>

const Copy = ({ value }: { value: string }) => {
  return (
    <Box sx={{ display: 'inline-block', '& > *': { display: 'inline-flex' } }}>
      <CopyButton value={value} timeout={2000}>
        {({ copied, copy }) => (
          <Tooltip label={copied ? 'Copied' : 'Copy'} withArrow position="right">
            <ActionIcon color={copied ? accentColor : 'gray'} onClick={copy}>
              {copied ? <IconCheck size="1rem" /> : <IconCopy size="1rem" />}
            </ActionIcon>
          </Tooltip>
        )}
      </CopyButton>
    </Box>
  )
}

export default function Format() {
  const [value, setValue] = useState<Date | null>(new Date());

  return (
    <Box p='md'>
      <DateTimePicker
        clearable
        withSeconds
        valueFormat="DD MMM YYYY HH:mm"
        value={value}
        onChange={setValue}
        label="Pick date and time"
        placeholder="Pick date and time"
        maw={400}
      />
      {value && (
        <Box py='lg'>
          <Text mb='sm'><Text span fw={400} c={accentColor}>Local:</Text> {dayjs(value).format()} <Copy value={dayjs(value).format()} /></Text>
          <Text mb='sm'><Text span fw={400} c={accentColor}>UTC:</Text> {dayjs(value).utc().format()} <Copy value={dayjs(value).utc().format()} /></Text>{/*utc*/}
          <Text mb='sm'><Text span fw={400} c={accentColor}>ISO:</Text> {dayjs(value).toISOString()} <Copy value={dayjs(value).toISOString()} /></Text>
          <Text mb='sm'><Text span fw={400} c={accentColor}>JSON:</Text> {dayjs(value).toJSON()} <Copy value={dayjs(value).toJSON()} /></Text>
          <Text mb='sm'><Text span fw={400} c={accentColor}>Array:</Text> [{dayjs(value).toArray().join(', ')}] <Copy value={`[${dayjs(value).toArray().join(', ')}]`} /></Text>{/*toArray*/}
          <Text mb='sm'><Text span fw={400} c={accentColor}>String:</Text> {dayjs(value).toString()} <Copy value={dayjs(value).toString()} /></Text>

          <Text mt='xl' fw={600} c={accentColor}>Date</Text>
          <Text>{dayjs(value).format('dddd, D MMMM, YYYY')}</Text>
          <Text>{dayjs(value).format('ddd, MMM D')}</Text>
          <Text>{dayjs(value).format('DD-MMM-YYYY')}</Text>
          <Text>{dayjs(value).format('DD.MM.YYYY')}</Text>
          <Text>{dayjs(value).format('YYYY/MM/DD')}</Text>
          <Text>{dayjs(value).format('MM/DD/YYYY')}</Text>

          <Text mt='sm' fw={600} c={accentColor}>Time</Text>
          <Text>{dayjs(value).format('hh:mm A')}</Text>
          <Text>{dayjs(value).format('H:mm')}</Text>
          <Text>{dayjs(value).format('HH:mm, UTC: Z')}</Text>

          <Text mt='sm' fw={600} c={accentColor}>Humanize <Text span fw={400}>(from now)</Text></Text>{/*duration relativeTime*/}
          <Text>{dayjs.duration(dayjs(value).diff(dayjs())).humanize()}</Text>
          <Text>{dayjs(value).fromNow()}</Text>

          <Text mt='sm' fw={600} c={accentColor}>Humanize <Text span fw={400}>(from 1.1.2023)</Text></Text>{/*relativeTime*/}
          <Text>{dayjs(value).from(dayjs('2023-01-01'), true)}</Text>
          <Text>{dayjs(value).from(dayjs('2023-01-01') )}</Text>

          <Text mt='sm' fw={600} c={accentColor}>Advanced Format</Text>{/*advancedFormat weekOfYear*/}
          <Text>{dayjs(value).format('MMMM Do, YYYY')}</Text>
          <Text>{dayjs(value).format('Q')} Quarter</Text>
          <Text>{dayjs(value).format('wo')} week</Text>

          <Text mt='sm' fw={600} c={accentColor}>Other</Text>
          <Text>Day Of Year:  {dayjs(value).dayOfYear()}</Text>{/*dayOfYear*/}
          <Text>Leap Year:  {dayjs(value).isLeapYear() ? 'yes' : 'no'}</Text>{/*isLeapYear*/}
          <Text>Number of days in {dayjs(value).format('MMMM')}: {dayjs(value).daysInMonth()}</Text>
          <Text mt='sm'>Calendar: {dayjs(value).calendar(dayjs())}</Text>{/*calendar*/}
          <Text><Tooltip color={accentColor} multiline withArrow arrowSize={6} arrowRadius={2} transitionProps={{ duration: 200 }} label={'Customized'}><span>Calendar*:</span></Tooltip> {dayjs(value).calendar(dayjs(), calendarFormats)}</Text>{/*calendar*/}
          <Text mt='sm'>Weekdays: {dayjs(value).weekday(1).format('ddd: D MMM')}, {dayjs(value).weekday(2).format('ddd: D MMM')}, {dayjs(value).weekday(3).format('ddd: D MMM')}, {dayjs(value).weekday(4).format('ddd: D MMM')}, {dayjs(value).weekday(5).format('ddd: D MMM')}</Text>{/*weekday*/}
          <Text>Weekends:  {dayjs(value).weekday(6).format('D MMM')}, {dayjs(value).weekday(7).format('D MMM')}</Text>{/*weekday*/}
          <Text>Last weekends:  {dayjs(value).weekday(-1).format('D MMM')}, {dayjs(value).weekday(0).format('D MMM')}</Text>{/*weekday*/}
          <Text>Next weekends:  {dayjs(value).weekday(13).format('D MMM')}, {dayjs(value).weekday(14).format('D MMM')}</Text>{/*weekday*/}
          <Text mt='sm'><Tooltip color={accentColor} multiline width={246} withArrow arrowSize={6} arrowRadius={2} transitionProps={{ duration: 200 }} label={unixInfo}><span>Unix Timestamp*:</span></Tooltip> {dayjs(value).format('X')} second <Copy value={dayjs(value).format('X')} /></Text>
          <Text my='sm'>Unix Timestamp: {dayjs(value).format('x')} millisecond <Copy value={dayjs(value).format('x')} /></Text>
        </Box>
      )}
    </Box>
  )
}

