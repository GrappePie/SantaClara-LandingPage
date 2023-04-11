import { configureStore } from "@reduxjs/toolkit";
import hiddenReducer from "../Hooks/HiddenSlice";

export const store = configureStore({
    reducer: {
        hidden: hiddenReducer,
    },
});