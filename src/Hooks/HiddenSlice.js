import { createSlice } from "@reduxjs/toolkit";

export const HiddenSlice = createSlice({
  name: "hidden",
  initialState: true,
    reducers: {
        setHidden: (state, action) => {
            return action.payload;
        },
    },
});

export const { setHidden } = HiddenSlice.actions;

export default HiddenSlice.reducer;