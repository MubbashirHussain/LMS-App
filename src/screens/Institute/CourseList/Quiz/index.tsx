import React from "react";
import Container from '@mui/material/Container';
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { CS_Card } from "../../../../Components";
import { useDispatch, useSelector } from "react-redux";
import { NotFound } from "../../..";
import EditQuiz from "../EditQuiz";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { UpdateQuizList } from "../../../../config/Redex/reducers/instituteList";
import { Button, Typography } from "@mui/material";
import QuizAppAdmin from "../Quizadd";

type Dispatch = ThunkDispatch<{ a: string }, any, AnyAction>

function QuizList() {
    let Params = useParams()
    let Navigate = useNavigate()
    let dispatch: Dispatch = useDispatch()

    let InstitutesData = useSelector((state: any) => state.institute.Institutes.Data)
    let Courses: any = InstitutesData.Course ? Object.values(InstitutesData.Course) : null
    let SelectedCourse: any = Courses?.filter((x: any) => Params.Course?.split(" ").join("") === x.CourseName.split(" ").join(""))[0]
    let Quizlist: any = InstitutesData.Course[SelectedCourse.id].Quizlist ? Object.values(InstitutesData.Course[SelectedCourse.id].Quizlist) : null
    let Selected: any = Quizlist?.filter((x: any) => Params["*"]?.split(" ").join("") === x.QuizInfo.QuizName.split(" ").join(""))[0]
    // console.log(Selected)
    React.useEffect(() => {
    }, [])

    return (
        <>
            <Routes>
                <Route path="AddNewQuiz/" element={<QuizAppAdmin />} />
                {Quizlist && <Route path="*" element={<>{!Selected ? <NotFound /> : <EditQuiz QuizData={Selected} DatasetFX={(Data: any) => { Navigate("./"); dispatch(UpdateQuizList({ InsID: InstitutesData.id, CourseID: SelectedCourse.id, QuizID: Selected.id, Data: Data })) }} />}</>} />}
                <Route path="/" element={<>
                    <Container maxWidth="md" className="bg-gray-100 min-w-full">
                        <div className="flex items-center flex-col">
                            <div className="flex w-full justify-between my-5">
                                <h2 className="text-3xl">Quiz App</h2>
                                <Button variant="contained" onClick={() => { Navigate("AddNewQuiz") }}>Add New Quiz</Button>
                            </div>
                            <div className="flex justify-center items-center flex-wrap gap-10">
                                {Quizlist ? Quizlist?.map((x: any, i: number) => <CS_Card
                                    ClassName="shadow-md cursor-pointer" key={i}
                                    onCardClick={() => { Navigate(`${x.QuizInfo.QuizName.split(" ").join("")}`) }}
                                    Data={{
                                        title: x.QuizInfo.QuizName, description: x.QuizInfo.QuizDescription, BottomComp: <div>
                                            <p className="px-3 font-semibold text-sm uppercase">Duration <span className='text-blue-500'>{x.QuizInfo.QuizDuration} mint</span></p>
                                        </div>,
                                    }} />
                                ) : <>
                                    <div className='flex text-center  flex-col gap-5 mt-[50%] justify-center items-center'>
                                        <h1 className='font-semibold md:text-3xl'>😕 No Quiz Available Here 😕 </h1>
                                        <Typography fontFamily="monospace" variant="caption" className="my-2 text-center">Please Add Any Quiz The Quiz List will Shown Here</Typography>
                                    </div>
                                </>}
                            </div>
                        </div>
                    </Container>
                </>} />
            </Routes >
        </>
    )
}
export default QuizList;
