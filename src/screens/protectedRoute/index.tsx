import { useNavigate } from "react-router-dom"
import React from "react"
import { CS_PageLoader } from "../../Components";
import { useDispatch, useSelector } from "react-redux";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import { FetchUserLogin } from "../../config/Redex/reducers/UserSlice";

type state = { a: string }
type AppDispatch = ThunkDispatch<state, any, AnyAction>


function ProtectedRoute() {
    let Navigate = useNavigate()
    let UserLogin = useSelector((a: any) => a.User.UserLogin)
    let dispatch: AppDispatch = useDispatch()

    React.useEffect(() => {
        if (UserLogin === "NoUserLogin") {
            Navigate("/login")
        } else if (UserLogin.Usertype) {
            UserLogin.Usertype === "institute" ? Navigate("/institute") :
                UserLogin.Usertype === "admin" ? Navigate("/admin") :
                    UserLogin.Usertype === "student" ? Navigate("/student") :
                        Navigate("/login")
        }
    }, [UserLogin])
    React.useEffect(() => {
        dispatch(FetchUserLogin())
    }, [])

    return (<>{<CS_PageLoader />}</>)
}

export default ProtectedRoute;