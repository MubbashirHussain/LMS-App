import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/LockOpen';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DeleteIcon from '@mui/icons-material/Delete';
import { CS_Input, CS_Select } from '../../../../Components';
import SyncAltIcon from '@mui/icons-material/SyncAlt';

// type QuizInfotype = {
//   QuizName?: string,
//   QuizDuration?: number,
//   SecretKey?: string,
//   QuizOpen?: false,
//   QuizDescription?: string,
// }

type Props = {
  DatasetFX: CallableFunction,
  QuizData: any
}
const EditQuiz = (props: Props) => {
  const { DatasetFX, QuizData } = props
  const [QuestionIndex, setQuestionIndex] = React.useState<number>(0)
  const [FormData, setFormData] = React.useState<{
    QuizInfo: {
      QuizName?: string,
      QuizDuration?: number,
      SecretKey?: string,
      QuizOpen?: boolean,
      QuizDescription?: string,
    },
    QuizQuestion: {
      Question: string,
      Options: any[],
      CorrectAns: string,
    }[]
  }>(QuizData)
  const [QuestionList, setQuestionList] = React.useState<{
    Question: string,
    Options: any[],
    CorrectAns: string,
  }[]>(QuizData.QuizQuestion)
  const [FormConfig, setFormConfig] = React.useState({
    QuizNameEr: false,
    QuizDurationEr: false,
    SecretKeyEr: false,
    QuizOpenEr: false,
    QuizDescriptionEr: false,
    FromLock: true
  })
  const [Todoinput, setTodoinput] = React.useState("")
  const [Question, setQuestion] = React.useState(QuestionList[QuestionIndex].Question)
  const [Todo, setTodo] = React.useState<any[]>(QuestionList[QuestionIndex].Options)
  const [Correct, setCorrect] = React.useState(QuestionList[QuestionIndex].CorrectAns)
  const [QuizInfo, setQuizInfo] = React.useState(QuizData.QuizInfo)

  let ReRendererFunction = () => {
    setFormData(QuizData)
    setQuestionList(QuizData.QuizQuestion)
    setQuestion(QuestionList[QuestionIndex].Question)
    setTodo(QuestionList[QuestionIndex].Options)
    setCorrect(QuestionList[QuestionIndex].CorrectAns)
    setQuizInfo(QuizData.QuizInfo)
  }

  React.useEffect(() => {
    ReRendererFunction()
  }, [QuizData])

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
  let DeleteQuestion = () => {
    if (QuestionList.length > 1) {
      if (QuestionIndex == QuestionList.length - 1) {
        setQuestionIndex(p => p - 1)
        setQuestion(QuestionList[QuestionIndex - 1].Question)
        setTodo(QuestionList[QuestionIndex - 1].Options)
        setCorrect(QuestionList[QuestionIndex - 1].CorrectAns)
      } else {
        setQuestion(QuestionList[QuestionIndex].Question)
        setTodo(QuestionList[QuestionIndex].Options)
        setCorrect(QuestionList[QuestionIndex].CorrectAns)
      }
      QuestionList.splice(QuestionIndex, 1)
      setQuestionList([...QuestionList])
    }
  }
  let UpdateQuestion = () => {
    let tempQuiz = {
      Question: Question,
      Options: Todo,
      CorrectAns: Correct,
    }
    if (Correct.length > 0 && Todo.length > 0 && Question.length > 0) {

      QuestionList[QuestionIndex] = tempQuiz

      setQuestionList([...QuestionList])
    } else alert("invalied Quiz")

  }

  let EditQuiz = () => {
    if (true
      && QuestionList.length > 0
      && QuizInfo?.QuizName
      && QuizInfo?.QuizDuration
      && QuizInfo?.SecretKey
      && QuizInfo?.QuizOpen != null
      && QuizInfo?.QuizOpen != undefined
      && QuizInfo?.QuizDescription
    ) {
      setFormData({ ...FormData, QuizQuestion: QuestionList, QuizInfo: QuizInfo })
      setFormData({ ...FormData })
      DatasetFX({QuizQuestion :QuestionList ,QuizInfo: QuizInfo})
    } else {
      alert("something is Missing")
    }

  }

  return (<>
    <div className="flex justify-between my-5">
      <h2 className="text-3xl">Edit Quiz</h2>
      <Button variant="contained" onClick={EditQuiz}>save Quiz</Button>
    </div>
    <Box
      className="grid grid-cols-3 gap-3"
      component="form"
      autoComplete="on"
      noValidate
    >
      <CS_Input Value={QuizInfo?.QuizName} onChangeEvt={(e: any) => GettingInputValues(e)} Name="QuizName" disabled={FormConfig.FromLock} Error={FormConfig.QuizNameEr} label="Quiz Name" Required={true} Variant='filled' />
      <CS_Input Value={QuizInfo?.QuizDuration} onChangeEvt={(e: any) => GettingInputValues(e)} Name="QuizDuration" disabled={FormConfig.FromLock} Error={FormConfig.QuizDurationEr} label="Quiz Duration in min" type='number' Required={true} Variant='filled' />
      <CS_Input Value={QuizInfo?.SecretKey} onChangeEvt={(e: any) => GettingInputValues(e)} Name="SecretKey" disabled={FormConfig.FromLock} Error={FormConfig.SecretKeyEr} label="Secret Key" Required={true} Variant='filled' />
      <CS_Select Selected={QuizInfo?.QuizOpen} onChangeEvt={(e: any) => GettingInputValues(e)} Name="QuizOpen" disabled={FormConfig.FromLock} Size='medium' variant='filled' label="Quiz Open" Options={[{ text: "Open", value: true }, { text: "Close", value: false }]} />
      <CS_Input Value={QuizInfo?.QuizDescription} onChangeEvt={(e: any) => GettingInputValues(e)} Name="QuizDescription" disabled={FormConfig.FromLock} Error={FormConfig.QuizDescriptionEr} ClassName="col-span-2" label="Description" Required={true} Multiline={true} Variant='filled' />
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
      <div className="flex justify-between gap-5 col-span-9">
        <Button variant='contained' disabled={(QuestionIndex <= 0) ? true : false} onClick={() => {
          setQuestionIndex(p => {
            setQuestion(QuestionList[p - 1].Question)
            setTodo(QuestionList[p - 1].Options)
            setCorrect(QuestionList[p - 1].CorrectAns)
            return p - 1
          })
        }}>Prev</Button>
        <Button variant='contained' disabled={(QuestionIndex >= QuestionList.length - 1) ? true : false} onClick={() => {
          setQuestionIndex(p => {
            setQuestion(QuestionList[p + 1].Question)
            setTodo(QuestionList[p + 1].Options)
            setCorrect(QuestionList[p + 1].CorrectAns)
            return p + 1
          })
        }}>Next</Button>
      </div>
      <CS_Input Value={Question} ClassName="col-span-9" onChangeEvt={(e: any) => setQuestion(e.target.value)} label="Questions" Required={true} Variant='filled' />
      <CS_Input Value={Todoinput} ClassName="col-span-7" onChangeEvt={(e: any) => setTodoinput(e.target.value)} label="Write Option" Required={true} Variant='filled' />
      <Button className="col-span-2" variant="contained" startIcon={<AddBoxIcon />} onClick={() => { Todoinput.length > 0 && Todo.push(Todoinput); setTodo([...Todo]); setTodoinput("") }} >Add</Button>
      <div className='col-span-6'>
        {Todo && Todo.map((x: any, i: number) => <div key={i} className='border px-5 flex justify-between items-center bg-gray-300 mb-3 rounded-md'><span className='cursor-pointer py-4 w-full h-full' onClick={() => { setCorrect(x) }}>{x}</span><span className="text-red-600 cursor-pointer" onClick={(e) => { e.preventDefault();[...Todo.splice(i, 1)]; setTodo([...Todo]) }}><DeleteIcon /></span></div>)}
      </div>
      <div className='col-span-3 flex bg-slate-200 p-5 rounded flex-col'>
        {Correct && <><h1 className="text-center text-xl">Correct Answer</h1><div className=' border p-3 px-5 bg-green-300 font-sans text-ellipsis whitespace-nowrap overflow-hidden border-green-600 font-semibold my-3 rounded h-min text-center'>{Correct}</div></>}
        <div className="flex flex-col gap-y-5">
          <Button color="info" variant='contained' startIcon={<AddBoxIcon />} onClick={AddQuestion} > Add New Question</Button>
          <Button color="success" variant='contained' startIcon={<SyncAltIcon />} onClick={UpdateQuestion} > Update Question</Button>
          <Button color="error" variant='contained' startIcon={<DeleteIcon />} onClick={DeleteQuestion} > Delete Question</Button>
        </div>
      </div>
    </Box>

  </>
  )
}


export default EditQuiz