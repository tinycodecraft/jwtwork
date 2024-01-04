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
          
          brand: ['#F0BBDD', '#ED9BCF', '#EC7CC3', '#ED5DB8', '#F13EAF', '#F71FA7', '#FF00A1', '#E00890', '#C50E82','#AD1374' ],
          
        },

        breakpoints: {
          xs: '30em',
          sm: '48em',
          md: '64em',
          lg: '74em',
          xl: '90em',
        },
      }}
    >
      <ManNavBar routes={routes}>{children}</ManNavBar>
    </MantineProvider>    
  </Fragment>
)

export default Layout
