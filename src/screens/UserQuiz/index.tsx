import React from "react"
import { CS_PageLoader } from "../../Components"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import { Divider } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit"
import { RecodStudentQuiz } from "../../config/Redex/reducers/studentSlice"


type AppDispatch = ThunkDispatch<{ a: string }, any, AnyAction>
const UserQiuz = () => {
  const [ShowingResult, setShowingResult] = React.useState(false)
  const [QuizData, setQuizData] = React.useState<any>()
  const [QuestionIndex, setQuestionIndex] = React.useState<number>(0)
  const [Marks, setMarks] = React.useState<number>(0)
  let dispatch: AppDispatch = useDispatch()
  let Navigate = useNavigate()
  let location = useLocation()
  let AllData = location.state

  React.useEffect(() => {
    !location.state ? Navigate("./") : setQuizData(location.state.QuizData)
  }, [location])
  

  let CheckingAns = (value: string) => {
    QuizData.QuizQuestion[QuestionIndex].CorrectAns === value ? setMarks(p => p + 1) : null
    if (QuestionIndex + 1 < QuizData.QuizQuestion.length) {
      setQuestionIndex(p => p + 1)
    } else {
      dispatch(RecodStudentQuiz({InstID : AllData.InsID, CourseID : AllData.CourseID , QuizID :QuizData.id , Data: {Student : AllData.StudentData , Marks : Marks } }))
      setShowingResult(true)
    }
  }
  return (
    !QuizData ? <CS_PageLoader /> :
      <>
        <div className="min-h-screen flex justify-center items-center z-50 w-screen">
          <Container maxWidth="md" sx={{ p: "0 !important" }} className="min-h-max rounded-md overflow-hidden bg-gray-100 ">
            {ShowingResult ? <>
              <span className="block h-1 w-full bg-blue-500"></span>
              <div className="flex flex-col gap-y-5 items-center p-5">
                <h1 className="text-3xl font-bold text-center my-5">Result</h1>
                <h1 className="text-lg font-semibold text-center">Thanks For Given a Quiz 😊</h1>
                <h1 className="text-lg font-semibold text-center">Your Quiz has been Recorded In Institute</h1>
                <h1 className="text-lg font-semibold text-center">Your Marks is <span className="inline-block rotate-180 text-gray-400">^</span></h1>
                <h1 className="text-2xl font-semibold text-center bg-green-100 py-1 px-3 rounded-md">{Marks} <span className="text-green-600 text-sm"> Out of</span> {QuizData.QuizQuestion.length}</h1>
                <Button variant="contained" onClick={() => { Navigate('./') }}> Back To Quiz </Button>
              </div>
              <span className="block h-1 w-full bg-blue-500"></span>
            </> : <>
            <span className="block h-1 w-full bg-blue-500"></span>
              <div className="flex p-5 gap-3 flex-col">
                <div className="flex justify-between py-3">
                  <span>Question {(QuestionIndex) + 1} / {QuizData.QuizQuestion.length}</span>

                </div>
                <div className="text-2xl font-semibold bg-blue-50 ">{QuizData?.QuizQuestion[QuestionIndex]?.Question} </div>
                <Divider />
                <div className="flex flex-col gap-y-5 my-3">
                  {QuizData?.QuizQuestion[QuestionIndex]?.Options.map((x: any, i: number) => <Button key={i} sx={{ py: 2 }} variant="outlined" onClick={() => CheckingAns(x)}>{x}</Button>)}
                </div>
              </div>
              <span className="block h-1 w-full bg-blue-500"></span>
            </>}
          </Container>
        </div>
        {/* {modalOpen && <CS_Modal ChildComponent={Comp} OpenState={{ State: modalOpen }} />} */}
      </>
  )
}

export default UserQiuz