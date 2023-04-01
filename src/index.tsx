import React from 'react'
import ReactDOM from 'react-dom/client'
import { createHashRouter, RouterProvider } from 'react-router-dom'
//styles
import { MantineProvider } from '@mantine/core'
import { theme } from 'theme'
import './index.css'
//components
import { Layout } from '@/components/layouts/Layout'
import { HomePage } from '@/components/pages/Home'
import Diff from '@/components/pages/Diff/Diff'
import Format from '@/components/pages/Format/Format'
import LocalTime from '@/components/pages/LocalTime/LocalTime'

const router = createHashRouter([
  {
    element: <Layout />,
    children: [
      {
        path: '/',
        element: <HomePage />,
      },
      {
        path: '/format',
        element: <Format />,
      },
      {
        path: '/local',
        element: <LocalTime />,
      },
      {
        path: '/diff',
        element: <Diff />,
      },
    ]
  },
])

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <RouterProvider router={router} />
    </MantineProvider>
  </React.StrictMode>,
)
