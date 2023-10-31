/* eslint-disable camelcase */
import { RadioProps } from "@mui/material";
import React, { PropsWithChildren } from "react";
import internal from "stream";
import { type SingleValue } from 'react-select';
import { type FileWithPath } from "@mantine/dropzone";
import { ApiStatusEnum } from "src/config";
import type { MRT_ColumnFiltersState, MRT_SortingState } from "mantine-react-table";

export as namespace fragmentSps;

export type UploadedFileState ={
  filePath?: string;
  fileDesc?: string;
}

export type UploadState ={
  connectionId: string;
  status : ApiStatusEnum;
  progress?: number;
  fileResults? : UploadedFileState[];
}

export interface ColorType {
  id: UniqueIdentifier;
  color: string;
}
export type TokenState ={
  token?:string;
}

export type UploadDataInput ={
  connectionId: string;
  files: FileWithPath[];
}

export type FileUploadSummaryState={
  totalFilesUploaded: number;
  totalSizeUploaded: string;
  filePaths: string[];
  fileDescs: string[];
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
  status: ApiStatusEnum;
  error?: string;
  needNew: boolean;
  connectionId?: string;
};
export type MantineQuery ={
 type: string;
 start: number;
 size: number;
 filtering?: MRT_ColumnFiltersState;
 globalFilter?: string;
 sorting?: MRT_SortingState;
}
export type DataVerseState = {
  status: ApiStatusEnum;
  total_count: number;
  start: number;
  data: DataVerseItem[] ;
  error: string;
  
}
export type DataVerseItem = Readonly<{
  name: string;
  description?: string;
  type: string;
  url?: string;
  dataset_name: string;
  file_id:string;
  file_type:string;
  file_content_type:string;
  size_in_bytes:string;
  published_at: Date;

}>;
export type ApiError = Readonly<{
  error?:string;
  status: ApiStatusEnum
}>;

export type AuthUserState = AuthUser & { isAuthenticated: boolean; };

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
