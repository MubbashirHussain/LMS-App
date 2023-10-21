import React from "react";
import Avatar from '@mui/material/Avatar';
import { CS_Drawer, CS_PageLoader } from "../../Components";
import { blue } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import { FirebaseLogout } from "../../config/Firebase/firebaseMethords";
import { useDispatch, useSelector } from "react-redux";
import CourseFrom from "./CourseForm";
import CourseList from "./CourseList";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import QuizList from "./CourseList/Quiz";
import RegistrationContral from "./RegistrationContral";
import { FetchInstitute } from "../../config/Redex/reducers/instituteList";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
import Result from "./Result";


import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import SummarizeOutlinedIcon from '@mui/icons-material/SummarizeOutlined';
import FeedOutlinedIcon from '@mui/icons-material/FeedOutlined';
import AssignmentOutlinedIcon from '@mui/icons-material/AssignmentOutlined';
import LogoutIcon from '@mui/icons-material/Logout';
import AssignmentIndOutlinedIcon from '@mui/icons-material/AssignmentIndOutlined';



// type state = { a: string }
// type AppDispatch = ThunkDispatch<state, any, AnyAction>

function Logout() {
    let Navigate = useNavigate()
    React.useEffect(() => {
        FirebaseLogout()
        Navigate("/Login")
    }, [])
    return (<></>)
}

let Defaultdata = {
    NavList: [
        {
            Heading: "Course",
            Components: [
                { route: "Courselist/*", Navigate: "Courselist", text: "Course's", Icon: <PlaylistAddCheckIcon />, RouteComponent: <CourseList /> },
                { route: "CourseForm", text: "Course Form", Icon: <SummarizeOutlinedIcon />, RouteComponent: <CourseFrom /> },
                { route: "RegistrationControl", text: "Registration Control", Icon: <FeedOutlinedIcon />, RouteComponent: <RegistrationContral /> },
                { route: "Result", text: "Result", Icon: <AssignmentOutlinedIcon />, RouteComponent: <Result /> },
            ]
        },
        {
            Heading: "Students",
            Components: [
                { route: "StudentsList/*", Navigate: "StudentsList", text: "Students", Icon: <AssignmentIndOutlinedIcon />, RouteComponent: <StudentList /> },
                { route: "StudentForm", text: `Student Form`, Icon: <PersonAddAltIcon />, RouteComponent: <StudentForm /> },
            ]
        },
    ],
    BottomNav: [
        { route: "logout", text: "Logout", Icon: <LogoutIcon />, RouteComponent: <Logout /> },
    ]
}
let ExtraRoutes = [
    { route: "Courselist/:Course/*", RouteComponent: <QuizList /> },
]


type state = { a: string }
type AppDispatch = ThunkDispatch<state, any, AnyAction>


const Institute = () => {
    let UserLogined = useSelector((state: any) => state.User.UserLogin)
    let InstitutesData = useSelector((state: any) => state.institute.Institutes.Data)
    let dispatch: AppDispatch = useDispatch()
    let Navigate = useNavigate()
    React.useEffect(() => {
        UserLogined.Usertype ?
            (UserLogined.Usertype != "institute" ? Navigate("/login")
                : dispatch(FetchInstitute(`institute/${UserLogined.id}`)))
            : UserLogined === "NoUserLogin" ? Navigate("/login") : null
    }, [UserLogined])

    return (
        <>{
            !InstitutesData ? <CS_PageLoader /> :
                <CS_Drawer
                    ExtraRoutes={ExtraRoutes}
                    CompPathName="/institute"
                    NavListArray={Defaultdata}
                    NavConfig={{}}
                    SmLogo={
                        <div className="flex justify-center items-center gap-3">
                            <Avatar className="text-center" sx={{ bgcolor: blue[500], height: 42, width: 42, fontSize: "1.5rem" }} alt={`${InstitutesData.UserName}`} src={InstitutesData.instituteLogo} />
                            <h1 className="font-semibold text-stone-700 text-md">{InstitutesData.InstituteShortName}</h1>
                        </div>}
                    Logo={
                        <div className="flex justify-center items-center flex-col gap-3">
                            <Avatar className="text-center" sx={{ bgcolor: blue[500], height: 42, width: 42, fontSize: "1.5rem" }} alt={`${InstitutesData.UserName}`} src={InstitutesData.instituteLogo} />
                            <h1 className="font-semibold text-stone-700">{InstitutesData.InstituteName}</h1>
                        </div>
                    }
                />
        }
        </>
    )
}

export default Institute