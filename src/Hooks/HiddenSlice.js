import { createSlice } from "@reduxjs/toolkit";

export const HiddenSlice = createSlice({
  name: "hidden",
  initialState: true,
    reducers: {
        setHide: (state, action) => {
            return action.payload;
        },
    },
});

export const { setHide } = HiddenSlice.actions;

export default HiddenSlice.reducer;