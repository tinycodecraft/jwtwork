import { DROPDOWN_TEST_DATA } from 'src/config';
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { type SingleValue } from 'react-select';


export type SelectOption = Readonly<{
 value: number,
 label:string,
}>

export type FormState = Readonly<{
  count: number;
  checked: boolean;
  selectedOption: SingleValue<SelectOption>;
}>;

const initialState: FormState = {
  count: 0,
  checked: false,
  selectedOption: DROPDOWN_TEST_DATA[0]
};

export const formSlice = createSlice({
  name: 'form',
  initialState,
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
    selectOption: (state, action: PayloadAction<SingleValue<SelectOption>>) => {
      state.selectedOption = action.payload;
    },
  },
});

export const { increment, decrement, setChecked, selectOption } = formSlice.actions;

export default formSlice.reducer;