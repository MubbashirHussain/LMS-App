import { useDispatch, useSelector } from "react-redux"
import { CS_Card, CS_PageLoader } from "../../Components"
import { FirebaseLogout } from "../../config/Firebase/firebaseMethords"
import { Avatar, Button, Typography } from "@mui/material"
import React from "react"
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
import { Route, Routes, useNavigate } from "react-router-dom"
import { FetchInstituteFromStudent } from "../../config/Redex/reducers/studentSlice"
import { UserQuiz } from ".."

type state = { a: string }
type AppDispatch = ThunkDispatch<state, any, AnyAction>
const Student = () => {

    let UserLogined = useSelector((state: any) => state.User.UserLogin)
    let InstData: any = useSelector((state: any) => state.Student.Institutes.Data)
    let Courses = InstData ? Object.values(InstData.Course) : null
    let Course: any = UserLogined && InstData ? Courses?.filter((x: any) => (x.CourseName.split(" ").join('') === InstData?.Students[UserLogined.id]?.Course.split(" ").join('')))[0] : null
    let QuizList: any[] | null = Course && Course.Quizlist ? Object.values(Course.Quizlist) : null


    // console.log(QuizList)
    // console.log(Course?.CourseName)
    // console.log(InstData?.Students[UserLogined.id])
    // console.log(InstData?.instituteLogo)
    // console.log(InstData?.InstituteName)
    // console.log(UserLogined.InstID , UserLogined.id)

    let Navigate = useNavigate()
    let dispatch: AppDispatch = useDispatch()

    React.useEffect(() => {
        UserLogined.Usertype ?
            (UserLogined.Usertype != "student" ? Navigate("/login")
                : dispatch(FetchInstituteFromStudent(`institute/${UserLogined.InstID}`)))
            : UserLogined === "NoUserLogin" ? Navigate("/login") : null
    }, [UserLogined])

    return (
        <>
            <Routes>
                <Route path="*" element={<UserQuiz />} />
                <Route path="/" element={<>
                    {!Course ? <CS_PageLoader /> : <>
                        <div className="min-h-screen flex flex-col bg-slate-50 text-center">
                            <div>
                                <div className="container:lg border-t border-b border-slate-300 my-1 mx-3 flex justify-between px-3">
                                    <div className="flex items-center font-semibold text-lg "><Avatar className="m-2" src={InstData?.instituteLogo} alt={InstData?.InstituteName} />{InstData?.InstituteName} / {Course?.CourseName} </div>
                                    <div className="flex items-center font-semibold text-md"><span className="mx-4">Student / {UserLogined?.UserName}</span> <Button variant="contained" onClick={() => { FirebaseLogout(); Navigate("/login") }}>Logout</Button> </div>
                                </div>
                                <div className="flex justify-between items-center m-8">
                                    <h1 className="text-start text-3xl font-semibold ">Quiz</h1>

                                </div>
                                <div className="flex flex-wrap gap-3 w-full px-5 justify-center">
                                    {QuizList ? QuizList.map((x: any, i: number) =>
                                        <CS_Card key={i}
                                            onCardClick={() => { Navigate(x.QuizInfo.QuizName.split(' ').join(''), { state: {InstID : InstData.id , StudentData : InstData?.Students[UserLogined.id],  CourseID : Course.id  ,QuizData : x} }) }}
                                            Data={{
                                                title: x.QuizInfo.QuizName,
                                                description: x.QuizInfo.QuizDescription,
                                                WithTitleComponent: <><span className="border rounded p-1 px-2 font-semibold bg-slate-100">{x.QuizInfo.QuizOpen ? "Open" : "Close"}</span></>,
                                                BottomComp:
                                                    <div className="flex w-full justify-end">
                                                        <p className="px-3 font-semibold text-sm uppercase">Duration <span className='text-blue-500'>{x.QuizInfo.QuizDuration} MINTS</span></p>
                                                    </div>
                                            }} />) : <>
                                        <div className='flex text-center  flex-col gap-5 mt-[10%] justify-center items-center'>
                                            <h1 className='font-semibold md:text-3xl'>😕 No Quiz Available Here 😕 </h1>
                                            <Typography fontFamily="monospace" variant="caption" className="my-2 text-center">No Quiz Givien By Insititute in This Course</Typography>
                                        </div>
                                    </>}

                                </div>
                            </div>
                        </div>
                    </>}
                </>} />
            </Routes>

        </>
    )
}

export default Student