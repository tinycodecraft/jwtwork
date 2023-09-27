import { RadioProps } from "@mui/material";
import React, { PropsWithChildren } from "react";
import internal from "stream";
import { type SingleValue } from 'react-select';

export as namespace fragmentSps;

export interface ColorType {
  id: UniqueIdentifier;
  color: string;
}
export type TokenState ={
  token?:string;
}

export type Credentials = {
  userName?: string;
  password?: string;
  newPassword?:string;
  rememberMe?: boolean;
};

export type AuthUser = {
  token?: string;
  refreshToken?:string;
  userName?: string;
  status: AuthStatusEnum;
  error?: string;
  needNew: boolean;
};

export type AuthState = AuthUser & { isAuthenticated: boolean; };

export type WeatherForecast = Readonly<{
  id: number
  summary: string
  temperatureC: number
  temperatureF: number
  dateFormatted: string
}>

export type WeatherState = Readonly<{
  isLoading: boolean
  startDateIndex: number
  forecasts: WeatherForecast[]
}>

export type ReceiveForecastsPayload = Pick<WeatherState, 'forecasts' | 'startDateIndex'>

export type SelectOption = Readonly<{
 value: number,
 label:string,
}>
export type SelectedOption = SingleValue<SelectOption>
export type FormState = Readonly<{
  count: number;
  checked: boolean;
  selectedOption: SelectedOption;
}>;

export type RefreshTokenState =Readonly<{
  status: string
  newToken?: string
}>;
