import { createSlice, PayloadAction } from "@reduxjs/toolkit";


type InitialState = {
  value: string;
}

const initialState:InitialState =  {
  value: ''
} 

export const wallsCard = createSlice({
  name: 'start',
  initialState,
  reducers: {
    changeStart: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    }
  }
})

export const { changeStart } = wallsCard.actions

export default wallsCard.reducer