import React from 'react'
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { Button } from "@mui/material";
import { CS_DatePicker, CS_Input, CS_PageLoader, CS_Select } from '../../../Components'
import { useDispatch, useSelector } from 'react-redux';
import { AddInstituteStudents } from '../../../config/Redex/reducers/instituteList';
import { enqueueSnackbar } from 'notistack';


type FormType = {
    UserName?: string
    FatherName?: string
    Contact?: string
    CNICNo?: string
    Lastqualification?: string
    Course?: string
    institute?: string
    Section?: string
    Email?: string
    Password?: string
    City?: string
    InstID?: string
    Country?: string
    Gender?: string
    Date?: string
    Address?: string
}
type AppDispatch = ThunkDispatch<{ a: string }, any, AnyAction>
const StudentForm = () => {
    let InstitutesData = useSelector((state: any) => state.institute.Institutes.Data)
    let StudentsFormRes = useSelector((a: any) => a.institute.Institutes.AddInstituteStudentsForm.Status)
    let CoursesData = InstitutesData.Course ? Object.values(InstitutesData.Course) : null
    let Courses: any = CoursesData?.map((x: any) => ({ text: x.CourseName, value: x.CourseName }))
    let dispatch: AppDispatch = useDispatch()
    let getInputValues = (e: any) => { setFromData({ ...FormData, [e.target.name]: e.target.value }) }
    const [FormData, setFromData] = React.useState<FormType>({ InstID: InstitutesData, institute: "institute", Country: "pakistan" })
    let RegisterInstituteBtn = () => {
        if (!Courses) enqueueSnackbar('Please Add Atleast One Course Before Register Student', { variant: "warning" })
        else if (true
            && FormData.UserName
            && FormData.FatherName
            && FormData.Contact
            && FormData.CNICNo
            && FormData.Lastqualification
            && FormData.Course
            && FormData.institute
            && FormData.Section
            && FormData.Email
            && FormData.Password
            && FormData.City
            && FormData.Country
            && FormData.Gender
            && FormData.Date
            && FormData.Address
        ) {
            if (FormData.Password?.length < 6) enqueueSnackbar("You're Password Should be Greater then 6", { variant: "warning" })
            else if (!FormData.Email.includes("@")) enqueueSnackbar('Please Enter Right Email', { variant: "warning" })
            else dispatch(AddInstituteStudents({ id: InstitutesData.id, Data: FormData }))
        } else {
            enqueueSnackbar("Please Fill the All Input Feild", { variant: "error" })
        }
    }

    React.useEffect(() => {
        if (StudentsFormRes.Success && !StudentsFormRes.error && !StudentsFormRes.pending) enqueueSnackbar("Your Registration completed", { variant: "success" })
        if (!StudentsFormRes.Success && StudentsFormRes.error && !StudentsFormRes.pending) enqueueSnackbar(StudentsFormRes.error , { variant: "error" })
    }, [StudentsFormRes])


    return (
        <>
            {!StudentsFormRes.Success && !StudentsFormRes.error && StudentsFormRes.pending ? <CS_PageLoader /> : <>
                <div className='flex justify-between py-5 items-center'>
                    <h1 className="text-3xl my-5 font-semibold ">Student Registration</h1>
                    <Button onClick={RegisterInstituteBtn} variant='contained' className="sm:h-[40px] md:h-[50px]">Register Student</Button>
                </div>
                <div className='grid grid-cols-9 gap-3'>
                    <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="UserName" type="text" ClassName="col-span-9" label='Student Name' />
                    <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="FatherName" type="text" ClassName="col-span-9" label='Father Name' />
                    <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="Contact" ClassName="col-span-3" type='number' label='Contact' />
                    <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="CNICNo" ClassName="col-span-3" type='number' label='CNIC No' />
                    <CS_Select onChangeEvt={(e: any) => getInputValues(e)} Name="institute" ClassName="col-span-3" Readonly={true} Size='medium' Selected="institute" label="institute" Options={[{ text: "Institute", value: "institute" }]} />
                    <CS_Select onChangeEvt={(e: any) => getInputValues(e)} Name="Lastqualification" ClassName="col-span-9" Size='medium' label="Last Qualification" Options={[
                        { text: "Primary", value: "Primary" },
                        { text: "Secondary", value: "Secondary" },
                        { text: "Associate Degree", value: "Associate Degree" },
                        { text: "Bachelor of Technology", value: "Bachelor of Technology" },
                        { text: "Professional Bachelor's degreee", value: "Professional Bachelor's degreee" },
                        { text: "Master's degree", value: "Master's degree" },
                        { text: "Master's Degree Post-honour", value: "Master's Degree Post-honour" },
                        { text: "Bachelor's degree (Pass/Honours)", value: "Bachelor's degree (Pass/Honours)" },
                        { text: "Doctoral Degre", value: "Doctoral Degre" },
                        { text: "medical", value: "medical" },
                    ]} />
                    <CS_Select onChangeEvt={(e: any) => getInputValues(e)} Name="Course" ClassName="col-span-9" Size='medium' disabled={Courses ? false : true} label="Course" Options={Courses ?? [{ text: "No Courses", value: "NoCourse" }]} />
                    <CS_Select onChangeEvt={(e: any) => getInputValues(e)} Name="Section" ClassName="col-span-9" Size='medium' label="Section" Options={[{ text: "Section A", value: "A" }, { text: "Section B", value: "B" }]} />
                    <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="Email" type="email" ClassName="col-span-9" label='Email' />
                    <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="Password" type="password" ClassName="col-span-9" label='Password' />
                    <CS_Select onChangeEvt={(e: any) => getInputValues(e)} Name="Country" ClassName="col-span-9" Size='medium' label="Country" Selected="pakistan" Options={[{ text: "Pakistan", value: "pakistan" }]} />
                    <CS_Select onChangeEvt={(e: any) => getInputValues(e)} Name="City" ClassName="col-span-9" Size='medium' label="City" Options={[
                        { text: "Karachi", value: "Karachi" },
                        { text: "Lahore", value: "Lahore" },
                        { text: "Faisalabad", value: "Faisalabad" },
                        { text: "Rawalpindi", value: "Rawalpindi" },
                        { text: "Gujranwala", value: "Gujranwala" },
                        { text: "Peshawar", value: "Peshawar" },
                        { text: "Multan", value: "Multan" },
                        { text: "Hyderabad", value: "Hyderabad" },
                        { text: "Islamabad", value: "Islamabad" },
                        { text: "Quetta", value: "Quetta" },
                        { text: "Bahawalpur", value: "Bahawalpur" },
                        { text: "Sargodha", value: "Sargodha" },
                        { text: "Sialkot", value: "Sialkot" },
                        { text: "Sukkur", value: "Sukkur" },
                        { text: "Larkana", value: "Larkana" },
                        { text: "Rahim", value: "Rahim" },
                        { text: "Sheikhupura", value: "Sheikhupura" },
                        { text: "Jhang", value: "Jhang" },
                        { text: "Dera", value: "Dera" },
                        { text: "Gujrat", value: "Gujrat" },
                    ]} />
                    <CS_DatePicker label="Date of Birth" SelectedDate={(e: any) => {setFromData({ ...FormData, Date: `${e.$M + 1}/${e.$D}/${e.$y}` })}} ClassName="col-span-9" />
                    <CS_Select onChangeEvt={(e: any) => getInputValues(e)} Name="Gender" ClassName="col-span-9" Size='medium' label="Gender" Options={[{ text: "Male", value: "Male" }, { text: "Female", value: "Female" }]} />
                    <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="Address" type="text" Multiline={true} ClassName="col-span-9" label='Address' />
                </div>
            </>}
        </>
    )
}

export default StudentForm