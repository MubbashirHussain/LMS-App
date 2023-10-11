import React from 'react'
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import LockIcon from '@mui/icons-material/Lock';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import AddBoxIcon from '@mui/icons-material/AddBox';
import { CS_Input } from '../../../Components';



const QuizAppAdmin = () => {

  // const [FormData, setFormData] = React.useState({})
  const [Todo , setTodo] = React.useState([])
  const [FormConfig, setFormConfig] = React.useState({
    QuizNameEr: false,
    QuizDurationEr: false,
    SecretKeyEr: false,
    QuizOpenEr: false,
    QuizDescriptionEr: false,
    QuizNameDis: false,
    QuizDurationDis: false,
    SecretKeyDis: false,
    QuizOpenDis: false,
    QuizDescriptionDis: false,
    FromLock: false
  })

  let GettingInputValues = (e:any , SetterFx:CallableFunction , State:any) => {
    SetterFx({
        ...State , 
        [e.target.name] : e.target.value
      })
  }


  return (<>
    <div className="flex justify-between my-5">
      <h2 className="text-3xl">Quiz App Admin</h2>
      <Button variant="contained">Add Quiz</Button>
    </div>
    <Box
      className="grid grid-cols-3 gap-3"
      component="form"
      autoComplete="on"
      noValidate
    >
      <CS_Input disabled={FormConfig.QuizNameDis} Error={FormConfig.QuizNameEr} label="Quiz Name" Required={true} Variant='filled' />
      <CS_Input disabled={FormConfig.QuizDurationDis} Error={FormConfig.QuizDurationEr} label="Quiz Duration in min" type='number' Required={true} Variant='filled' />
      <CS_Input disabled={FormConfig.SecretKeyDis} Error={FormConfig.SecretKeyEr} label="Secret Key" Required={true} Variant='filled' />
      <CS_Input disabled={FormConfig.QuizOpenDis} Error={FormConfig.QuizOpenEr} label="Quiz Open" Required={true} Variant='filled' />
      <CS_Input disabled={FormConfig.QuizDescriptionDis} Error={FormConfig.QuizDescriptionEr} ClassName="col-span-2" label="Description" Required={true} Multiline={true} Variant='filled' />
      <Button variant="contained" startIcon={FormConfig.FromLock ? <LockIcon /> : <LockOpenIcon />} onClick={() => setFormConfig({
        ...FormConfig,
        QuizNameDis: !FormConfig.QuizNameDis,
        QuizDurationDis: !FormConfig.QuizDurationDis,
        SecretKeyDis: !FormConfig.SecretKeyDis,
        QuizOpenDis: !FormConfig.QuizOpenDis,
        QuizDescriptionDis: !FormConfig.QuizDescriptionDis,
        FromLock: !FormConfig.FromLock,
      })}>Quiz {FormConfig.FromLock ? "unLock" : "Lock"}</Button>
    </Box>
    <Box
      className="grid grid-cols-9 gap-3 my-10"
      component="form"
      autoComplete="on"
      noValidate
    >
      <CS_Input ClassName="col-span-9" onChangeEvt={(e:any)=> GettingInputValues(e , setTodo , Todo)} label="Questions" Required={true} Variant='filled' />
      <CS_Input ClassName="col-span-7" onChangeEvt={(e:any)=> GettingInputValues(e , setTodo , Todo)} label="Write Option" Required={true} Multiline={true} Variant='filled' />
      <Button className="col-span-2" variant="contained" startIcon={<AddBoxIcon />} onClick={() => {}} >Add</Button>
    </Box>
  </>
  )
}


export default QuizAppAdmin