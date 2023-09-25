import React, { useCallback, useEffect } from 'react'
import { Navbar, MobileNav, Typography,  MenuItem,   IconButton } from '@material-tailwind/react'
import {
  CubeTransparentIcon,
  UserCircleIcon,
  CodeBracketSquareIcon,
  Bars2Icon,
} from '@heroicons/react/24/outline'
import { useIsLoggedIn } from 'src/utils'





// nav list component
const navListItems = [
  {
    label: 'Account',
    icon: UserCircleIcon,
  },
  {
    label: 'Blocks',
    icon: CubeTransparentIcon,
  },
  {
    label: 'Docs',
    icon: CodeBracketSquareIcon,
  },
]

function NavList() {
  return (
    <ul className='mb-4 mt-2 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center'>
      
      {navListItems.map(({ label, icon }, key) => (
        <Typography key={`${label}-${key}`} as='a' href='#' variant='small' color='blue-gray' className='font-normal'>
          <MenuItem className='flex items-center gap-2 lg:rounded-full'>
            {React.createElement(icon, { className: 'h-[18px] w-[18px]' })} {label}
          </MenuItem>
        </Typography>
      ))}
    </ul>
  )
}

const MrNavBar = () => {
  const [isNavOpen, setIsNavOpen] = React.useState(false)
  const isLoggin = useIsLoggedIn();

  const toggleIsNavOpen = () => setIsNavOpen((cur) => !cur)
  const resizehandler = useCallback(() => {
    window.innerWidth >= 960 && setIsNavOpen(false)
  }, [setIsNavOpen])

  useEffect(() => {
    window.addEventListener('resize', resizehandler)

    return () => window.removeEventListener('resize', resizehandler)
  }, [])

  return (
    <Navbar className='mx-auto max-w-screen-xl p-2 lg:rounded-full lg:pl-6'>
      <div className='relative mx-auto flex items-center text-blue-gray-900'>
        <Typography as='a' href='#' className='mr-4 ml-2 cursor-pointer py-1.5 font-medium'>
          Material Tailwind
        </Typography>
        <div className='absolute top-2/4 left-2/4 hidden -translate-x-2/4 -translate-y-2/4 lg:block'>
          {isLoggin && <NavList />} 
        </div>
        <IconButton size='sm' color='blue-gray' variant='text' onClick={toggleIsNavOpen} className='ml-auto mr-2 lg:hidden'>
          <Bars2Icon className='h-6 w-6' />
        </IconButton>
        
      </div>
      <MobileNav open={isNavOpen} className='overflow-scroll'>
        {isLoggin && <NavList />} 
      </MobileNav>
    </Navbar>
  )
}

export {MrNavBar}
