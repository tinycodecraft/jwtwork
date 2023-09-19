import React, { createContext, useState, type SetStateAction, type FC, type ReactNode } from 'react'
import { type DragEndEvent, type DragOverEvent, type UniqueIdentifier } from '@dnd-kit/core'
import { type ColorType } from '../fragments/types'
import { idGen } from '../utils'
import { arrayMove } from '@dnd-kit/sortable'

export interface ColorPickContextProps {
  pickerColor: string
  setPickerColor: React.Dispatch<SetStateAction<string>>
  favoriteColor: string
  setFavoriteColor: React.Dispatch<SetStateAction<string>>
  pickerId: UniqueIdentifier
  setPickerId: React.Dispatch<SetStateAction<UniqueIdentifier>>
  favoriteId: UniqueIdentifier
  setFavoriteId: React.Dispatch<SetStateAction<UniqueIdentifier>>
  palletteItems: ColorType[]
  setPalletteItems: React.Dispatch<SetStateAction<ColorType[]>>
  activeItem: ColorType | null
  setActiveItem: React.Dispatch<SetStateAction<ColorType | null>>
  activeItemOrigin: string | null
  setActiveItemOrigin: React.Dispatch<SetStateAction<string | null>>
  endDrag: (event: DragEndEvent) => void
  findItem: (id: UniqueIdentifier) => ColorType | null
  overDrag: (event: DragOverEvent) => void
}

const ColorPickContext = createContext<Partial<ColorPickContextProps>>({})

export const ColorPickProvider: FC<{
  children: ReactNode
  favor: string
  pick: string
  palleteplates: ColorType[]
}> = ({ children, favor, pick, palleteplates }) => {
  const [pickerColor, setPickerColor] = useState(pick)
  const [favoriteColor, setFavoriteColor] = useState(favor)

  const [pickerId, setPickerId] = useState<UniqueIdentifier>(idGen)
  const [favoriteId, setFavoriteId] = useState<UniqueIdentifier>(idGen)

  const [palletteItems, setPalletteItems] = useState<ColorType[]>(palleteplates)

  const [activeItem, setActiveItem] = useState<ColorType | null>(null)

  // origin only tell that the dragged item is from chosen(current)/favorite
  const [activeItemOrigin, setActiveItemOrigin] = useState<string | null>(null)

  const findItem = (id: UniqueIdentifier) => {
    if (id === favoriteId) return { id: favoriteId, color: favoriteColor }
    if (id === pickerId) return { id: pickerId, color: pickerColor }
    const foundItem = palletteItems.find((x) => x.id === id)
    if (foundItem) return foundItem;
    return null;
  }

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (!over) {
      setActiveItem(null)
      setActiveItemOrigin(null)
      return
    }

    if (over.id === 'trash') {
      if (palletteItems.find((item) => item.id === active.id)) {
        setPalletteItems(palletteItems.filter((item) => item.id !== active.id))
      }
    } else if (over.id === 'current') {
      const activeColor = findItem(active.id)?.color
      activeColor && setPickerColor(activeColor)
    } else if (over.id === 'favorite') {
      const activeColor = findItem(active.id)?.color
      activeColor && setFavoriteColor(activeColor)
    }
    setActiveItem(null)
    setActiveItemOrigin(null)
  }

  const onDragOver = ({ active, over }: DragOverEvent) => {
    if (!over) {
      if (activeItemOrigin === null) return
      const indx = palletteItems.findIndex((x) => x.id === active.id)
      if (indx === -1) return
      setPalletteItems(palletteItems.filter((x) => x.id !== active.id))
      if (activeItemOrigin === 'current') setPickerId(active.id)
      if (activeItemOrigin === 'favorite') setFavoriteId(active.id)
      return
    }

    if ((over.id === 'favorite' || over.id === 'current') && activeItemOrigin !== null) {
      // we're not dragging over the pallette, so we may need to remove the item from the pallette
      const activePos = palletteItems.findIndex((x) => x.id === active.id)
      if (activePos === -1) return
      setPalletteItems(palletteItems.filter((x) => x.id !== active.id))
      // try to fix re-enter pallete dragover
      if (activeItemOrigin === 'current') setPickerId(active.id)
      if (activeItemOrigin === 'favorite') setFavoriteId(active.id)
      return
    }

    const activePos = palletteItems.findIndex((x) => x.id === active.id)
    const overPos = palletteItems.findIndex((x) => x.id === over.id)

    if (activePos !== -1 && overPos !== -1) {
      if (activePos === overPos) return
      setPalletteItems(arrayMove(palletteItems, activePos, overPos))
    } else if (over.id === 'pallette') {
      if (palletteItems.findIndex((x) => x.id === active.id) === -1) {
        if (active.id === favoriteId) {
          setPalletteItems([...palletteItems, { id: favoriteId, color: favoriteColor }])
          setFavoriteId(idGen)
        } else if (active.id === pickerId) {
          setPalletteItems([...palletteItems, { id: pickerId, color: pickerColor }])
          setPickerId(idGen)
        }
      }
    }
  }

  return (
    <ColorPickContext.Provider
      value={{
        pickerColor,
        setPickerColor,
        favoriteColor,
        setFavoriteColor,
        pickerId,
        setPickerId,
        favoriteId,
        setFavoriteId,
        palletteItems,
        setPalletteItems,
        activeItem,
        setActiveItem,
        activeItemOrigin,
        setActiveItemOrigin,
        overDrag: onDragOver,
        endDrag: onDragEnd,
        findItem: findItem,
      }}
    >
      {children}
    </ColorPickContext.Provider>
  )
}

export default ColorPickContext
