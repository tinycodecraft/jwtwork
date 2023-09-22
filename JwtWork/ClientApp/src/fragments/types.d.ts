import { RadioProps } from "@mui/material";
import React, { PropsWithChildren } from "react";
import internal from "stream";

export as namespace fragmentSps;

export interface ColorType {
  id: UniqueIdentifier;
  color: string;
}


export type Credentials = {
  userName?: string;
  password?: string;
  newPassword?:string;
  rememberMe?: boolean;
};

export type AuthUser = {
  token?: string;
  userName?: string;
  status: AuthStatusEnum;
  error?: string;
  needNew: boolean;
};

export type AuthState = AuthUser & { isAuthenticated: boolean; };