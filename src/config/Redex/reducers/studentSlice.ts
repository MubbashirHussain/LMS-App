import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FirebaseGetData, FirebaseSetData, } from "../../Firebase/firebaseMethords";
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
    Institutes: {
        QuizRecod: { Status: <StatusType>{ ...Status } },
        Status: <StatusType>{ ...Status },
        Data: <any>null
    },
}


export const RecodStudentQuiz = createAsyncThunk(
    "QuizRecod/Add",
    async (Obj:{ InstID:string, CourseID:string, QuizID:string, Data:any }) => {
        let { InstID, CourseID, QuizID, Data } = Obj
        let response: any = await FirebaseSetData(`institute/${InstID}/Course/${CourseID}/QuizList/${QuizID}`, Data)
        return {response};
    }
)

export const FetchInstituteFromStudent = createAsyncThunk(
    "InstituteForStudent/Get",
    async (path: string) => {
        let response = await FirebaseGetData(`${path}`)
        return response;
    }
)

export const StudentSlice = createSlice({
    name: "institute",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build
            .addCase(FetchInstituteFromStudent.fulfilled, (state, action: any) => {
                state.Institutes.Data = action.payload
            })
    }
})

export default StudentSlice.reducer