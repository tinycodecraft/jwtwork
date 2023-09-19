import React, { type FunctionComponent } from 'react'
import { ColorPickProvider } from 'src/context/ColorPickContext'
import { idGen } from 'src/utils'
import { ColorBoard } from './ColorBoard'

const DndBoard: FunctionComponent = () => {
  const palletes = ['red', 'green', 'blue'].map((color) => ({ id: idGen(), color }))
  return (
    <div>
      <ColorPickProvider palleteplates={palletes} favor='#ddd' pick='#09C5D0'>
        <ColorBoard />
      </ColorPickProvider>
    </div>

    
  )
}

export default DndBoard
