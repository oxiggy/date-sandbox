import { useEffect, useMemo, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { Box, Flex, Stack, Title, Text, Button, ActionIcon } from '@mantine/core'
import { DateTimePicker } from '@mantine/dates'
import dayjs from 'dayjs'

interface RouteParams {
  start?: string
  end?: string
}

const diffParams: Array<'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'> = ['year', 'month', 'day', 'hour', 'minute', 'second']

export default function Diff() {
  const navigate = useNavigate()
  const location = useLocation()
  const params = useParams<keyof RouteParams>()
  const [updateStartDate, setUpdateStartDate] = useState<boolean>(false)

  const dates = useMemo(() => {
    const searchParams = new URLSearchParams(location.search)
    const [start, end] = searchParams.getAll('date')

    let startDate
    if (start) {
      startDate = dayjs(start)
      if (startDate.isValid()) {
        startDate = startDate.toDate()
      } else {
        startDate = undefined
      }
    }

    let endDate
    if (end) {
      endDate = dayjs(end)
      if (endDate.isValid()) {
        endDate = endDate.toDate()
      } else {
        endDate = undefined
      }
    }

    return { startDate, endDate }
  }, [
    params,
    location.search
  ])

  const handleChangeDate = (key: 'startDate' | 'endDate') => (date: Date) => {
    const searchParams = new URLSearchParams(location.search)
    let [start, end] = searchParams.getAll('date')
    if (key === 'startDate') {
      start = date.toJSON()
    }
    if (key === 'endDate') {
      end = date.toJSON()
    }
    const search = `?date=${start}&date=${end}`
    navigate(location.pathname + search, { replace: true })
  }

  const handleToday = (key: 'startDate' | 'endDate') => () => {
    const date = new Date()
    handleChangeDate(key)(date)
  }

  useEffect(() => {
    if (updateStartDate) {
      const intervalId = setInterval(() => {
        handleChangeDate('startDate')(new Date())
      }, 1000)
      return () => clearInterval(intervalId)
    } else {
      return;
    }

  }, [updateStartDate])

  const diffValues = useMemo(() => {
    if (!dates.startDate || !dates.endDate) { return; }

    const date = dayjs(dates.startDate)
    let targetDate = dayjs(dates.endDate)
    let values: { [key:string]: number } = {}

    for (const item of diffParams) {
      const diff = dayjs(date).diff(targetDate, item)
      if (diff < 0) {
        targetDate = targetDate.subtract(Math.abs(diff), item)
      } else {
        targetDate = targetDate.add(Math.abs(diff), item)
      }
      values[item] = Math.abs(diff)
    }

    return values
  }, [dates.startDate, dates.endDate])

  return (
    <Box p='md'>
      <Flex gap='xl' wrap='wrap'>
        <DateTimePicker
          clearable
          withSeconds
          valueFormat='DD MMM YYYY HH:mm:ss'
          value={dates.startDate}
          onChange={handleChangeDate('startDate')}
          label={
            <Flex justify='space-between' w={{ base: 200, sm: 260 }} py='xs'>
              <span>First date</span>
              <Flex align='center' gap='4px'>
                <Button color='cyan' variant='default' size='xs' onClick={handleToday('startDate')}>Today</Button>
                <ActionIcon color='cyan' variant={updateStartDate ? 'filled' : 'default'} onClick={() => setUpdateStartDate(!updateStartDate)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="44"
                       height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none"
                       strokeLinecap="round" strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4"/>
                    <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4"/>
                  </svg>
                </ActionIcon>
              </Flex>
            </Flex>}
          placeholder="Pick first date and time"
          timeInputProps={{ 'aria-label': 'Pick time' }}
          submitButtonProps={{ 'aria-label': 'Submit' }}
          w={{ base: 200, sm: 260 }}
        />
        <DateTimePicker
          clearable
          withSeconds
          valueFormat='DD MMM YYYY HH:mm:ss'
          disabled={updateStartDate}
          value={dates.endDate}
          onChange={handleChangeDate('endDate')}
          label={
            <Flex justify='space-between' w={{ base: 200, sm: 260 }} py='xs'>
              <span>Second date</span>
              <Flex gap='4px' align='center'>
                <Button color='cyan' variant='default' size='xs' disabled={updateStartDate} onClick={handleToday('endDate')}>Today</Button>
              </Flex>
            </Flex>}
          placeholder='Pick second date and time'
          timeInputProps={{ 'aria-label': 'Pick time' }}
          submitButtonProps={{ 'aria-label': 'Submit' }}
          w={{ base: 200, sm: 260 }}
        />
      </Flex>
      {diffValues && (
        <Flex gap='2rem' wrap='wrap' justify='space-between' sx={{ maxWidth: '544px', padding: '40px 10px' }}>
          <Flex gap='1rem'>
            <Stack align='center' spacing='0' miw='4rem'>
              <Title variant='gradient' gradient={{ from: 'cyan', to: 'teal', deg: 45 }}>{diffValues?.year || 0}</Title>
              <Text>years</Text>
            </Stack>
            <Stack align='center' spacing='0' miw='4rem'>
              <Title variant='gradient' gradient={{ from: 'cyan', to: 'teal', deg: 45 }}>{diffValues?.month || 0}</Title>
              <Text>months</Text>
            </Stack>
            <Stack align='center' spacing='0' miw='4rem'>
              <Title variant='gradient' gradient={{ from: 'cyan', to: 'teal', deg: 45 }}>{diffValues?.day || 0}</Title>
              <Text>days</Text>
            </Stack>
          </Flex>
          <Flex gap='1rem'>
            <Stack align='center' spacing='0' miw='4rem'>
              <Title variant='gradient' gradient={{ from: 'cyan', to: 'teal', deg: 45 }}>{diffValues?.hour || 0}</Title>
              <Text>hours</Text>
            </Stack>
            <Stack align='center' spacing='0' miw='4rem'>
              <Title variant='gradient' gradient={{ from: 'cyan', to: 'teal', deg: 45 }}>{diffValues?.minute || 0}</Title>
              <Text>minutes</Text>
            </Stack>
            <Stack align='center' spacing='0' miw='4rem'>
              <Title variant='gradient' gradient={{ from: 'cyan', to: 'teal', deg: 45 }}>{diffValues?.second || 0}</Title>
              <Text>seconds</Text>
            </Stack>
          </Flex>
        </Flex>
      )}
    </Box>
  )
}

