/* eslint-disable camelcase */
// externals
import { type FC, useContext, useState, useEffect } from 'react'
import { ChromePicker, type ColorResult } from 'react-color'

// dnd-kit
import { DndContext, DragOverlay, rectIntersection } from '@dnd-kit/core'

// dnd-kit helpers
import { DraggableItem } from './draggable-item'
import { DropZone } from './drop-zone'

import { Item, ColorSquare, ClockSlider } from 'src/fragments'
import { ColorPallette } from './color-pallete'
import { Trash } from './trash'

import ColorPickContext from 'src/context/ColorPickContext'
import { createPortal } from 'react-dom'
import { SimpleGrid, Stack } from '@mantine/core'

import type { IKnotProps } from 'src/fragments/rndclktypes'

export const ColorBoard: FC = () => {
  const {
    favoriteId,
    pickerId,
    activeItem,
    activeItemOrigin,
    setActiveItem,
    setActiveItemOrigin,
    findItem,
    overDrag,
    endDrag,
    pickerColor,
    favoriteColor,
    palletteItems,
    setPickerColor,
  } = useContext(ColorPickContext)
  const validfuncs = setActiveItem && setActiveItemOrigin && setPickerColor && findItem && true

  const [knots, setKnots] = useState<IKnotProps[]>([{ value: 0 }])
  useEffect(() => {
    console.log(`parent level , the knots changed...`)
  }, [knots])

  return (
    <DndContext
      onDragStart={({ active }) => {
        if (validfuncs && active.id === favoriteId) setActiveItemOrigin('favorite')
        if (validfuncs && active.id === pickerId) setActiveItemOrigin('current')
        if (validfuncs) {
          setActiveItem(findItem(active.id))
        }
      }}
      onDragOver={overDrag}
      onDragCancel={() => {
        validfuncs && setActiveItem(null)
        validfuncs && setActiveItemOrigin(null)
      }}
      onDragEnd={endDrag}
      collisionDetection={rectIntersection}
    >
      <div>
        <ul>
          <li>Use the Color picker to choose a color</li>
          <li>Drag the picker or favorite color to the pallette to add it to the pallette</li>
          <li>Drag a color from the pallette to the picker, favorite, or trash </li>
          <li>The Chosen color, Favorite color, and Trash elements are implemented using the @dnd-kit/core</li>
          <li>The pallette is implemented using the @dnd-kit/sortable presets</li>
        </ul>
      </div>
      <SimpleGrid cols={2}>
        <SimpleGrid cols={3}>
          <div>
            <ChromePicker onChange={(color: ColorResult) => validfuncs && setPickerColor(color.hex)} color={pickerColor} />
          </div>
          <Stack>
            <Item>
              <p>Chosen Color</p>
              <DropZone id='current'>{pickerColor && pickerId ? <DraggableItem color={pickerColor} id={pickerId} /> : null}</DropZone>
            </Item>
            <Item>
              <p>Favorite Color</p>
              <DropZone id='favorite'>{favoriteColor && favoriteId ? <DraggableItem color={favoriteColor} id={favoriteId} /> : null}</DropZone>
            </Item>

            <Item>
              <Trash active={activeItemOrigin === null} />
            </Item>
          </Stack>
          <div>
            <p>Color Pallette</p>
            {palletteItems ? <ColorPallette items={palletteItems} /> : null}
          </div>
        </SimpleGrid>
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

      {/* The Drag Overlay is always rendered but the children are
      conditionally rendered based on the active item. */}

      {createPortal(<DragOverlay>{activeItem ? <ColorSquare color={activeItem.color} isoverlay /> : null}</DragOverlay>, document.body)}
    </DndContext>
  )
}
