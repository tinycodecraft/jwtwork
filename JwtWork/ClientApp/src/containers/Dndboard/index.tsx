import React, { useState, type FunctionComponent, useEffect } from 'react'
import { ColorPickProvider } from 'src/context/ColorPickContext'
import { idGen } from 'src/utils'
import { ColorBoard } from './ColorBoard'
import { ClockSlider } from 'src/fragments'
import type { IKnotProps } from 'src/fragments/rndclktypes'
import { SimpleGrid } from '@mantine/core'
import { Button } from '@material-tailwind/react'

const DndBoard: FunctionComponent = () => {
  const palletes = ['red', 'green', 'blue'].map((color) => ({ id: idGen(), color }))
  const [knots, setKnots] = useState<IKnotProps[]>([{ value: 0 }])
  useEffect(() => {
    console.log(`parent level , the knots changed...`)
  }, [knots])

  return (
    <ColorPickProvider palleteplates={palletes} favor='#ddd' pick='#09C5D0'>
      <SimpleGrid cols={2}>
        <ColorBoard />
        <SimpleGrid cols={1} className='content-center'>
          <Button fullWidth>Download Word</Button>
          <SimpleGrid cols={1} className='m-auto'>
            <ClockSlider
              knots={knots}
              onChange={setKnots}
              min={0}
              max={12}
              step={0.2}
              ropeBgColor={'#fff'}
              pathBgColor={'#000'}
              pathBorder={3}
              pathBorderColor={'#000'}
              knotBgColorHover={'#e23d31d2'}
              knotBorder={10}
              knotBorderColor={'#4e105c'}
              knotBgColor={'#e2df31d2'}
              knotBgColorSelected={'#b8b527d2'}
              enableTicks={true}
              clockAngleShift={270}
              ticksWidth={3}
              ticksHeight={10}
              longerTicksHeight={25}
              ticksCount={60}
              ticksGroupSize={5}
              longerTickValuesOnly={true}
              ticksDistanceToPanel={3}
              ticksColor={'#efefef'}
              round={2}
            />
          </SimpleGrid>
        </SimpleGrid>
      </SimpleGrid>
    </ColorPickProvider>
  )
}

export default DndBoard
