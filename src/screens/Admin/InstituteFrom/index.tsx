import React from 'react'
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { Button } from "@mui/material";
import { CS_Input, CS_Loader, CS_Select, CS_UploadFile } from '../../../Components'
import { Uploadfile } from '../../../config/Firebase/firebaseMethords'
import { useDispatch } from 'react-redux';
import { AddInstitute } from '../../../config/Redex/reducers/instituteList';

type FormType = {
    InstituteName?: string
    InstituteShortName?: string,
    instituteLogo?: string,
    NoOfCampus?: string,
    CampusDetails?: string,
    Email?: string,
    Password?: string,
    Location?: string,
    Address?: string,
    Contact?: string,
    OwnerContact?: string,
    OwnerEmail?: string,
    UserType?: string,
    IsinstituteActive?: string,
    InstituteType?: string,
}
type AppDispatch = ThunkDispatch<{ a: string }, any, AnyAction>
const InstituteForm = () => {

    const [isLoading, setisLoading] = React.useState<boolean>(false)
    const [FormData, setFromData] = React.useState<FormType>({ UserType: "Institute" })


    let dispatch: AppDispatch = useDispatch()
    let getInputValues = (e: any) => { setFromData({ ...FormData, [e.target.name]: e.target.value }) }
    let RegisterInstituteBtn = () => {
        if (true
            && FormData.InstituteName
            && FormData.InstituteShortName
            && FormData.Email
            && FormData.Password
            && FormData.instituteLogo
            && FormData.NoOfCampus
            && FormData.CampusDetails
            && FormData.Location
            && FormData.Address
            && FormData.Contact
            && FormData.OwnerContact
            && FormData.OwnerEmail
            && FormData.UserType
            && FormData.IsinstituteActive != null
            && FormData.IsinstituteActive != undefined
            && FormData.InstituteType
        ) {
            if (FormData.Password?.length < 6) alert('You"re Password Should be Greater then 6')
            else if (!FormData.Email.includes("@")) alert('Please Enter Right Email')
            else dispatch(AddInstitute({ path: "institute", Data: FormData }))
        } else {
            alert("Please Fill the All Input Feild")
        }

    }
    return (
        <>
            <div className='flex justify-between py-5 items-center'><h1 className="text-3xl my-5 font-semibold ">Institute Register</h1> <Button onClick={RegisterInstituteBtn} variant='contained' className="sm:h-[40px] md:h-[50px]">Register institute</Button></div>
            <div className='grid grid-cols-9 gap-3'>
                <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="InstituteName" type="text" ClassName="col-span-9" label='Institute Name' />
                <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="InstituteShortName" type="text" ClassName="col-span-9" label='Institute  Short Name' />
                <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="Email" type="email" ClassName="col-span-9" label='Email' />
                <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="Password" type="password" ClassName="col-span-9" label='Password' />
                <CS_UploadFile onChangeEvt={(e: any) => {
                    setisLoading(true)
                    Uploadfile(e.target.files[0], "instituteLogo")
                        .then((res) => { setisLoading(false); alert("Uploaded"); setFromData({ ...FormData, "instituteLogo": `${res}` }) ;console.log(res) })
                        .catch((er) => { setisLoading(false); alert("Image did not upload"); console.log(er) })
                }} Name='Image' accept='image/*' label={isLoading ? <CS_Loader sx={{ color: "white", margin: "0 5px" }} /> : "Upload Logo img"} ClassName='col-span-3' sx={{ fontSize: { sm: "0.8rem", xs: "0.5rem" } }} />
                <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="NoOfCampus" ClassName="col-span-6" type="number" label='No of Campus' />
                <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="CampusDetails" ClassName="col-span-9" Multiline={true} type='text' label='Campus Details' />
                <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="Location" ClassName="col-span-9" Multiline={true} type='text' label='Location' />
                <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="Address" ClassName="col-span-9" Multiline={true} type='text' label='Address' />
                <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="Contact" ClassName="col-span-3" type='number' label='Contact' />
                <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="OwnerContact" ClassName="col-span-3" type='text' label='Owner Contact' />
                <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="OwnerEmail" ClassName="col-span-3" type='text' label='Owner Email' />
                <CS_Select onChangeEvt={(e: any) => getInputValues(e)} Name="UserType" ClassName="col-span-9" Selected="institute" Readonly={true} Size='medium' label="User Type" Options={[{ text: "Institute", value: "institute" }]} />
                <CS_Select onChangeEvt={(e: any) => getInputValues(e)} Name="IsinstituteActive" ClassName="col-span-9" Size='medium' label="institute Acvite" Options={[{ text: "Open", value: true }, { text: "Close", value: false }]} />
                <CS_Select onChangeEvt={(e: any) => getInputValues(e)} Name="InstituteType" ClassName="col-span-9" Size='medium' label="Institute Type" Options={[
                    { text: "School", value: "School" },
                    { text: "College", value: "College" },
                    { text: "University", value: "University" },
                    { text: "Institute", value: "Institute" },
                ]} />
            </div>
        </>
    )
}

export default InstituteForm