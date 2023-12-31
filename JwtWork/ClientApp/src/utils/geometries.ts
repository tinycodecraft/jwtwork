import {
  type IAnimationResult,
  type Vector2,
  type Vector3,
  circleMovement,
  convertRange,
  degreesToRadians,
  mod,
  radiansToDegrees,
  setDecimalPlaces,
  v2Distance,
  v2Sub,
} from 'mz-math'

import { RNDCLK_DF_ROPE_BG_COLOR, RNDCLK_DF_ROPE_BG_COLOR_DISABLED } from 'src/config'
import { valueOr } from 'src/utils'
import type { IKnotInstance, IStrokeProps } from 'src/fragments/rndclktypes'

const getClosestEdge = (startAngle: number, endAngle: number, currentDegree: number, clockCoordinates: Vector3): number => {
  const angleRad = convertRange(degreesToRadians(currentDegree), 0, Math.PI * 2, 0, Math.PI) // [0, Math.PI*2] ---> [0, Math.PI]
  const currentPointOnArc = circleMovement([clockCoordinates[0], clockCoordinates[1]], angleRad, clockCoordinates[2])

  const startAngleRad = convertRange(degreesToRadians(startAngle), 0, Math.PI * 2, 0, Math.PI) // [0, Math.PI*2] ---> [0, Math.PI]
  const startPointOnArc = circleMovement([clockCoordinates[0], clockCoordinates[1]], startAngleRad, clockCoordinates[2])

  const endAngleRad = convertRange(degreesToRadians(endAngle), 0, Math.PI * 2, 0, Math.PI) // [0, Math.PI*2] ---> [0, Math.PI]
  const endPointOnArc = circleMovement([clockCoordinates[0], clockCoordinates[1]], endAngleRad, clockCoordinates[2])

  const distance1 = v2Distance(currentPointOnArc, startPointOnArc)
  const distance2 = v2Distance(currentPointOnArc, endPointOnArc)

  return distance1 <= distance2 ? startAngle : endAngle
}

const getClockCenter = (circleRadius: number, maxPointerRadius: number, circleThickness: number, circleBorder: number): Vector2 => {
  const size = getClockSize(circleRadius, maxPointerRadius, circleThickness, circleBorder)

  const val = setDecimalPlaces(size / 2, 2)

  return [val, val]
}

const checkAngleInArc = (startAngleDeg: number, endAngleDeg: number, currentDegrees: number): boolean => {
  if (startAngleDeg > endAngleDeg) {
    endAngleDeg += 360
  }

  return (
    (currentDegrees >= startAngleDeg && currentDegrees <= endAngleDeg) ||
    (currentDegrees + 360 >= startAngleDeg && currentDegrees + 360 <= endAngleDeg)
  )
}

const getClockSize = (circleRadius: number, maxPointerRadius: number, circleThickness: number, circleBorder: number): number => {
  const thickness = circleThickness + circleBorder * 2
  const diff = Math.max(0, maxPointerRadius * 2 - thickness)
  return circleRadius * 2 + thickness + diff
}
// anchor is the left and top of whole clock
const getMouseInAngle = (anchor: Vector2, mousePos: Vector2, clockCoordinates: Vector3): number => {
  const mouseVector = v2Sub(v2Sub(mousePos, anchor), [clockCoordinates[0], clockCoordinates[1]])
  let angleRad = Math.atan2(mouseVector[1] / clockCoordinates[2], mouseVector[0] / clockCoordinates[2])
  if (angleRad < 0) {
    angleRad += 2 * Math.PI
  }
  return radiansToDegrees(angleRad)
}
const createStroke = (startDeg: number, endDeg: number, radius: number): IStrokeProps => {
  const circumference = 2 * Math.PI * radius
  const angleDiff = endDeg - startDeg
  const strokeOffset = -(startDeg / 360) * circumference
  const strokeDasharray = (angleDiff / 360) * circumference
  const complement = circumference - strokeDasharray
  return {
    strokeDasharray: [strokeDasharray, complement].join(' '),
    strokeOffset,
  }
}

const getAnglesInDiff = (startAngle: number, endAngle: number): number => {
  if (endAngle < startAngle) {
    endAngle += 360
  }

  const diff = endAngle - startAngle
  const diffMod = mod(diff, 360)

  return diffMod === 0 && diff > 0 ? 360 : diffMod
}

const getSteppedAngle = (angleDeg: number, step: number, startAngle: number, endAngle: number): number => {
  if (mod(angleDeg, 360) === mod(startAngle, 360) || mod(angleDeg, 360) === mod(endAngle, 360)) return angleDeg
  return step === 0 ? 0 : Math.round(angleDeg / step) * step
}

const getStrokeColor = (
  mouseOvered: boolean,
  disabled?: boolean,
  ropeBgColorDisabled?: string,
  ropeBgColor?: string,
  ropeBgColorHover?: string,
): string => {
  if (disabled) return valueOr(ropeBgColorDisabled, RNDCLK_DF_ROPE_BG_COLOR_DISABLED)
  const bgColor = valueOr(ropeBgColor, RNDCLK_DF_ROPE_BG_COLOR)
  if (mouseOvered) {
    return valueOr(ropeBgColorHover, bgColor)
  }
  return bgColor
}

const getDotFillColor = (knot: IKnotInstance, knotId: string,mouseOvered: boolean) : string => {
  if(knot.disabled) return knot.bgColorDisabled;
  if(mouseOvered) return knot.bgColorHover;
  if(knot.id === knotId) return knot.bgColorSelected;
  return knot.bgColor;

}

const getAnimationProgressAngle = (
  progress: IAnimationResult,
  animationSourceDegrees: number,
  animationTargetDegrees: number,
  startPathAngleDeg: number,
) => {
  let percent = progress.getPercent()
  if (!percent) return

  if (percent < 0) {
    percent = 0
  }

  if (percent > 100) {
    percent = 100
  }

  let angle1 = animationSourceDegrees % 360
  let angle2 = animationTargetDegrees % 360

  if (angle1 < startPathAngleDeg) {
    angle1 += 360
  }

  if (angle2 < startPathAngleDeg) {
    angle2 += 360
  }

  const isClockwise = angle2 > angle1

  if (isClockwise) {
    const clockwiseDistance = (angle2 - angle1 + 360) % 360
    return mod(animationSourceDegrees + (percent * clockwiseDistance) / 100, 360)
  } else {
    const counterclockwiseDistance = (angle1 - angle2 + 360) % 360
    return mod(animationSourceDegrees - (percent * counterclockwiseDistance) / 100, 360)
  }
}

export {getDotFillColor, getAnimationProgressAngle, getStrokeColor, createStroke, checkAngleInArc, getClosestEdge, getClockCenter, getMouseInAngle, getSteppedAngle, getAnglesInDiff }
