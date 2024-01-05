import {
  AppShell,
  Burger,
  Header,
  MediaQuery,
  Footer,
  Tabs,
  useMantineTheme,
  Button,
  createPolymorphicComponent,
  type ButtonProps,
  Drawer,
} from '@mantine/core'
import { useViewportSize } from '@mantine/hooks'
import React, { useState, type FunctionComponent, useEffect, useRef } from 'react'
import { FootBarHeight, type Route } from 'src/config'
import { ReactComponent as BulmaLogoSVG } from 'src/assets/image/BulmaLogo.svg'
import { clsxm, useIsLoggedIn } from 'src/utils'
import { useNavigate, generatePath, useLocation, useParams } from 'react-router'
import { Bars4Icon, BookOpenIcon, IdentificationIcon, PencilIcon, PuzzlePieceIcon, SunIcon, MapIcon } from '@heroicons/react/24/outline'
import styled from '@emotion/styled'
import { DragOverlay } from '@dnd-kit/core'

const _StyledButton = styled(Button)`
  border-width: 0.125rem;
  color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.brand[0] : theme.colors.brand[9])};
  background-color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.brand[7] : theme.colors.brand[1])};
  &:hover {
    background-color: ${({ theme }) => (theme.colorScheme === 'dark' ? theme.colors.brand[6] : theme.colors.brand[3])};
  }
`
const StyledButton = createPolymorphicComponent<'button', ButtonProps>(_StyledButton)

const ManNavBar: FunctionComponent<{ routes: Route[] } & React.ComponentPropsWithRef<'div'>> = ({ routes, children, ...rest }) => {
  const [opened, setOpened] = useState<boolean>(false)
  const [drawerTop, setDrawerTop] = useState<number>(0)
  const headRef = useRef<HTMLDivElement | null>(null)
  const { width, height } = useViewportSize()
  const themefn = useMantineTheme()
  const isLoggedIn = useIsLoggedIn()
  const goto = useNavigate()
  const location = useLocation()
  const params = useParams()
  const icons = [Bars4Icon, IdentificationIcon, PuzzlePieceIcon, PencilIcon, SunIcon, BookOpenIcon, MapIcon]

  console.log(`the window width is : ${width} at ${location.pathname}`)
  useEffect(() => {
    console.log(`try to render effect`)
    if (headRef.current) {
      const { height } = headRef.current.getBoundingClientRect()
      console.log(`the height of the header is ${height}`)
      if (height) {
        setDrawerTop(height)
      }
    }
  }, [])
  useEffect(() => {
    console.log(`the effect happen on window width changed ${width} `)
    if (headRef.current) {
      const { height } = headRef.current.getBoundingClientRect()
      console.log(`the height of the header is ${height}`)
      if (height) {
        setDrawerTop(height)
      }
    }
  }, [width])
  return (
    <AppShell
      header={
        <Header
          ref={headRef}
          height={{ base: 50, md: 70 }}
          pt={`md`}
          pb={`xs`}
          pl={`md`}
          style={{ backgroundColor: themefn.colorScheme == 'dark' ? themefn.colors.brand[9] : themefn.colors.brand[1] }}
        >
          <div className='flex items-center h-[120%] justify-between'>
            <div className='mr-10'>
              <BulmaLogoSVG width={130} height={65} aria-hidden title='bulma.io-logo' />
              {/* only pseudo element to help give some gap in flex items */}
              <br className='mr-10' />
            </div>
            <div>
              {isLoggedIn && (
                <MediaQuery smallerThan={`lg`} styles={{ display: 'none' }}>
                  <Tabs
                    color='lime'
                    value={generatePath(location.pathname, params)}
                    onTabChange={(value: string) => goto(value)}
                    defaultValue={generatePath('/home')}
                    className='-mb-1'
                  >
                    <Tabs.List>
                      {routes
                        .filter(({ showInNav }) => showInNav)
                        .map(({ path, name, params }, index) => (
                          <Tabs.Tab
                            key={`${name}-${index}`}
                            value={generatePath(path, params)}
                            icon={React.createElement(icons[index], { className: 'h-[18px] w-[18px] mr-2 inline' })}
                            className='text-lg underline-flash'
                          >
                            {name}
                          </Tabs.Tab>
                        ))}
                    </Tabs.List>
                  </Tabs>
                </MediaQuery>
              )}
              <MediaQuery largerThan='lg' styles={{ display: 'none' }}>
                <Burger opened={opened} onClick={() => setOpened((o) => !o)} size='sm' mr='xl' />
              </MediaQuery>
            </div>
          </div>
        </Header>
      }
      footer={
        <Footer height={FootBarHeight} p='md'>
          <StyledButton>This is a footer button from styled</StyledButton>
        </Footer>
      }
    >
      <Drawer.Root
        opened={opened}
        size={`14rem`}
        onClose={() => setOpened(false)}
        sx={(theme) => ({
          top: `${drawerTop}px`,
          bottom: `${FootBarHeight}px`,
          background: theme.colorScheme == 'dark' ? theme.fn.rgba(theme.colors.dark[9], 0.1) : theme.fn.rgba(theme.colors.dark[0], 0.1),
        })}
      >
        <Drawer.Overlay sx={{ top: `${drawerTop}px`, bottom: `${FootBarHeight}px` }} />
        <Drawer.Content
            sx={(theme) => ({
              
              background: theme.colorScheme == 'dark' ? theme.fn.rgba(theme.colors.dark[9], 0.1) : theme.fn.rgba(theme.colors.dark[0], 0.1),
            })}        
        >
          <Drawer.Header
            sx={(theme) => ({
              height: `${drawerTop}px`,
              background: theme.colorScheme == 'dark' ? theme.fn.rgba(theme.colors.dark[9], 0.1) : theme.fn.rgba(theme.colors.dark[0], 0.1),
            })}
          >
            
          </Drawer.Header>
          <Drawer.Body
            sx={(theme) => ({
              background: theme.colorScheme == 'dark' ? theme.fn.rgba(theme.colors.dark[9], 0.1) : theme.fn.rgba(theme.colors.dark[0], 0.1),
            })}
          >
            <Tabs
              color='lime'
              orientation='vertical'
              value={generatePath(location.pathname, params)}
              onTabChange={(value: string) => {
                setOpened(false)
                goto(value)
              }}
              defaultValue={generatePath('/home')}
            >
              <Tabs.List>
                {routes
                  .filter(({ showInNav }) => showInNav)
                  .map(({ path, name, params }, index) => (
                    <Tabs.Tab
                      key={`${name}-${index}`}
                      value={generatePath(path, params)}
                      icon={React.createElement(icons[index], { className: 'h-[18px] w-[18px] mr-2 inline' })}
                      className='text-lg underline-flash'
                    >
                      {name}
                    </Tabs.Tab>
                  ))}
              </Tabs.List>
            </Tabs>
          </Drawer.Body>
        </Drawer.Content>
      </Drawer.Root>

      {children}
    </AppShell>
  )
}

export default ManNavBar
