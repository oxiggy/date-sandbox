import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { ActionIcon, Flex, Text } from '@mantine/core'

export function Layout() {
  return (
    <>
      <Flex px='md' pb='md' pt='xl'
        sx={{
          gap: '42px',
          borderBottom: '1px solid #2c3136',
          background: 'linear-gradient(0deg, rgba(30,30,30,1) 0%, rgba(33,37,41,1) 44%, rgba(33,37,41,1) 100%)',
          '@media (max-width: 1000px)': { gap: '1.5rem' },
        }}>
        <ActionIcon
          variant='transparent'
          color='gray'
          component={NavLink}
          to='/'
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="44"
               height="44" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" fill="none" strokeLinecap="round"
               strokeLinejoin="round">
            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
            <path d="M9.828 9.172a4 4 0 1 0 0 5.656a10 10 0 0 0 2.172 -2.828a10 10 0 0 1 2.172 -2.828a4 4 0 1 1 0 5.656a10 10 0 0 1 -2.172 -2.828a10 10 0 0 0 -2.172 -2.828" />
          </svg>
        </ActionIcon>
        <Text fz='md' fw='bold' tt='capitalize'
          variant='gradient'
          gradient={{ from: 'gray', to: 'cyan', deg: 45 }}
          component={NavLink}
          to='/diff'
        >
          diff
        </Text>
        <Text fz='md' fw='bold' tt='capitalize'
          variant='gradient'
          gradient={{ from: 'gray', to: 'violet', deg: 45 }}
          component={NavLink}
          to='/format'
        >
          format
        </Text>
        <Text fz='md' fw='bold' tt='capitalize'
          variant='gradient'
          gradient={{ from: 'gray', to: 'pink', deg: 45 }}
          component={NavLink}
          to='/local'
        >
          local
        </Text>
      </Flex>
      <Outlet />
    </>
  )
}
