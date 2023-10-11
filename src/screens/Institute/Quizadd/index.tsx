import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/LockOpen';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { CS_Input, CS_Select } from '../../../Components';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { AddQuizlist } from '../../../config/Redex/reducers/instituteList';

type state = { a: string }
type AppDispatch = ThunkDispatch<state, any, AnyAction>

const QuizAppAdmin = () => {

  let dispatch:AppDispatch = useDispatch()
  let UserLogined = useSelector((state: any) => state.User.UserLogin)

  const [FormData, setFormData] = React.useState<{
    QuizInfo?: {
      QuizName?: string,
      QuizDuration?: number,
      SecretKey?: string,
      QuizOpen?: boolean | string,
      QuizDescription?: string,
    },
    QuizQuestion?: {
      Question: string,
      Options: any[],
      CorrectAns: string,
    }[]
  }>({})
  const [Todo, setTodo] = React.useState<any[]>([])
  const [Todoinput, setTodoinput] = React.useState("")
  const [Question, setQuestion] = React.useState("")
  const [Correct, setCorrect] = React.useState("")
  const [QuizInfo, setQuizInfo] = React.useState<{
    QuizName?: string,
    QuizDuration?: number,
    SecretKey?: string,
    QuizOpen?: boolean | string,
    QuizDescription?: string,
  }>()
  const [QuestionList, setQuestionList] = React.useState<{
    Question: string,
    Options: any[],
    CorrectAns: string,
  }[]>([])
  const [FormConfig, setFormConfig] = React.useState({
    QuizNameEr: false,
    QuizDurationEr: false,
    SecretKeyEr: false,
    QuizOpenEr: false,
    QuizDescriptionEr: false,
    FromLock: false
  })

  let GettingInputValues = (e: any) => setQuizInfo({ ...QuizInfo, [e.target.name]: e.target.value })
  let AddQuestion = () => {
    let tempQuiz = {
      Question: Question,
      Options: Todo,
      CorrectAns: Correct,
    }
    if (Correct.length > 0 && Todo.length > 0 && Question.length > 0) {
      QuestionList.push(tempQuiz)
      setQuestionList([...QuestionList])
    } else alert("invalied Quiz")

  }

  let AddQuiz = () => {
    if (true
      && QuestionList.length > 0
      && QuizInfo?.QuizName 
      && QuizInfo?.QuizDuration
      && QuizInfo?.SecretKey
      && QuizInfo?.QuizOpen != null
      && QuizInfo?.QuizOpen != undefined
      && QuizInfo?.QuizDescription
    ) {
      FormData.QuizQuestion = [...QuestionList];
      FormData.QuizInfo = { ...QuizInfo };
      setFormData({ ...FormData })
      console.log({ ...FormData })
      dispatch(AddQuizlist({ id: UserLogined.id, Data: FormData }))
    } else {
      alert("something is Missing")
    }

  }

  return (<>
    <div className="flex justify-between my-5">
      <h2 className="text-3xl">Quiz App</h2>
      <Button variant="contained" onClick={AddQuiz}>Add Quiz</Button>
    </div>
    <Box
      className="grid grid-cols-3 gap-3"
      component="form"
      autoComplete="on"
      noValidate
    >
      <CS_Input onChangeEvt={(e: any) => GettingInputValues(e)} Name="QuizName" disabled={FormConfig.FromLock} Error={FormConfig.QuizNameEr} label="Quiz Name" Required={true} Variant='filled' />
      <CS_Input onChangeEvt={(e: any) => GettingInputValues(e)} Name="QuizDuration" disabled={FormConfig.FromLock} Error={FormConfig.QuizDurationEr} label="Quiz Duration in min" type='number' Required={true} Variant='filled' />
      <CS_Input onChangeEvt={(e: any) => GettingInputValues(e)} Name="SecretKey" disabled={FormConfig.FromLock} Error={FormConfig.SecretKeyEr} label="Secret Key" Required={true} Variant='filled' />
      <CS_Select onChangeEvt={(e: any) => GettingInputValues(e)} Name="QuizOpen" disabled={FormConfig.FromLock} Size='medium' variant='filled' label="Quiz Open" Options={[{ text: "Open", value: true }, { text: "Close", value: false }]} />
      <CS_Input onChangeEvt={(e: any) => GettingInputValues(e)} Name="QuizDescription" disabled={FormConfig.FromLock} Error={FormConfig.QuizDescriptionEr} ClassName="col-span-2" label="Description" Required={true} Multiline={true} Variant='filled' />
      <Button variant="contained" startIcon={FormConfig.FromLock ? <LockIcon /> : <LockOpenIcon />} onClick={() => setFormConfig({
        ...FormConfig, FromLock: !FormConfig.FromLock,
      })}>Quiz {FormConfig.FromLock ? "unLock" : "Lock"}</Button>
    </Box>
    <Box
      className="grid grid-cols-9 gap-3 my-10"
      component="form"
      autoComplete="on"
      noValidate
    >
      <CS_Input ClassName="col-span-9" onChangeEvt={(e: any) => setQuestion(e.target.value)} label="Questions" Required={true} Variant='filled' />
      <CS_Input Value={Todoinput} ClassName="col-span-7" onChangeEvt={(e: any) => setTodoinput(e.target.value)} label="Write Option" Required={true} Variant='filled' />
      <Button className="col-span-2" variant="contained" startIcon={<AddBoxIcon />} onClick={() => { Todoinput.length > 0 && Todo.push(Todoinput); setTodo([...Todo]); setTodoinput("") }} >Add</Button>
      <div className='col-span-6'>
        {Todo && Todo.map((x: any, i: number) => <div key={i} className='border px-5 flex justify-between items-center bg-slate-300 mb-3 rounded-md'><span className='cursor-pointer py-4 w-full h-full' onClick={() => { setCorrect(x) }}>{x}</span><span className="text-red-600" onClick={(e) => { e.preventDefault();[...Todo.splice(i, 1)]; setTodo([...Todo]) }}><DeleteIcon /></span></div>)}
      </div>
      <div className='col-span-3 flex bg-slate-200 p-5 rounded flex-col'>
        {Correct && <><h1 className="text-center text-xl">Correct Answer</h1><div className=' border p-3 px-5 bg-green-300 font-sans text-ellipsis whitespace-nowrap overflow-hidden border-green-600 font-semibold my-3 rounded h-min text-center'>{Correct}</div></>}
        <Button className='' variant='contained' startIcon={<AddBoxIcon />} onClick={AddQuestion} > Add Question</Button>
      </div>
    </Box>

  </>
  )
}


export default QuizAppAdmin