import './App.css'
import React from "react";
import AppRouter from './config/routers/routes';
import { useDispatch } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { FetchUserLogin } from './config/Redex/reducers/UserSlice';
type state = { a: string }
type Dispatch = ThunkDispatch<state, any, AnyAction>
function App() {

  let dispatch: Dispatch = useDispatch()
  
  React.useEffect(() => {
    dispatch(FetchUserLogin())
  }, [])


  return (
    <>
      <AppRouter />
    </>
  )
}
export default App;