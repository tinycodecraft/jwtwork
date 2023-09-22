import { FormStateInit } from 'src/config';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type SelectedOption  } from 'src/fragments/types';

export const formSlice = createSlice({
  name: 'form',
  initialState: FormStateInit,
  reducers: {
    increment: (state) => {
      state.count += 1;
    },
    decrement: (state) => {
      state.count -= 1;
    },
    setChecked: (state, action: PayloadAction<boolean>) => {
      state.checked = action.payload;
    },
    selectOption: (state, action: PayloadAction<SelectedOption>) => {
      state.selectedOption = action.payload;
    },
  },
});

export const { increment, decrement, setChecked, selectOption } = formSlice.actions;

export default formSlice.reducer;