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
          'brand': ['#ffe5ff', '#f9b9f8', '#f18def', '#eb60e8', '#e534e0', '#cb1ac7', '#9f139b', '#720b6f', '#460444', '#1b001a'],
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
