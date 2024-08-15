import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./userSlice";

const userStore = configureStore({
    reducer: {
        user: userSlice
    }
});

export default userStore;