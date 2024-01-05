import { Footer, FloatMenu, Navbar } from 'src/fragments'
import { OpenMenuProvider } from './context/OpenMenuContext'
import { HeadIconWidth, Routes as routes } from 'src/config'

import { Fragment, type FunctionComponent, type PropsWithChildren } from 'react'
import ManNavBar from './fragments/ManNavBar'
import { MantineProvider } from '@mantine/core'

const Layout: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <Fragment>
    <OpenMenuProvider eventlist={['click', 'touchend']} sideAction='lostFocus'>
      <FloatMenu />
    </OpenMenuProvider>
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: 'dark',

        colors: {
          'brand': ['#F3E5F5', '#E1BEE7', '#CE93D8', '#BA68C8', '#9C27B0', '#8E24AA', '#7B1FA2', '#720b6f', '#6A1B9A', '#4A148C'],
        },

        breakpoints: {
          xs: '30em',
          sm: '48em',
          md: '64em',
          lg: '74em',
          xl: '90em',
          xll: '200em'
        },
      }}
    >
      <ManNavBar routes={routes}>{children}</ManNavBar>
    </MantineProvider>
  </Fragment>
)

export default Layout
