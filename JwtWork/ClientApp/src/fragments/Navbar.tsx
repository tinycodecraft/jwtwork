import { clsxm, useIsLoggedIn } from 'src/utils'
import { Routes as routes } from 'src/config'
import React, { useState, type FunctionComponent } from 'react'
import { NavLink, generatePath } from 'react-router-dom'
import { ReactComponent as BulmaLogoSVG } from 'src/assets/image/BulmaLogo.svg'
import { Bars4Icon, IdentificationIcon, PencilIcon, PuzzlePieceIcon, SunIcon } from '@heroicons/react/24/outline'
import { useEventListener, useMediaQuery } from 'usehooks-ts'
import { Drawer, IconButton, Typography } from '@material-tailwind/react'

const Navbar: FunctionComponent = () => {
  const isLoggedIn = useIsLoggedIn()
  const isfullwidth = useMediaQuery('(min-width: 868px)')
  const [isNavOpen, setNavOpen] = useState<boolean>(false)
  useEventListener('resize', () => window.innerWidth > 868 && isLoggedIn && setNavOpen(false))
  const toggleIsNavOpen = () => setNavOpen((cur) => !cur)
  const noBarIcon = !(isfullwidth || isNavOpen)

  const icons = [Bars4Icon, IdentificationIcon, PuzzlePieceIcon, PencilIcon, SunIcon]

  return (
    <div>
      <Drawer open={isNavOpen} onClose={() => setNavOpen(false)}>
        <aside className='menu'>
        <div className="mb-2 flex items-center justify-between p-4">
          <Typography variant="h5" color="blue-gray">
            BULMA Menu
          </Typography>
          <IconButton variant="text" color="blue-gray" onClick={()=>setNavOpen(false)} className='mb-[1.5rem]'>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              className="h-5 w-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
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
          <div className='brand-wrapper'>
            <BulmaLogoSVG width='130' height='65' aria-hidden title='bulma.io-logo' />
          </div>

          {noBarIcon && (
            <IconButton size='sm' color='yellow' variant='text' onClick={toggleIsNavOpen} className='my-3 ml-auto mr-2 lg:hidden'>
              <Bars4Icon className='h-8 w-8' />
            </IconButton>
          )}

          {isfullwidth && (
            <div className='navbar-routes'>
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
