import { createSlice } from "@reduxjs/toolkit";

export const CitasSlice = createSlice({
    name: "citas",
    initialState: [],
    reducers: {
        setCitas: (state, action) => {
            return action.payload;
        },
    },
});

export const { setCitas } = CitasSlice.actions;

export default CitasSlice.reducer;