import type { AnchorHTMLAttributes } from 'react';
import type { SelectOption } from '../store/formSlice';


/**
 * react-functional-select 'themeConfig' property
 */


export const THEME_CONFIG = {
  color: {
    primary: '#09d3ac'
  },
  control: {
    boxShadowColor: 'rgba(9, 211, 172, 0.25)',
    focusedBorderColor: 'rgba(9, 211, 172, 0.75)'
  },
  menu: {
    option: {
      selectedColor: '#fff',
      selectedBgColor: '#09d3ac',
      focusedBgColor: 'rgba(9, 211, 172, 0.225)'
    }
  }
 };

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
  SwaggerDocs: `${BASEURL}/swagger`
};

/**
 * HTML attributes to spread on anchor elements in Settings.tsx component
 */
export const LINK_ATTRIBUTES: AnchorHTMLAttributes<HTMLAnchorElement> = {
  role: 'button',
  target: '_blank',
  rel: 'noopener noreferrer'
};