import { clsxm, useIsLoggedIn } from 'src/utils'
import { HeadIconWidth, Routes as routes } from 'src/config'
import React, { useState, type FunctionComponent, useEffect } from 'react'
import { NavLink, generatePath } from 'react-router-dom'
import { ReactComponent as BulmaLogoSVG } from 'src/assets/image/BulmaLogo.svg'
import { Bars4Icon, BookOpenIcon, IdentificationIcon, PencilIcon, PuzzlePieceIcon, SunIcon,MapIcon } from '@heroicons/react/24/outline'
import { useResizeObserver } from '@mantine/hooks'
import { Drawer, IconButton } from '@material-tailwind/react'
import { useWindowSize } from 'src/utils/useWindowSize'

const Navbar: FunctionComponent = () => {
  const isLoggedIn = useIsLoggedIn()
  const [navRef, navRect] = useResizeObserver()
  const windowSize = useWindowSize()
  console.log(`the navbar is loaded! nav width ${navRect.width} against window ${windowSize.winWidth}`)

  const [isfullwidth, setfullwidth] = useState<boolean>(!windowSize.winWidth || windowSize.winWidth > (navRect.width + HeadIconWidth))
  const [isNavOpen, setNavOpen] = useState<boolean>(false)
  
  useEffect(() => {
    if (windowSize.winWidth) {
      const isfull = windowSize.winWidth > (navRect.width+ HeadIconWidth)
      setfullwidth(isfull)      
      
    }
  }, [windowSize, navRect])  
  
  const toggleIsNavOpen = () => setNavOpen((cur) => !cur)
  

  const icons = [Bars4Icon, IdentificationIcon, PuzzlePieceIcon, PencilIcon, SunIcon,BookOpenIcon,MapIcon]

  return (
    <div>
      <Drawer open={isNavOpen} onClose={() => setNavOpen(false)}>
        <aside className='menu'>
          <div className='mb-[0.75rem] flex items-center justify-between px-4 pt-4 bg-amber-50' >
            <svg viewBox='0 0 200 60' xmlns='http://www.w3.org/2000/svg' dominantBaseline='middle'>
              <text y='25' fontFamily='Great Vibes' fontWeight={900} fill='#1e2fc5e8' fontSize={36}>
                B
              </text>
              <text x='40' y='25' fontFamily='Roboto' fontWeight={400} fill='#2c2c23e4'>
                ulma
              </text>     
              <text x='90' y='30' fontFamily='Great Vibes' fontWeight={900} fill='#1e2fc5e8' fontSize={36}>
                M
              </text>
              <text x='140' y='25' fontFamily='Roboto' fontWeight={400} fill='#2c2c23e4'>
                enu
              </text>     

            </svg>
            <IconButton variant='text' color='blue-gray' onClick={() => setNavOpen(false)} className='mb-[0.75rem]'>
              <svg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' strokeWidth={2} stroke='currentColor' className='h-5 w-5'>
                <path strokeLinecap='round' strokeLinejoin='round' d='M6 18L18 6M6 6l12 12' />
              </svg>
            </IconButton>
          </div>
          <ul className='menu-list'>
            {isLoggedIn &&
              routes
                .filter(({ showInNav }) => showInNav)
                .map(({ path, name, params }, index) => (
                  <li key={`menu ${name}-${index}`}>
                    <NavLink
                      key={name}
                      to={generatePath(path, params)}
                      onClick={() => setNavOpen(false)}
                      className={({ isActive }) => 'navbar-item items-center' + (isActive ? ' is-active' : '')}
                    >
                      {React.createElement(icons[index], { className: 'h-[18px] w-[18px] mr-2 inline' })} {name}
                    </NavLink>
                  </li>
                ))}
          </ul>
        </aside>
      </Drawer>
      <nav role='navigation' className='navbar' aria-label='main navigation'>
        <div className='navbar-wrapper'>
          <div className={clsxm('brand-wrapper', isfullwidth ? '' : '!w-full')}>
            <BulmaLogoSVG width='130' height='65' aria-hidden title='bulma.io-logo' />
          </div>

          {!(isfullwidth || isNavOpen) && (
            <IconButton size='sm' color='yellow' variant='text' onClick={toggleIsNavOpen} className='my-3 ml-auto mr-2'>
              <Bars4Icon className='h-8 w-8' />
            </IconButton>
          )}

          {isfullwidth && (
            <div className='navbar-routes' ref={navRef}>
              {isLoggedIn &&
                routes
                  .filter(({ showInNav }) => showInNav)
                  .map(({ path, name, params }, index) => (
                    <NavLink
                      key={name}
                      to={generatePath(path, params)}
                      className={({ isActive }) => 'navbar-item items-center' + (isActive ? ' is-active' : '')}
                    >
                      {React.createElement(icons[index], { className: 'h-[18px] w-[18px] mr-2' })} {name}
                    </NavLink>
                  ))}
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Navbar
