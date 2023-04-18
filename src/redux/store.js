import { configureStore } from "@reduxjs/toolkit";
import hiddenReducer from "../Hooks/HiddenSlice";
import fixedSlice from "@/Hooks/NavbarSlice";

export const store = configureStore({
    reducer: {
        hidden: hiddenReducer,
        fixed: fixedSlice,
    },
});