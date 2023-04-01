import { useEffect, useState } from 'react'
import { Box, Table, Text } from '@mantine/core'
import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import advancedFormat from 'dayjs/plugin/advancedFormat'

dayjs.extend(advancedFormat)
dayjs.extend(localizedFormat)
dayjs.extend(timezone)
dayjs.extend(utc)

const dateTemplate = 'D MMM'
const timeTemplate = 'HH:mm'
const offsetTemplate = 'Z'

const accentColor = 'pink.9'

const timezones = [
  { name: 'New York', tz: 'America/New_York', },
  { name: 'London', tz: 'Europe/London', },
  { name: 'Helsinki', tz: 'Europe/Helsinki', },
  { name: 'Tbilisi', tz: 'Asia/Tbilisi', },
  { name: 'Bangkok', tz: 'Asia/Bangkok', },
  { name: 'Seoul', tz: 'Asia/Seoul', },
  { name: 'Kamchatka', tz: 'Asia/Kamchatka', },
  { name: 'Los Angeles', tz: 'America/Los_Angeles', },
  { name: 'Mexico City', tz: 'America/Mexico_City', },
  { name: 'Buenos Aires', tz: 'America/Buenos_Aires', },
]

export default function LocalTime() {
  const [ now, setNow ] = useState(dayjs())

  useEffect(() => {
    const intervalId = setInterval(() => {
      setNow(dayjs())
    }, 3000)
    return () => clearInterval(intervalId)
  }, [])

  return (
    <Box p='xl'>
      <Table highlightOnHover withBorder horizontalSpacing='xl' verticalSpacing='md' w='auto'>
        <thead>
          <tr>
            <th><Text fw={700} c={accentColor}>City</Text></th>
            <th><Text fw={700} c={accentColor}>Time</Text></th>
            <th><Text fw={700} c={accentColor}>Offset</Text></th>
            <th><Text fw={700} c={accentColor}>Date</Text></th>
            <th><Text fw={700} c={accentColor}>Named offset</Text></th>
          </tr>
        </thead>
        <tbody>
        <tr style={{ fontWeight: 600 }}>
          <td>Local</td>
          <td>{dayjs(now).tz(dayjs.tz.guess()).format(timeTemplate)}</td>
          <td>{dayjs(now).tz(dayjs.tz.guess()).format(offsetTemplate)}</td>
          <td>{dayjs(now).tz(dayjs.tz.guess()).format(dateTemplate)}</td>
          <td>{dayjs(now).tz(dayjs.tz.guess()).format('z - zzz')}</td>
        </tr>
          {timezones.map((timezone) => (
            <tr key={timezone.name}>
              <td>{timezone.name}</td>
              <td>{dayjs(now).tz(timezone.tz).format(timeTemplate)}</td>
              <td>{dayjs(now).tz(timezone.tz).format(offsetTemplate)}</td>
              <td>{dayjs(now).tz(timezone.tz).format(dateTemplate)}</td>
              <td>{dayjs(now).tz(timezone.tz).format('z - zzz')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Box>
  )
}
