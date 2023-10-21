import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FirebaseGetData, FirebaseSetData, FirebaseSignup, isUserLogin } from "../../Firebase/firebaseMethords";


type StatusType = {
    Success: null | any,
    pending: boolean,
    error: null | any,
}
let Status: StatusType = {
    Success: null,
    pending: false,
    error: null,
}
let initialState = {
    User: <any>[],
    UserLogin: <any>{},
    StudentRegistration: {
        Status : <StatusType>{...Status},
    },
    status: "idle"
}
export const FetchUserLogin = createAsyncThunk(
    "UserLogin/Get",
    async () => {
        let User: any = await isUserLogin()
        let response = await FirebaseGetData(`user/${User.uid}`)
        return response;
    }
)

export const StudentRegistration = createAsyncThunk(
    "StudentRegistration/Set",
    async (Obj: { InstID: string | number, Data: any }) => {
        let { InstID, Data } = Obj
            let Signup:any = await FirebaseSignup({ Email: Data.Email, Password: Data.Password })
            await FirebaseSetData("user/", {Email: Data.Email, Password: Data.Password, Usertype: "student", UserName: Data.UserName ,InstID }, Signup.res.user.uid);
            await FirebaseSetData(`institute/${InstID}/Students`, Data, Signup.res.user.uid);
            let response = await FirebaseGetData(`institute/${InstID}/Students/${Signup.res.user.uid}`);
            return response
    }
)



export const UserSlice = createSlice({
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
            .addCase(StudentRegistration.fulfilled, (state, action) => {
                state.StudentRegistration.Status.pending = false
                state.StudentRegistration.Status.error= null
                state.StudentRegistration.Status.Success = action.payload
            })
            .addCase(StudentRegistration.pending, (state) => {
                state.StudentRegistration.Status.pending = true
            })
            .addCase(StudentRegistration.rejected, (state) => {
                state.StudentRegistration.Status.Success = null
                state.StudentRegistration.Status.pending = false
                state.StudentRegistration.Status.error = "There is Someting Wrong"
            })

            
    }
})

export default UserSlice.reducer