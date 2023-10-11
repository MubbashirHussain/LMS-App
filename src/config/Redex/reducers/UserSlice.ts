import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FirebaseGetData, FirebaseSetData, FirebaseSignup, isUserLogin } from "../../Firebase/firebaseMethords";

let initialState = {
    User: <any>[],
    UserLogin: <any>{},
    status: "idle"
}
// type AddInstituteType = { path: string, Data: any, key?: number | string }



export const FetchUserLogin = createAsyncThunk(
    "UserLogin/Get",
    async () => {
        let User: any = await isUserLogin()
        let response = await FirebaseGetData(`user/${User.uid}`)
        return response;
    }
)


export const AddUserRegister = createAsyncThunk(
    "UserRegistration/Set",
    async (Obj: any) => {
        let { Data } = Obj
        let Signup: any = await FirebaseSignup({ Email: Data.Email, Password: Data.Password })
        await FirebaseSetData("user/", { Email: Data.Email, Password: Data.Password, Usertype: Data.Usertype }, Signup.res.user.uid);
        await FirebaseSetData(Data.Usertype, Data, Signup.res.user.uid);
        let response = await FirebaseGetData(`${Data.Usertype}/${Signup.res.user.uid}`);
        return response;
    }
)

export const instituteSlice = createSlice({
    name: "User",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build
            .addCase(FetchUserLogin.fulfilled, (state, action) => {
                state.UserLogin = action.payload
            })
            .addCase(FetchUserLogin.pending, (state) => {
                state.UserLogin = "pending"
            })
            .addCase(FetchUserLogin.rejected, (state) => {
                state.UserLogin = "NoUserLogin"
            })
            .addCase(AddUserRegister.fulfilled, (state, action) => {
                state.User.push(action.payload)
            })
    }
})

export default instituteSlice.reducer