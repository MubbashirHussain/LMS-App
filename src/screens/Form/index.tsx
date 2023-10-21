import React from 'react'
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { FetchInstituteFromAdminForForm } from '../../config/Redex/reducers/AdminSlice'
import { CS_PageLoader } from '../../Components'
import { Typography } from '@mui/material'
import { SignUp } from '..'

type state = { a: string }
type Dispatch = ThunkDispatch<state, any, AnyAction>

const Form = () => {
    let Params = useParams()
    let dispatch: Dispatch = useDispatch()
    let InstData = useSelector((State: any) => State.Admin.InstituteRegistration)
    React.useEffect(() => { dispatch(FetchInstituteFromAdminForForm("institute")) }, [])
    let SelectedInst =  InstData.Data ? InstData.Data?.filter((x: any) => (Params.Inst?.toLowerCase() === x.Name.split(" ").join("").toLowerCase()))[0] : null
    let AvailableCourse = SelectedInst?.Course?.filter((x: any) => (x.Status)).map((x: any) => ({ text: x.Name, value: x.id }))
    return (
        <>
            {
                InstData.Status.pending || !InstData.Data ? <CS_PageLoader /> :
                    InstData.Status.error ? <>
                        <div className='flex flex-col gap-5 min-h-screen justify-center items-center'>
                            <h1 className='font-semibold md:text-3xl '>⛔ 404 There Is Some Error ⛔</h1>
                            <Typography fontFamily="monospace" variant="caption" className="my-2 text-center">There Is Some Error In Backend / DataBase</Typography>
                        </div>
                    </> :
                        InstData.Data && Params.Inst && Params.Inst?.length > 0 && SelectedInst ?
                            SelectedInst.Course && AvailableCourse.length > 0 ? <SignUp Data={SelectedInst} />
                                : <>
                                    <div className='flex text-center  flex-col gap-5 min-h-screen justify-center items-center'>
                                        <h1 className='font-semibold md:text-3xl'>No Form Available 📄</h1>
                                        <Typography fontFamily="monospace" variant="caption" className="my-2 text-center">No Registration Form Available in This Institute</Typography>
                                    </div>
                                </>
                            : <>
                                <div className='flex text-center  flex-col gap-5 min-h-screen justify-center items-center'>
                                    <h1 className='font-semibold md:text-3xl'>⚠️ Wrong Institute URL ⚠️</h1>
                                    <Typography fontFamily="monospace" variant="caption" className="my-2 text-center">Please Check URL and put again <br /> This is not a Valid URl</Typography>
                                </div>
                            </>

            }
        </>
    )
}

export default Form