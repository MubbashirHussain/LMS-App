import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FirebaseGetData, FirebaseSetData, FirebaseSignup } from "../../Firebase/firebaseMethords";


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
    AdminData: {
        UsersRegistration: { Status: <StatusType>{ ...Status } },
        InstituteRegistrationForm: { Status: <StatusType>{ ...Status }, },
        Data: <any>{},
        Status: <StatusType>{ ...Status }
    },
    InstituteRegistration: {
        Status: <StatusType>{ ...Status },
        Data: <any>null
    },
}

export const FetchInstituteFromAdmin = createAsyncThunk(
    "Admin/Institute/Get",
    async (path: string) => {
        let response = await FirebaseGetData(`${path}`)
        return response;
    }
)
export const FetchInstituteFromAdminForForm = createAsyncThunk(
    "InstituteRegistrationFrom/Get",
    async (path: string) => {
        let response = await FirebaseGetData(`${path}`)
        return response;
    }
)
export const AddInstitute = createAsyncThunk(
    "Admin/institute/Add",
    async (Obj: { Data: any }) => {
        let { Data } = Obj
        let Signup: any = await FirebaseSignup({ Email: Data.Email, Password: Data.Password })
        await FirebaseSetData("user/", { Email: Data.Email, Password: Data.Password, Usertype: "institute", UserName: Data.InstituteName }, Signup.res.user.uid);
        let response = await FirebaseSetData("institute", Data, Signup.res.user.uid);
        return { InstID: Signup.res.user.uid, response };
    }
)


export const AddUserRegister = createAsyncThunk(
    "UserRegistration/Set",
    async (Obj: any) => {
        let { Data } = Obj
        let Signup: any = await FirebaseSignup({ Email: Data.Email, Password: Data.Password })
        await FirebaseSetData("user/", { Email: Data.Email, Password: Data.Password, Usertype: Data.Usertype, UserName: Data.UserName }, Signup.res.user.uid);
        await FirebaseSetData(Data.Usertype, Data, Signup.res.user.uid);
        let response = await FirebaseGetData(`${Data.Usertype}/${Signup.res.user.uid}`);
        return { Usertype: Data.Usertype, InstID: Signup.res.user.uid, response };
    }
)

export const AdminSlice = createSlice({
    name: "Admin",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build
            .addCase(AddUserRegister.fulfilled, (state, action) => {
                state.AdminData.UsersRegistration.Status.pending = false
                state.AdminData.UsersRegistration.Status.Success[action.payload.InstID] = action.payload.response
                state.AdminData.UsersRegistration.Status.error = null
            })
            .addCase(AddUserRegister.pending, (state) => { state.AdminData.UsersRegistration.Status.pending = true })
            .addCase(AddUserRegister.rejected, (state) => {
                state.AdminData.UsersRegistration.Status.Success = null
                state.AdminData.UsersRegistration.Status.pending = false
                state.AdminData.UsersRegistration.Status.error =  "There is Something Wrong"
            })


            .addCase(AddInstitute.fulfilled, (state, action) => {
                state.AdminData.InstituteRegistrationForm.Status.Success = "Uploaded"
                state.AdminData.InstituteRegistrationForm.Status.pending = false
                state.AdminData.InstituteRegistrationForm.Status.error = null
                state.AdminData.Data[action.payload.InstID] = action.payload.response
            })
            .addCase(AddInstitute.pending, (state) => {
                state.AdminData.InstituteRegistrationForm.Status.pending = true
            })
            .addCase(AddInstitute.rejected, (state) => {
                state.AdminData.InstituteRegistrationForm.Status.Success = null
                state.AdminData.InstituteRegistrationForm.Status.pending = false
                state.AdminData.InstituteRegistrationForm.Status.error = "There Is someting Wrong institute Is Not Registered"
            })

            .addCase(FetchInstituteFromAdmin.fulfilled, (state, action) => {
                state.AdminData.Data = action.payload
            })
            .addCase(FetchInstituteFromAdminForForm.rejected, (state, action) => {
                state.InstituteRegistration.Status.error = { error: action.error }
                state.InstituteRegistration.Status.pending = false
            })
            .addCase(FetchInstituteFromAdminForForm.pending, (state) => {
                state.InstituteRegistration.Status.pending = true
            })
            .addCase(FetchInstituteFromAdminForForm.fulfilled, (state, action: any) => {
                let InstRes = Object.values(action.payload)
                    .map(((x: any) => ({
                        Name: x.InstituteName, id: x.id,
                        Course: x.Course ?
                            Object.values(x.Course)
                                .map(((j: any) => ({ Status: j.Status, Name: j.CourseName, id: j.id }))) : undefined
                    })))
                state.InstituteRegistration.Data = [...InstRes]
                state.InstituteRegistration.Status.pending = false
            })
    }
})

export default AdminSlice.reducer