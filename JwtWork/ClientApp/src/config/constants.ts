import type { AnchorHTMLAttributes } from 'react';
import type { SelectOption,WeatherState,FormState } from 'src/fragments/types';

/**
 * Select control test data
 */
export const DROPDOWN_TEST_DATA: SelectOption[] = [
  { value: 1, label: 'Option 1' },
  { value: 2, label: 'Option 2' },
  { value: 3, label: 'Option 3' },
  { value: 4, label: 'Option 4' },
  { value: 5, label: 'Option 5' }
];

/**
 * HealthChecks/Swagger response path config
 */

export const BASEURL= process.env.NODE_ENV === 'production' ? 'http://localhost:8086': 'http://localhost:52580';

export const NUGET_URL_CONFIG = {
  HealthUi: `${BASEURL}/healthchecks-ui`,
  HealthJson: `${BASEURL}/healthchecks-json`,
  SwaggerDocs: `${BASEURL}/swagger`,
  RefreshTokenUrl: `${BASEURL}/api/auth/RefreshToken`,

};

/**
 * HTML attributes to spread on anchor elements in Settings.tsx component
 */
export const LINK_ATTRIBUTES: AnchorHTMLAttributes<HTMLAnchorElement> = {
  role: 'button',
  target: '_blank',
  rel: 'noopener noreferrer'
};

export const WeatherStateInit: WeatherState = {
  forecasts: [],
  isLoading: true,
  startDateIndex: -1,
}

export const FormStateInit: FormState = {
  count: 0,
  checked: false,
  selectedOption: DROPDOWN_TEST_DATA[0]
};