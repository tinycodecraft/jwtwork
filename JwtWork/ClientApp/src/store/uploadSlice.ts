/* eslint-disable @typescript-eslint/no-redeclare */
import { UploadApi } from 'src/api'
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { type UploadState, type UploadDataInput, type UploadedFileState } from 'src/fragments/types'
import { range } from 'src/utils'

export const UploadStatusEnum = {
  FAIL: 'fail',
  SUCCESS: 'success',
  PROCESSING: 'processing',
  IDLE: 'idle',
} as const

export type UploadStatusEnum = typeof UploadStatusEnum[keyof typeof UploadStatusEnum]

const initialState: UploadState = {
  connectionId: '',
  status: UploadStatusEnum.IDLE,
  progress: 0,
}

const replaceState = (state: UploadState, { connectionId, status, progress, filePaths,fileDescs, fileResults }: UploadState) => {
  state.connectionId = connectionId

  state.status = status

  state.filePaths = filePaths
  state.fileDescs=fileDescs
  state.fileResults = fileResults
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
      dispatch(setProgress(progress))
    })
    
    const finalstatus = (result.filePaths?.length ?? 0) > 0 ? UploadStatusEnum.SUCCESS : UploadStatusEnum.FAIL
    console.log(`the result received: `,result, ` and length is ${result.filePaths?.length}`)
    const fileResults : UploadedFileState[] =[]
    if(finalstatus=== UploadStatusEnum.SUCCESS)
    {
      range(result.filePaths.length).forEach((v,i)=>{
        fileResults.push({fileDesc: result.fileDescs[i], filePath: result.filePaths[i]})
      })

    }

    dispatch(setUploadState({ status: finalstatus, connectionId: data.connectionId, filePaths: result.filePaths, fileDescs: result.fileDescs, fileResults: fileResults }))
  } catch (e) {

    console.log(e)
    dispatch(setUploadStatus(UploadStatusEnum.FAIL))
  }
})

export const { setUploadState, setUploadStatus, resetUploadState, setProgress } = uploadSlice.actions
export default uploadSlice.reducer
