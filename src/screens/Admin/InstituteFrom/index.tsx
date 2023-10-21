import React from 'react'
import { ThunkDispatch, AnyAction } from '@reduxjs/toolkit';
import { Button } from "@mui/material";
import { CS_Input, CS_PageLoader, CS_Select, CS_UploadFile } from '../../../Components'
import { FirebaseUploadfile } from '../../../config/Firebase/firebaseMethords'
import { useDispatch, useSelector } from 'react-redux';
import { enqueueSnackbar } from 'notistack';
import { AddInstitute } from '../../../config/Redex/reducers/AdminSlice';

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
    const [UploadImg, setUploadImg] = React.useState<File>()
    let [FormData, setFromData] = React.useState<FormType>({ UserType: "Institute" })


    let InstRegistationRes = useSelector((a: any) => a.Admin.AdminData.InstituteRegistrationForm.Status)
    let dispatch: AppDispatch = useDispatch()
    // console.log(InstRegistationRes)
    let getInputValues = (e: any) => { setFromData({ ...FormData, [e.target.name]: e.target.value }) }
    let RegisterInstituteBtn = () => {
        if (true
            && FormData.InstituteName
            && FormData.InstituteShortName
            && FormData.Email
            && FormData.Password
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
            if (!UploadImg) enqueueSnackbar("Please Upload You'er Institute Logo", { variant: "warning" })
            else if (FormData.Password?.length < 6) enqueueSnackbar("You're Password Should be Greater then 6", { variant: "warning" })
            else if (!FormData.Email.includes("@")) enqueueSnackbar('Please Enter Right Email', { variant: "warning" })
            else FirebaseUploadfile(UploadImg, "instituteLogo")
                .then((res: any) => {
                    // enqueueSnackbar("Image has been Uploaded", { variant: "success" });
                    setisLoading(false)
                    setFromData({ ...FormData, "instituteLogo": `${res}` })
                    FormData.instituteLogo = res
                    dispatch(AddInstitute({ Data: FormData }))
                })
                .catch((er) => { setisLoading(false) ; enqueueSnackbar("Image did not upload", { variant: "error" }); console.log(er) })
                setisLoading(true)
        } else {
            enqueueSnackbar("Please Fill the All Input Field", { variant: "error" })
        }

    }
    React.useEffect(() => {
        if (InstRegistationRes.Success && !InstRegistationRes.error && !InstRegistationRes.pending) enqueueSnackbar("Your Registration completed", { variant: "success" })
        if (!InstRegistationRes.Success && InstRegistationRes.error && !InstRegistationRes.pending) enqueueSnackbar(InstRegistationRes.error, { variant: "error" })
    }, [InstRegistationRes])
    return (
        <>
            <div className='flex justify-between py-5 items-center'><h1 className="text-3xl my-5 font-semibold ">Institute Register</h1> <Button onClick={RegisterInstituteBtn} variant='contained' className="sm:h-[40px] md:h-[50px]">Register institute</Button></div>
            {!InstRegistationRes.Success && !InstRegistationRes.error && InstRegistationRes.pending  || isLoading ? <CS_PageLoader /> : <>
                <div className='grid grid-cols-9 gap-3'>
                    <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="InstituteName" type="text" ClassName="col-span-9" label='Institute Name' />
                    <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="InstituteShortName" type="text" ClassName="col-span-9" label='Institute  Short Name' />
                    <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="Email" type="email" ClassName="col-span-9" label='Email' />
                    <CS_Input onChangeEvt={(e: any) => getInputValues(e)} Name="Password" type="password" ClassName="col-span-9" label='Password' />
                    <CS_UploadFile onChangeEvt={(e: any) => { setUploadImg(e.target.files[0]) }} Name='Image' accept='image/*' label={UploadImg ? <div className="mx-2 overflow-hidden text-ellipsis whitespace-nowrap" >{UploadImg.name}</div> : "Upload Logo img"} ClassName='col-span-3' sx={{ fontSize: { sm: "0.8rem", xs: "0.5rem" } }} />
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
            </>}
        </>
    )
}

export default InstituteForm