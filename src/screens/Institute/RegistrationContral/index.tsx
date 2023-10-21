import React from "react";
import Container from '@mui/material/Container';
// import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { CS_Card, CS_SwitchBtn } from "../../../Components";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { UpdateCourseList } from "../../../config/Redex/reducers/instituteList";
import { Typography } from "@mui/material";


type state = { a: string }
type AppDispatch = ThunkDispatch<state, any, AnyAction>
function RegistrationContral() {

    let UserLogined = useSelector((state: any) => state.User.UserLogin)
    let InstitutesData = useSelector((state: any) => state.institute.Institutes.Data)
    let Courses = InstitutesData.Course ? Object.values(InstitutesData.Course) : null
    let dispatch: AppDispatch = useDispatch()
    // let Navigate = useNavigate()
    // console.log(Courses)
    React.useEffect(() => {
    }, [])

    return (

        <>
            <Container maxWidth="md" className="bg-gray-100 min-w-full">
                <div className="flex items-center flex-col">
                    <h1 className="text-4xl font-semibold my-8 self-start">Registration List </h1>
                    <div className="flex justify-center items-center flex-wrap gap-10">
                        {Courses ? Courses?.map((x: any, i: number) => {
                            // console.log(x.id)
                            return <CS_Card
                                ClassName="shadow-md" key={i}
                                Data={{
                                    title: x.CourseName, description: x.Disciption,
                                    BottomComp: <div className="flex w-full justify-end">
                                        <p className="px-3 font-semibold text-sm uppercase">Duration <span className='text-blue-500'>{x.Duration}</span></p>
                                    </div>, WithTitleComponent: <div className="flex justify-center flex-col items-center">
                                        <span className="font-semibold" >Form</span>

                                        {<li className={x.Status ? "marker:text-green-500 font-bold min-w-[80px]" : "marker:text-red-500 font-bold min-w-[80px]"}><CS_SwitchBtn defaultChecked={x.Status}
                                            onChangeEvt={(e: any) => dispatch(UpdateCourseList({ InsID: UserLogined.id, CourseID: x.id, Data: { ...x, Status: e } }))} /></li>}

                                    </div>
                                }} />
                        }) : <>
                            <div className='flex text-center  flex-col gap-5 mt-[30%] justify-center items-center'>
                                <h1 className='font-semibold md:text-3xl'>😕 No Courses Available Here 😕 </h1>
                                <Typography fontFamily="monospace" variant="caption" className="my-2 text-center">Please Add Any Course The Course List will Shown Here</Typography>
                            </div>
                        </>}

                    </div>
                </div>
            </Container >
        </>
    )
}
export default RegistrationContral;
