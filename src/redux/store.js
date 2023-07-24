import { configureStore } from "@reduxjs/toolkit";
import hiddenReducer from "../Hooks/HiddenSlice";
import citasSlice from "@/Hooks/CitasSlice";
import fixedSlice from "@/Hooks/NavbarSlice";

export const store = configureStore({
    reducer: {
        hidden: hiddenReducer,
        citas: citasSlice,
        fixed: fixedSlice,
    },
});