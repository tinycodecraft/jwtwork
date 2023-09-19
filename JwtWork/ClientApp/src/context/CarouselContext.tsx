import type { HTMLMotionProps, PanInfo } from 'framer-motion'
import React, { createContext, useCallback, useState } from 'react'


interface CarouselContextProps {
  currentIndex: number
  direction: -1 | 1
  maxLength: number
  paginate?: (dir: 1 | -1) => void
  paginateTo?: (index: number) => void
  handleDrag?: (e: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => void
}

const CarouselContext = createContext<CarouselContextProps>({
  currentIndex: 0,
  direction: 1,
  maxLength: 1,
})

export const CarouselProvider = ({
  children,
  len,
}: { children: React.ReactNode } & { len: number }) => {
  const [[currentIndex, direction], logCurrentIndex] = useState<[number, -1 | 1]>([0, -1])

  const [maxLength, _] = useState<number>(len)
  const wrap = (min: number, max: number, v: number) => {
    const rangeSize = max - min
    return ((((v - min) % rangeSize) + rangeSize) % rangeSize) + min
  }

  const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity
  }

  const paginate = useCallback(
    (dir: -1 | 1) => {
      logCurrentIndex([wrap(0, maxLength, currentIndex + dir), dir])
    },
    [currentIndex, maxLength],
  )

  const paginateTo = useCallback((index: number) => {
    logCurrentIndex((prevState) => {
      return [index, index > prevState[0] ? 1 : -1]
    })
  }, [])

  const handleDrag = useCallback<NonNullable<HTMLMotionProps<'div'>['onDragEnd']>>(
    (e, { offset, velocity }) => {
      ;(e.target as HTMLDivElement).style.cursor = 'grab'

      const swipe = swipePower(offset.x, velocity.x)

      if (swipe < -1000) {
        paginate(1)
      } else if (swipe > 1000) {
        paginate(-1)
      }
    },
    [paginate],
  )

  return (
    <CarouselContext.Provider
      value={{
        currentIndex,
        direction,
        maxLength,
        paginate,
        paginateTo,
        handleDrag,
      }}
    >
      {children}
    </CarouselContext.Provider>
  )
}

export default CarouselContext
