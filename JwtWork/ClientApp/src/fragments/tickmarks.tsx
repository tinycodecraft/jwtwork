import React, { Fragment } from 'react'
import { type ITicksProps } from 'src/fragments/rndclktypes'
import { ClockPart, MarkPart } from 'src/model'

interface ITickMarkProps extends ITicksProps {
  clockPart: ClockPart
}

export const TickMarks = (props: ITickMarkProps) => {
  const { clockPart, ...restProps } = props
  const marksProps = restProps as ITicksProps
  const markPart = new MarkPart(clockPart, marksProps)

  return (
    <>
      {markPart && markPart.enableTicks && (
        <g>
          {markPart.marks.map((mark, i) => {
            const { x, y, x1, y1, textX, textY, showText } = mark
            const marksSetting = markPart.marksSettings
            return (
              <Fragment key={i}>
                <line
                  x1={x}
                  y1={y}
                  x2={x1}
                  y2={y1}
                  strokeWidth={marksSetting.ticksWidth}
                  stroke={marksSetting.ticksColor}
                  data-type='tick'
                  className='mz-round-slider-tick'
                />

                {showText && (
                  <text
                    data-type='tick-text'
                    className='mz-round-slider-tick-text'
                    x={textX}
                    y={textY}
                    textAnchor='middle'
                    dominantBaseline='middle'
                    fill={marksSetting.tickValuesColor}
                    fontSize={marksSetting.tickValuesFontSize}
                    fontFamily={marksSetting.tickValuesFontFamily}
                    style={{
                      userSelect: 'none',
                      whiteSpace: 'pre',
                    }}
                  >
                    {marksSetting.tickValuesPrefix}
                    {mark.markValue}
                    {marksSetting.tickValuesSuffix}
                  </text>
                )}
              </Fragment>
            )
          })}
        </g>
      )}
    </>
  )
}
