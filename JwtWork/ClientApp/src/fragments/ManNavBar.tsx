import { AppShell, Burger, Header, MantineProvider, MediaQuery, Footer, Tabs, useMantineTheme } from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'
import React, { useState, type FunctionComponent, useEffect } from 'react'
import type { Route } from 'src/config'
import { ReactComponent as BulmaLogoSVG } from 'src/assets/image/BulmaLogo.svg'
import { useIsLoggedIn } from 'src/utils'
import { useNavigate, generatePath, useLocation, useParams } from 'react-router'

const ManNavBar: FunctionComponent<{ routes: Route[] } & React.ComponentPropsWithRef<'div'>> = ({ routes, children, ...rest }) => {
  const [opened, setOpened] = useState<boolean>(false)
  const { width, height } = useViewportSize()
  const themefn = useMantineTheme()
  const isLoggedIn = useIsLoggedIn()
  const goto = useNavigate()
  const location = useLocation()
  const params = useParams()
  console.log(`the window width is : ${width} at ${location.pathname}`)
  useEffect(() => {
    console.log(`the effect happen on window width changed ${width} `)
  }, [width])
  return (
    <AppShell
      header={
        <Header height={{ base: 50, md: 70 }} p='md'>
          <div style={{ display: 'flex', alignItems: 'center', height: '100%' }}>
            <MediaQuery largerThan='sm' styles={{ display: 'none' }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size='sm'
                mr='xl'
                styles={(theme) => ({
                  root: {
                    color: theme.colorScheme == 'dark' ? theme.colors.dark[1] : theme.colors.dark[9],
                  },
                })}
              />
            </MediaQuery>
            <BulmaLogoSVG
              width={130}
              height={65}
              aria-hidden
              title='bulma.io-logo'
              style={{ backgroundColor: themefn.colorScheme == 'dark' ? themefn.colors.dark[9] : themefn.colors.dark[0] }}
            />
            {isLoggedIn && (
              <Tabs value={generatePath(location.pathname, params)} onTabChange={(value: string) => goto(value)} defaultValue={generatePath('/home')}>
                <Tabs.List>
                  {routes
                    .filter(({ showInNav }) => showInNav)
                    .map(({ path, name, params }, index) => (
                      <Tabs.Tab key={`${name}-${index}`} value={generatePath(path, params)}>
                        {name}
                      </Tabs.Tab>
                    ))}
                </Tabs.List>
              </Tabs>
            )}
          </div>
        </Header>
      }
      footer={
        <Footer height={60} p='md'>
          Application footer
        </Footer>
      }
    >
      {children}
    </AppShell>
  )
}

export default ManNavBar
