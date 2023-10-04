/* eslint-disable @typescript-eslint/no-redeclare */
import { UploadApi } from 'src/api'
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import {  type UploadState, type UploadDataInput } from 'src/fragments/types'


export const UploadStatusEnum ={
  FAIL: 'fail',
  SUCCESS: 'success',
  PROCESSING: 'processing',
  IDLE: 'idle'
} as const;

export type UploadStatusEnum = typeof UploadStatusEnum[keyof typeof UploadStatusEnum];

const initialState: UploadState = {
  connectionId: '',
  status: UploadStatusEnum.IDLE,
  progress: 0,
}

const replaceState = (state: UploadState, { connectionId, status, progress }: UploadState) => {
  state.connectionId = connectionId
  state.status = status
  if (progress) {
    state.progress = progress
  }
}

export const uploadSlice = createSlice({
  name: 'file',
  initialState,
  reducers: {
    setUploadStatus: (state, action: PayloadAction<UploadStatusEnum>) => {
      state.status = action.payload
    },
    setUploadState: (state, action: PayloadAction<UploadState>) => {
      replaceState(state, action.payload)
    },
    setProgress: (state, action: PayloadAction<number>) => {
      state.progress = action.payload
    },

    resetUploadState: (state) => {
      replaceState(state, initialState)
    },
  },
})

export const uploadFileAsync = createAsyncThunk('file/uploadFileAsync', async (data: UploadDataInput, { dispatch }) => {
  try {
    const result = await UploadApi.uploadAsync(data, (progress) => {
      console.log(progress)
      dispatch(setProgress(progress))
    })
    console.log(result)
    dispatch(setUploadState({ status: UploadStatusEnum.SUCCESS, connectionId: data.connectionId }))
  } catch (e) {
    console.log(e)
    dispatch(setUploadStatus(UploadStatusEnum.FAIL))
  }
})

export const { setUploadState, setUploadStatus, resetUploadState, setProgress } = uploadSlice.actions
export default uploadSlice.reducer
