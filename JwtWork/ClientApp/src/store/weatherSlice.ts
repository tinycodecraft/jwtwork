import { SampleApi } from 'src/api'
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit'
import { setNewToken } from './authSlice'
import type { RootState } from './configureStore'
import { type ReceiveForecastsPayload } from 'src/fragments/types'
import { WeatherStateInit } from 'src/config'


export const weatherSlice = createSlice({
  name: 'weather',
  initialState: WeatherStateInit,
  reducers: {
    
    requestForecasts: (state, action: PayloadAction<number>) => {
      state.isLoading = true
      state.startDateIndex = action.payload
      state.forecasts=[]
    },
    receiveForecasts: (state, action: PayloadAction<ReceiveForecastsPayload>) => {
      const { forecasts, startDateIndex } = action.payload
      if (startDateIndex === state.startDateIndex) {
        // Only accept the incoming data if it matches the most recent request.
        // This ensures we correctly handle out-of-order responses.
        state.isLoading = false
        state.forecasts = forecasts
        state.startDateIndex = startDateIndex
      }
    },
  },
})

export const getForecastsAsync = createAsyncThunk('weather/getForecastsAsync', async (startDateIndex: number, { dispatch, getState }) => {
  // If param startDateIndex === state.startDateIndex, do not perform action

  
  const {
    weather: { startDateIndex: stateIdx},
    auth: { token: accessToken, refreshToken: renewToken },
  } = (getState as () => RootState)()

  // getstate is function such that the value weather would not be null

  if (startDateIndex === stateIdx) {
    return
  }

  // Dispatch request to intialize loading phase
  dispatch(requestForecasts(startDateIndex))

  // Build http request and success handler in Promise<void> wrapper / complete processing
  try {
    if (accessToken) {
      SampleApi.token = accessToken
    }
    if(renewToken)
    {
      SampleApi.refreshToken = renewToken;
    }

    const forecasts = await SampleApi.getForecastsAsync(startDateIndex)
    const payload = { forecasts, startDateIndex }
    dispatch(receiveForecasts(payload))
    // if the instance of SampleApi still exist , it must keep the renewtoken while it retries
    dispatch(setNewToken(SampleApi.token))
  } catch (e) {
    console.error(e)
  }
})

export const { requestForecasts, receiveForecasts } = weatherSlice.actions

export default weatherSlice.reducer
