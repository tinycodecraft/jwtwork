import { ClockPart } from "./ClockPart"
import type { IKnotInstance, IKnotProps ,IClockCore,IStrokeProps, IKnotCore} from "src/fragments/rndclktypes"
import {} from 'src/'
import { getAnglesInDiff } from "src/utils/geometries"
import { valueOr } from "src/utils"

const getKnotsProps = (clockpart: ClockPart, newKnots: IKnotInstance[]): IKnotProps[] => {
    const updatedKnotProps: IKnotProps[] = newKnots.map((knot) => {
      const valForKnot = clockpart.angle2value(knot.angleDeg)
      return {
        radius: knot.radius,
        value: valForKnot,
        bgColor: knot.bgColor,
        bgColorSelected: knot.bgColorSelected,
        bgColorDisabled: knot.bgColorDisabled,
        border: knot.border,
        borderColor: knot.borderColor,
        disabled: knot.disabled,
        ariaLabel: knot.ariaLabel,
      }
    })
    return updatedKnotProps
  }

  const createStrokeFromKnots=(clockcore: IClockCore, knots: IKnotInstance[]): IStrokeProps => {
    let knotAngleStart = clockcore.startAngleDeg
    let knotAngleEnd = clockcore.endAngleDeg
    if(knots.length ===1)
    {
      knotAngleEnd = knots[0].angleDeg
  
    }
    else {
      knotAngleStart = knots[0].angleDeg
      knotAngleEnd =knots[knots.length-1].angleDeg
    }
    const startendAngles = {start: knotAngleStart, end: knotAngleEnd}
    if(knotAngleStart > knotAngleEnd)
    {
      knotAngleEnd+=360
    }
    const pathAnglesInDiff = getAnglesInDiff(clockcore.startAngleDeg,clockcore.endAngleDeg)
    let knotAnglesInDiff = getAnglesInDiff(knotAngleStart,knotAngleEnd)
    if(knotAnglesInDiff > pathAnglesInDiff)
    {
      knotAnglesInDiff = 360 - knotAnglesInDiff
      startendAngles.start = knotAngleEnd
      startendAngles.end = knotAngleStart
    }
  
    const circumference = 2 * Math.PI * clockcore.radius
    const strokeOffset = -(startendAngles.start / 360) * circumference
    const strokeDasharray = (knotAnglesInDiff / 360) * circumference
    const complement = circumference - strokeDasharray
  
    return {
      strokeDasharray: [strokeDasharray, complement].join(' '),
      strokeOffset: strokeOffset,
    }    
    
  }

  const getMaxRadius = (knotCores: IKnotCore[], radiusDefault: number, borderDefault: number): number => {
    if (knotCores.length <= 0) return 0
  
    return knotCores
      .map((e) => valueOr(e.radius, radiusDefault) + valueOr(e.border, borderDefault) / 2)
      .reduce((prev, cur) => Math.max(prev, cur), -Infinity)
  }

  export { createStrokeFromKnots, getKnotsProps , getMaxRadius}