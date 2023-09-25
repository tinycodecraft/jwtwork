import React, { useCallback, useEffect, useState } from 'react'
import { Typography, Menu, MenuHandler, MenuList, MenuItem, Card } from '@material-tailwind/react'
import { Square3Stack3DIcon, ChevronDownIcon, RocketLaunchIcon } from '@heroicons/react/24/outline'

// nav list menu
const hoverItems = [
  {
    title: '@material-tailwind/html',
    description: 'Learn how to use @material-tailwind/html, packed with rich components and widgets.',
  },
  {
    title: '@material-tailwind/react',
    description: 'Learn how to use @material-tailwind/react, packed with rich components for React.',
  },
  {
    title: 'Material Tailwind PRO',
    description: 'A complete set of UI Elements for building faster websites in less time.',
  },
]

const MrHoverList = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const renderItems = hoverItems.map(({ title, description }) => (
    <a href='#' key={title}>
      <MenuItem>
        <Typography variant='h6' color='blue-gray' className='mb-1'>
          {title}
        </Typography>
        <Typography variant='small' color='gray' className='font-normal'>
          {description}
        </Typography>
      </MenuItem>
    </a>
  ))

  return (
    <React.Fragment>
      <Menu allowHover open={isMenuOpen} handler={setIsMenuOpen}>
        <MenuHandler>
          <Typography as='a' href='#' variant='small' className='font-normal'>
            <MenuItem className='hidden items-center gap-2 text-blue-gray-900 lg:flex lg:rounded-full'>
              <Square3Stack3DIcon className='h-[18px] w-[18px]' /> Pages{' '}
              <ChevronDownIcon strokeWidth={2} className={`h-3 w-3 transition-transform ${isMenuOpen ? 'rotate-180' : ''}`} />
            </MenuItem>
          </Typography>
        </MenuHandler>
        <MenuList className='hidden w-[36rem] grid-cols-7 gap-3 overflow-visible lg:grid'>
          <Card color='blue' shadow={false} variant='gradient' className='col-span-3 grid h-full w-full place-items-center rounded-md'>
            <RocketLaunchIcon strokeWidth={1} className='h-28 w-28' />
          </Card>
          <ul className='col-span-4 flex w-full flex-col gap-1'>{renderItems}</ul>
        </MenuList>
      </Menu>
      <MenuItem className='flex items-center gap-2 text-blue-gray-900 lg:hidden'>
        <Square3Stack3DIcon className='h-[18px] w-[18px]' /> Pages{' '}
      </MenuItem>
      <ul className='ml-6 flex w-full flex-col gap-1 lg:hidden'>{renderItems}</ul>
    </React.Fragment>
  )
}

export { MrHoverList }
