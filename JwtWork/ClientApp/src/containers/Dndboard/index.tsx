import React, { useState, type FunctionComponent, useEffect, useCallback } from 'react'
import { ColorPickProvider } from 'src/context/ColorPickContext'
import { idGen } from 'src/utils'
import { ColorBoard } from './ColorBoard'
import { ClockSlider } from 'src/fragments'
import type { IKnotProps } from 'src/fragments/rndclktypes'
import { SimpleGrid } from '@mantine/core'
import { Button } from '@material-tailwind/react'
import { useAppDispatch, useAppSelector } from 'src/store'
import { type DownloadLinkResult } from 'src/fragments/types'
import { ApiStatusEnum, DownloadLinkInit } from 'src/config'
import { Link } from 'react-router-dom'
import { getWordSampleAsync } from 'src/store/downloadSlice'

const DndBoard: FunctionComponent = () => {
  const palletes = ['red', 'green', 'blue'].map((color) => ({ id: idGen(), color }))
  const [knots, setKnots] = useState<IKnotProps[]>([{ value: 0 }])
  const {
    status: downloadStatus,
    downloadLink,
    type: downloadType,
  } = useAppSelector<DownloadLinkResult>((state) => state.download ?? DownloadLinkInit)
  useEffect(() => {
    console.log(`parent level , the knots changed...`)
  }, [knots])
  const dispatch = useAppDispatch()
  const ongenerate = useCallback(async () => {
    dispatch(getWordSampleAsync('word'))
  }, [downloadType])

  return (
    <ColorPickProvider palleteplates={palletes} favor='#ddd' pick='#09C5D0'>
      <SimpleGrid cols={2}>
        <ColorBoard />
        <SimpleGrid cols={1} className='content-center'>
          {downloadStatus == ApiStatusEnum.SUCCESS ? (
            <Button fullWidth>
              <a href={downloadLink} target='_blank' rel='noreferrer'>
                Download your sample word
              </a>{' '}
            </Button>
          ) : (
            <Button fullWidth onClick={ongenerate}>
              Generate Your Word
            </Button>
          )}
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
