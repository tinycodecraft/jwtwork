/* eslint-disable @typescript-eslint/no-redeclare */
import { AuthApi } from 'src/api';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type Credentials, type AuthUserState } from 'src/fragments/types';
import { ApiStatusEnum, AuthUserStateInit } from 'src/config';



const replaceState = (
  state: AuthUserState,
  { status, token, refreshToken, userName, isAuthenticated, error,needNew }: AuthUserState,
  resetOnly = false,

) => {
  console.log(`${error} with status ${status} and neednew status: ${resetOnly}`);
  state.token = token;
  state.status = status;
  state.userName = userName;
  state.isAuthenticated = isAuthenticated;
  state.refreshToken = refreshToken;
  if(!resetOnly)
  {
    state.needNew = needNew;
  }
  
  state.error = error;
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: AuthUserStateInit,
  reducers: {
    setConnectionValue: (state,action: PayloadAction<string>)=> {
      state.connectionId = action.payload;

    },
    setAuthStatus: (state, action: PayloadAction<ApiStatusEnum>) => {
      state.status = action.payload;
    },
    setUserLogin: (state, action: PayloadAction<AuthUserState>) => {
      replaceState(state, action.payload);
    },
    setNewToken: (state, action: PayloadAction<string>)=> {
      state.token = action.payload;

    },
    resetState: (state) => {      
      replaceState(state, AuthUserStateInit,state.needNew);      
    }
  }
});

export const loginAsync = createAsyncThunk(
  'auth/loginAsync',
  async (credentials: Credentials, { dispatch }) => {
    try {
      const authUser = await AuthApi.loginAsync(credentials);
      console.log(authUser);
      const payload = { ...authUser, isAuthenticated: !authUser.error };
      dispatch(setUserLogin(payload));
    } catch (e) {
      dispatch(setAuthStatus(ApiStatusEnum.FAILURE));
    }
  }
);

export const { setAuthStatus, setUserLogin, resetState, setNewToken,setConnectionValue } = authSlice.actions;

export default authSlice.reducer;