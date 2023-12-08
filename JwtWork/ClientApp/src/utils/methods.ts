import clsx, { type ClassValue } from 'clsx'
import { isNumber } from 'mz-math'
import { twMerge } from 'tailwind-merge'

export const clsxm = (...classes: ClassValue[]) => twMerge(clsx(...classes))

export const range = (len: number, start = 0) => {
  const arr = []
  for (let i = start; i < len + start; i++) {
    arr.push(i)
  }
  return arr
}

export const isArrayWithLength = (val: unknown): boolean => Array.isArray(val) && !!val.length

export const canWait = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

// a little utility for producing unique
export const idGen = (() => {
  let id = 0
  return () => id++
})()

export const noEmptyOr = (value: string | number | undefined, def = 0): number => {
  try {
    if (value && value !== '') return typeof value === 'string' ? parseInt(value) : value
    return def
  } catch {
    return def
  }
}
export const valueOr = <T>(value: T | undefined, def: T): T => {
  if (value === undefined || value === null) return def
  return value
}
export const value3Or = <T>(value: T | undefined, def1: T | undefined, def2: T): T => {
  if (value === undefined || value === null) {
    if (def1 === undefined || value === null) {
      return def2
    } else {
      return def1
    }
  }
  return value
}
export const numberOr = (value: string | number | undefined | null, def = 0): number => {
  return isNumber(value) ? Number(value) : def
}