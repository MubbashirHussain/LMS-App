import React from 'react'
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { Button } from "@mui/material";
import { CS_Input, CS_PageLoader, CS_Select } from '../../../Components'
import { useDispatch, useSelector } from 'react-redux';
import { AddInstituteCourse } from '../../../config/Redex/reducers/instituteList';
import { enqueueSnackbar } from 'notistack';


type FormType = {
    Fees?: string
    Teacher?: string
    CourseName?: string
    Duration?: string
    Status?: string
    Disciption?: string
}
type AppDispatch = ThunkDispatch<{ a: string }, any, AnyAction>
const CourseFrom = () => {
    
    let CourseFormRes = useSelector((a: any) => a.institute.Institutes.AddInstituteCourseForm.Status)
    const [FormData, setFromData] = React.useState<FormType>({})
    let dispatch: AppDispatch = useDispatch()
    let instituteId = useSelector((a: any) => a.User.UserLogin)
    let getInputValues = (e: any) => { setFromData({ ...FormData, [e.target.name]: e.target.value }) }
    // console.log(instituteId)
    let addCourseBtn = () => {
        if (true
            && FormData.CourseName
            && FormData.Disciption
            && FormData.Duration
            && FormData.Teacher
            && FormData.Status != null
            && FormData.Status != undefined
            && FormData.Fees
        ) {
            dispatch(AddInstituteCourse({ id: instituteId.id, Data: FormData }))
        } else {
            enqueueSnackbar("Please Fill the All Input Feild", { variant: "error" })
        }

    }

    React.useEffect(() => {
        if (CourseFormRes.Success && !CourseFormRes.error && !CourseFormRes.pending) enqueueSnackbar("Your Registration completed", { variant: "success" })
        if (!CourseFormRes.Success && CourseFormRes.error && !CourseFormRes.pending) enqueueSnackbar(CourseFormRes.error, { variant: "error" })
    }, [CourseFormRes])


    return (
        <>
            {!CourseFormRes.Success && !CourseFormRes.error && CourseFormRes.pending ? <CS_PageLoader /> : <>
            <div className='flex justify-between py-5 items-center'>
                <h1 className="text-3xl my-5 font-semibold ">Add Courses</h1>
                <Button onClick={addCourseBtn} variant='contained' className="sm:h-[40px] md:h-[50px]">Add Course</Button>
            </div>
            <div className='grid grid-cols-9 gap-3'>
                <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="CourseName" type="text" ClassName="col-span-9" label='Course Name' />
                <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="Disciption" type="text" Multiline={true} ClassName="col-span-9" label='Discription' />
                <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="Duration" type="text" ClassName="col-span-9" label='Duration' placeholder="example : 4 month" />
                <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="Fees" type="text" ClassName="col-span-9" label='Fees' />
                <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="Teacher" type="text" ClassName="col-span-9" label='Teacher' />
                <CS_Select onChangeEvt={(e: any) => getInputValues(e)} Name="Status" ClassName="col-span-9" Size='medium' label="Registration Form" Options={[
                    { text: "Open", value: true },
                    { text: "Close", value: false },

                ]} />
            </div>
            </>}
        </>
    )
}

export default CourseFrom