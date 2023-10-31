/* eslint-disable camelcase */
import React, { useEffect } from 'react'
import { useParams } from 'react-router'
import { DataVerseStateInit } from 'src/config';
import { type DataVerseState } from 'src/fragments/types';
import { useAppSelector, useAppDispatch } from 'src/store';
import { getDataVerseAsync } from 'src/store/verseSlice';

export const VerseDataForm = () => {

    const dispatch = useAppDispatch()
    const { startIndex: startIndexDefault = '0'} = useParams();
    const nextStartIndex = parseInt(startIndexDefault,10);
    const { status,error, start, total_count , data} = useAppSelector<DataVerseState>((state)=> state.verse ?? DataVerseStateInit)

    useEffect(()=>{
        if(nextStartIndex!==start)
        {
            dispatch(getDataVerseAsync({type:'file',size:20, start }))
        }
    },[])

  return (
    <div>VersDataForm</div>
  )
}
