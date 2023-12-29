/* eslint-disable camelcase */
import type { AnchorHTMLAttributes } from 'react'
import type { SelectOption, WeatherState, FormState, AuthUserState, UploadState, DataVerseState, DownloadLinkResult } from 'src/fragments/types'

export const ApiStatusEnum = {
  FAILURE: 'failure',
  NONE: 'none',
  PROCESS: 'process',
  SUCCESS: 'success',
} as const

export type ApiStatusEnum = typeof ApiStatusEnum[keyof typeof ApiStatusEnum]

/**
 * Select control test data
 */
export const DROPDOWN_TEST_DATA: SelectOption[] = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
  { value: 4, label: 'Option 4' },
  { value: 5, label: 'Option 5' },
  { value: 6, label: 'Option 6' },
  { value: 7, label: 'Option 7' },
  { value: 8, label: 'Option 8' },
  { value: 9, label: 'Option 9' },
]

/**
 * HealthChecks/Swagger response path config
 */

export const BASEURL = process.env.NODE_ENV === 'production' ? window.location.origin : 'http://localhost:52580'

export const NUGET_URL_CONFIG = {
  HealthUi: `${BASEURL}/healthchecks-ui`,
  HealthJson: `${BASEURL}/healthchecks-json`,
  SwaggerDocs: `${BASEURL}/swagger`,
  RefreshTokenUrl: `${BASEURL}/api/auth/RefreshToken`,
}

/**
 * HTML attributes to spread on anchor elements in Settings.tsx component
 */
export const LINK_ATTRIBUTES: AnchorHTMLAttributes<HTMLAnchorElement> = {
  role: 'button',
  target: '_blank',
  rel: 'noopener noreferrer',
}

export const WeatherStateInit: WeatherState = {
  forecasts: [],
  isLoading: true,
  startDateIndex: -1,
}

export const FormStateInit: FormState = {
  count: 0,
  checked: false,
  selectedOption: DROPDOWN_TEST_DATA[0],
}

export const AuthUserStateInit: AuthUserState = {
  token: '',
  userName: '',
  isAuthenticated: false,
  status: ApiStatusEnum.NONE,
  needNew: false,
  error: '',
}

export const UploadStateInit: UploadState = {
  connectionId: '',
  status: ApiStatusEnum.NONE,
  progress: 0,
}

export const DataVerseStateInit: DataVerseState = {
  data: [],
  status: ApiStatusEnum.NONE,
  start: -1,
  total_count: 0,
  error: '',
}
export const DownloadLinkInit: DownloadLinkResult = {
  status: ApiStatusEnum.NONE,
  downloadLink: '',
  type: '',
}
