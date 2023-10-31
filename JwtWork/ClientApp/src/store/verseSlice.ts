/* eslint-disable camelcase */
import { VerseApi } from 'src/api';
import { createAsyncThunk, createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type MantineQuery, type DataVerseState, type ApiError } from 'src/fragments/types';
import { ApiStatusEnum, DataVerseStateInit } from 'src/config';

const replaceState =(
    state: DataVerseState,
    {status, start, data, total_count,error }: DataVerseState

) =>{

    state.start = start;
    state.data = data;
    state.total_count = total_count;
    state.status = status;
    state.error = error;
}

export const verseSlice = createSlice({
    name: 'verse',
    initialState: DataVerseStateInit,
    reducers: {
        setVerseStatus : (state,action: PayloadAction<ApiError>) => {
            state.status = action.payload.status;
            if(action.payload.error)
            {
                state.error = action.payload.error;
            }
            
        },
        setVerseState:(state,action:PayloadAction<DataVerseState>) =>{
            replaceState(state,action.payload)
        },
        resetState: (state)=> {
            replaceState(state,DataVerseStateInit)
        }
    }
})

export const getDataVerseAsync = createAsyncThunk(
    'verse/getDataVerseAsync',
    async (query: MantineQuery, {dispatch})=>{
        try{
            const data = await VerseApi.getDataVerseAsync(query);
            if(!data || data.status != ApiStatusEnum.SUCCESS || data.error)
            {
                dispatch(setVerseStatus({status: ApiStatusEnum.FAILURE, error:  data?.error}))                
            }
            else{
                dispatch(setVerseState(data))
            }


        }
        catch(e){
            console.log(e);
            if(String(e))
            {
                dispatch(setVerseStatus({ status: ApiStatusEnum.FAILURE, error: String(e) } as ApiError))
            }
            else{
                dispatch(setVerseStatus({status: ApiStatusEnum.FAILURE}))
            }
            
        }
    }
)

export const {resetState, setVerseState, setVerseStatus } = verseSlice.actions;

export default verseSlice.reducer;