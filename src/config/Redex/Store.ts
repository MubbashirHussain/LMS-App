import { configureStore } from "@reduxjs/toolkit";
import instituteReducer from "./reducers/instituteList";
import UserReducer from "./reducers/UserSlice";

let store = configureStore({
    reducer: {
        institute: instituteReducer,
        User:UserReducer,
    }
})

export default store