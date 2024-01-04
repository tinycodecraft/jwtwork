import '@emotion/react'

import { type MantineTheme, type DefaultMantineColor, type Tuple } from '@mantine/core'

type MoreColors = 'brand' | DefaultMantineColor

declare module '@emotion/react' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface Theme extends MantineTheme {}
}

declare module '@mantine/core' {
  export interface MantineThemeColorOverride {
    colors: Record<MoreColors, Tuple<string, 10>>
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface MantineThemeOther {}
}
