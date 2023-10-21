import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { FirebaseGetData, FirebaseSetData, FirebaseSignup, FirebaseUpdateData } from "../../Firebase/firebaseMethords";

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
    Institutes:{
        AddInstituteCourseForm:{Status : <StatusType>{...Status}},
        AddInstituteStudentsForm:{Status : <StatusType>{...Status}},
        Status : <StatusType>{...Status},
        Data:<any>null,
    },
}

type AddCourseType = { id: string, Data: any }


export const FetchInstitute = createAsyncThunk(
    "Institute/Get",
    async (path: string) => {
        let response = await FirebaseGetData(`${path}`)
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
        await FirebaseSetData("user/", { Email: Data.Email, Password: Data.Password, Usertype: "student", UserName: Data.UserName, InstID: id }, Signup.res.user.uid);
        let response: any = await FirebaseSetData(`institute/${id}/Students`, Data, Signup.res.user.uid)
        return { id, response };
    }
)
export const AddQuizlist = createAsyncThunk(
    "Quiz/Add",
    async (Obj: { InstID: string, CourseID: string, Data: any }) => {
        let { InstID, CourseID, Data } = Obj
        let response = await FirebaseSetData(`institute/${InstID}/Course/${CourseID}/Quizlist`, Data);
        return { InstID, CourseID, response };
    }
)
export const UpdateQuizList = createAsyncThunk(
    "Quiz/update",
    async (Obj: { InsID: string, CourseID: string, QuizID: string, Data: any }) => {
        let { InsID, QuizID, Data, CourseID } = Obj
        await FirebaseUpdateData(`institute/${InsID}/Course/${CourseID}/Quizlist`, QuizID, Data);
        return { InsID, QuizID, Data, CourseID };
    }
)
export const UpdateCourseList = createAsyncThunk(
    "course/update",
    async (Obj: any) => {
        let { InsID, CourseID, Data } = Obj
        await FirebaseUpdateData(`institute/${InsID}/Course`, CourseID, Data);
        return { InsID, CourseID, Data };
    }
)
export const instituteSlice = createSlice({
    name: "institute",
    initialState,
    reducers: {},
    extraReducers: (build) => {
        build
            .addCase(FetchInstitute.fulfilled, (state, action: any) => {
                state.Institutes.Data = action.payload
            })


            .addCase(AddInstituteCourse.fulfilled, (state, action) => {
                state.Institutes.AddInstituteCourseForm.Status.Success = "Course Added"
                state.Institutes.AddInstituteCourseForm.Status.pending = false
                state.Institutes.AddInstituteCourseForm.Status.error = null
                state.Institutes.Data.Course[action.payload.response.id] = action.payload.response
            })
            .addCase(AddInstituteCourse.pending, (state) => {
                state.Institutes.AddInstituteCourseForm.Status.pending = true
            })
            .addCase(AddInstituteCourse.rejected, (state) => {
                state.Institutes.AddInstituteCourseForm.Status.Success = null
                state.Institutes.AddInstituteCourseForm.Status.pending = false
                state.Institutes.AddInstituteCourseForm.Status.error =  "There is Something Wrong "
            })


            .addCase(AddInstituteStudents.fulfilled, (state, action) => {
                state.Institutes.AddInstituteStudentsForm.Status.Success = "Student Added Successfuly"
                state.Institutes.AddInstituteStudentsForm.Status.pending = false
                state.Institutes.AddInstituteStudentsForm.Status.error = null
                state.Institutes.Data.Students[action.payload.response.id] = action.payload.response
            })
            .addCase(AddInstituteStudents.pending, (state) => {
                state.Institutes.AddInstituteStudentsForm.Status.pending = true
            })
            .addCase(AddInstituteStudents.rejected, (state) => {
                state.Institutes.AddInstituteStudentsForm.Status.Success = null
                state.Institutes.AddInstituteStudentsForm.Status.pending = false
                state.Institutes.AddInstituteStudentsForm.Status.error =  "There is Something Wrong"
            })




            .addCase(AddQuizlist.fulfilled, (state, action: any) => {
                state.Institutes.Data.Course[action.payload.CourseID].Quizlist[action.payload.response.id] = action.payload.response
            })
            .addCase(UpdateQuizList.fulfilled, (state, action: any) => {
                state.Institutes.Data.Course[action.payload.CourseID].Quizlist[action.payload.QuizID] = action.payload.Data
            })
            .addCase(UpdateCourseList.fulfilled, (state, action: any) => {
                state.Institutes.Data.Course[action.payload.CourseID] = action.payload.Data
            })

    }
})

export default instituteSlice.reducer