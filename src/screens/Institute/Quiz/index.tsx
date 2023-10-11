import React from "react";
import Container from '@mui/material/Container';
import { Route, Routes, useNavigate, useParams } from "react-router-dom";
import { CS_Card } from "../../../Components";
import { useDispatch, useSelector } from "react-redux";
import { NotFound } from "../..";
import EditQuiz from "./EditQuiz";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { UpdateQuizList } from "../../../config/Redex/reducers/instituteList";

type Dispatch = ThunkDispatch<{ a: string }, any, AnyAction>

function QuizList() {
    let UserLogined = useSelector((state: any) => state.User.UserLogin)
    let InstitutesData = useSelector((state: any) => state.institute.Institutes)
    let Quizlist = Object.values(InstitutesData[UserLogined.id].Quizlist)
    let Navigate = useNavigate()
    let Params = useParams()
    let dispatch: Dispatch = useDispatch()

    let Selected = Quizlist.findIndex((x: any) => Params["*"]?.split("%20").join(" ") === x.QuizInfo.QuizName)
    // console.log(Quizlist[Selected])
    React.useEffect(() => {
    }, [])

    return (


        <>

            <Routes>
                <Route path="/" element={<><Container maxWidth="md" className="bg-gray-100 min-w-full">
                    <div className="flex items-center flex-col">
                        <h1 className="text-4xl font-semibold my-8 self-start">Quiz List </h1>
                        <div className="flex justify-center items-center flex-wrap gap-10">
                            {Quizlist && Quizlist.map((x: any, i: number) => <CS_Card
                                ClassName="shadow-md cursor-pointer" key={i}
                                onCardClick={() => { Navigate(`${x.QuizInfo.QuizName}`) }}
                                Data={{ title: x.QuizInfo.QuizName, description: x.QuizInfo.QuizDescription, duration: x.QuizInfo.QuizDuration, }} />
                            )}
                        </div>
                    </div>
                </Container></>} />
                <Route path="*" element={<>{Selected < 0 ? <NotFound /> : <EditQuiz QuizData={Quizlist[Selected]} DatasetFX={(Data: any) => { dispatch(UpdateQuizList({ InsID: UserLogined.id, QuizID: Quizlist[Selected], Data: Data })) }} />}</>} />
            </Routes >
        </>
    )
}
export default QuizList;
