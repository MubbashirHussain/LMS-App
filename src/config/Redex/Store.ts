import { configureStore } from "@reduxjs/toolkit";
import instituteReducer from "./reducers/instituteList";
import UserReducer from "./reducers/UserSlice";
import AdminReducer from "./reducers/AdminSlice";
import StudentReducer from "./reducers/studentSlice";

let store = configureStore({
    reducer: {
        institute: instituteReducer,
        User:UserReducer,
        Admin:AdminReducer,
        Student:StudentReducer,
    }
})

export default store