import { createSlice } from "@reduxjs/toolkit";

export const NavbarSlice = createSlice(
    {
        name: "nabvar",
        initialState: {
            fixed: false,
            open: false,
        },
        reducers: {
            setFixed: (state, action) => {
                state.fixed = action.payload;
            },
            setOpen: (state, action) => {
                state.open = action.payload;
            }
        }
    }
);

export const { setFixed, setOpen } = NavbarSlice.actions;

export default NavbarSlice.reducer;


