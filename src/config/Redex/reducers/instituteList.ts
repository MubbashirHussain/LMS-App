import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FirebaseGetData, FirebaseSetData, FirebaseSignup, FirebaseUpdateData } from "../../Firebase/firebaseMethords";

let initialState = {
    Institutes: <any>[],
    status: "idle"
}
type AddInstituteType = { path?: string, Data: any, key?: number | string }
type AddCourseType = { id: string, Data: any }



export const FetchInstitute = createAsyncThunk(
    "Institute/Get",
    async (path: string) => {
        let response = await FirebaseGetData(`${path}`)
        return response;
    }
)
export const AddInstitute = createAsyncThunk(
    "Institute/Add",
    async (Obj: AddInstituteType) => {
        let { Data } = Obj
        let Signup: any = await FirebaseSignup({ Email: Data.Email, Password: Data.Password })
        await FirebaseSetData("user/", { Email: Data.Email, Password: Data.Password, Usertype: "institute", UserName: Data.InstituteName }, Signup.res.user.uid);
        let response = await FirebaseSetData("institute", Data, Signup.res.user.uid);
        return response;
    }
)
export const AddInstituteCourse = createAsyncThunk(
    "InstituteCourse/Add",
    async (Obj: AddCourseType) => {
        let { id, Data } = Obj
        let response: any = await FirebaseSetData(`institute/${id}/Course`, Data)
        return { id, response };
    }
)
export const AddInstituteStudents = createAsyncThunk(
    "InstituteStudents/Add",
    async (Obj: AddCourseType) => {
        let { id, Data } = Obj
        let Signup: any = await FirebaseSignup({ Email: Data.Email, Password: Data.Password })
        await FirebaseSetData("user/", { Email: Data.Email, Password: Data.Password, Usertype: "student", UserName: Data.StudentName }, Signup.res.user.uid);
        let response: any = await FirebaseSetData(`institute/${id}/Students`, Data, Signup.res.user.uid)
        return { id, response };
    }
)
export const AddQuizlist = createAsyncThunk(
    "Quiz/Add",
    async (Obj: AddCourseType) => {
        let { id , Data } = Obj
        let response = await FirebaseSetData(`institute/${id}/Quizlist`, Data );
        return  {id , response} ;
    }
)
export const UpdateQuizList = createAsyncThunk(
    "Quiz/update",
    async (Obj: any) => {
        let { InsID  , QuizID, Data } = Obj
        let response = await FirebaseUpdateData(`institute/${InsID}/Quizlist`,QuizID ,Data);
        return  {InsID , QuizID , response } ;
    }
)
export const instituteSlice = createSlice({
    name: "institute",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build
            .addCase(FetchInstitute.fulfilled, (state, action: any) => {
                state.Institutes = action.payload
            })
            .addCase(AddInstitute.fulfilled, (state, action) => {
                state.Institutes.push(action.payload)
            })
            .addCase(AddInstituteCourse.fulfilled, (state, action) => {
                state.Institutes[action.payload.id].Course[action.payload.response.id] = action.payload.response
            })
            .addCase(AddInstituteStudents.fulfilled, (state, action) => {
                state.Institutes[action.payload.id].Students[action.payload.response.id] = action.payload.response
            })
            .addCase(AddQuizlist.fulfilled, (state, action:any) => {
                state.Institutes[action.payload.id].Quizlist[action.payload.QuizID] = action.payload.response
            })
            .addCase(UpdateQuizList.fulfilled, (state, action:any) => {
                state.Institutes[action.payload.id].Quizlist[action.payload.response.id] = action.payload.response
            })
    }
})

export default instituteSlice.reducer