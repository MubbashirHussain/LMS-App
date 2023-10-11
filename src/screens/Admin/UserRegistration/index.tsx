import React from 'react'
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { Button } from "@mui/material";
import { CS_Input, CS_Select } from '../../../Components'
import { useDispatch } from 'react-redux';
import { AddUserRegister } from '../../../config/Redex/reducers/UserSlice';

type FormType = {

    Email?: string
    Password?: string
    NoOfCampus?: string
    UserName?: string
    Usertype?: string
}
type AppDispatch = ThunkDispatch<{ a: string }, any, AnyAction>
const UserRegsitration = () => {

    const [FormData, setFromData] = React.useState<FormType>({})


    let dispatch: AppDispatch = useDispatch()
    let getInputValues = (e: any) => { setFromData({ ...FormData, [e.target.name]: e.target.value }) }
    let RegisterInstituteBtn = () => {
        if (true
            && FormData.Email
            && FormData.Password
            && FormData.NoOfCampus
            && FormData.UserName
            && FormData.Usertype
        ) {
            if (FormData.Password?.length < 6) alert('You"re Password Should be Greater then 6')
            else if (!FormData.Email.includes("@")) alert('Please Enter Right Email')
            else dispatch(AddUserRegister({Data: FormData }))
        } else {
            alert("Please Fill the All Input Feild")
        }

    }
    return (
        <>
            <div className='flex justify-between py-5 items-center'><h1 className="text-3xl my-5 font-semibold ">User Register</h1> <Button onClick={RegisterInstituteBtn} variant='contained' className="sm:h-[40px] md:h-[50px]">Register User</Button></div>
            {<div className='grid grid-cols-9 gap-3'>
                <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="UserName" type="text" ClassName="col-span-9" label='Name' />
                <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="Email" type="email" ClassName="col-span-9" label='Email' />
                <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="Password" type="password" ClassName="col-span-9" label='Password' />
                <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="NoOfCampus" ClassName="col-span-9" type="number" label='CNIC No' />
                <CS_Select onChangeEvt={(e: any) => getInputValues(e)} Name="Usertype" ClassName="col-span-9" Size='medium' label="Type" Options={[
                    { text: "Admin", value: "admin" },
                    { text: "Student", value: "student" },
                    { text: "Teacher", value: "teacher" },
                    { text: "Intitute", value: "intitute" },
                ]} />
            </div>}
        </>
    )
}

export default UserRegsitration