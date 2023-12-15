import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { ApiStatusEnum, DownloadLinkInit } from 'src/config'
import type { DownloadLinkResult } from 'src/fragments/types'
import type { RootState } from './configureStore'
import { SampleApi } from 'src/api'
import { setNewToken } from './authSlice'

export const downloadSlice = createSlice({
  name: 'download',
  initialState: DownloadLinkInit,
  reducers: {
    requestWordSample: (state, action: PayloadAction<string>) => {
      state.status = ApiStatusEnum.PROCESS
      state.type = action.payload
    },
    receiveWordSample: (state, action: PayloadAction<DownloadLinkResult>) => {
      state.status = action.payload.status
      state.type = action.payload.type
      state.DownloadLink = action.payload.DownloadLink
    },
  },
})

export const getWordSampleAsync = createAsyncThunk('download/getWordSampleAsync', async (type: string, { dispatch, getState }) => {
  const {
    auth: { token: accessToken, refreshToken: renewToken },
  } = (getState as () => RootState)()
  try {
    dispatch(requestWordSample(type))
    if(accessToken)
    {
        SampleApi.token = accessToken

    }
    if(renewToken)
    {
        SampleApi.refreshToken = renewToken
    }
    const wordSample = await SampleApi.getWordDemoAsync(type)
    dispatch(receiveWordSample(wordSample))
    dispatch(setNewToken(SampleApi.token))


  } catch (e) {
    console.log(e)
  }
})


export const { requestWordSample, receiveWordSample } = downloadSlice.actions

export default downloadSlice.reducer