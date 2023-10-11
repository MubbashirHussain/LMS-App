import React from "react";
import Avatar from '@mui/material/Avatar';

import PlaylistAddCheckIcon from '@mui/icons-material/PlaylistAddCheck';
import LogoutIcon from '@mui/icons-material/Logout';
import InsertDriveFileOutlinedIcon from '@mui/icons-material/InsertDriveFileOutlined';
import PaletteOutlinedIcon from '@mui/icons-material/PaletteOutlined'; import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import AddCardIcon from '@mui/icons-material/AddCard';

import { CS_Drawer, CS_PageLoader } from "../../Components";
import { blue } from '@mui/material/colors';
import { useNavigate } from "react-router-dom";
import { FirebaseLogout } from "../../config/Firebase/firebaseMethords";
import { useSelector } from "react-redux";
import CourseFrom from "./CourseForm";
import CourseList from "./CourseList";
import StudentForm from "./StudentForm";
import StudentList from "./StudentList";
import QuizAppAdmin from "./Quizadd";
import QuizList from "./Quiz";


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
                { route: "Courselist/*",  Navigate: "Courselist",  text: "Course's", Icon: <PlaylistAddCheckIcon />, RouteComponent: <CourseList /> },
                { route: "CourseForm", text: "Course Form", Icon: <InsertDriveFileOutlinedIcon />, RouteComponent: <CourseFrom /> },
                { route: "RegistrationControl", text: "Registration Control", Icon: <InsertDriveFileOutlinedIcon />, RouteComponent: <>Registraion From</> },
                { route: "Result", text: "Result", Icon: <InsertDriveFileOutlinedIcon />, RouteComponent: <>Result</> },
            ]
        },
        {
            Heading: "Students",
            Components: [
                { route: "StudentsList/*", Navigate: "StudentsList", text: "Students", Icon: <PersonAddAltIcon />, RouteComponent: <StudentList /> },
                { route: "StudentsDetails", text: "Students Details", Icon: <PaletteOutlinedIcon />, RouteComponent: <>Students Details</> },
                { route: "StudentForm", text: `Student Form`, Icon: <AddCardIcon />, RouteComponent: <StudentForm /> },
            ]
        },
        {
            Heading: "Quiz",
            Components: [
                { route: "Quiz/*", Navigate: "Quiz", text: "Quiz", Icon: <PaletteOutlinedIcon />, RouteComponent: <QuizList /> },
                { route: "AddQuiz", text: `Add Quiz`, Icon: <AddCardIcon />, RouteComponent: <QuizAppAdmin /> },
            ]
        },
    ],
    BottomNav: [
        { route: "logout", text: "Logout", Icon: <LogoutIcon />, RouteComponent: <Logout /> },
    ]
}

const Institute = () => {
    let UserLogined = useSelector((state: any) => state.User.UserLogin)
    let InstitutesData = useSelector((state: any) => state.institute.Institutes)
    let Navigate = useNavigate()
    let InstituteLogin = InstitutesData[UserLogined.id]

    React.useEffect(() => {
        UserLogined.Usertype ? (UserLogined.Usertype != "institute" ? Navigate("/login") : null) : UserLogined === "NoUserLogin" ? Navigate("/login") : null
    }, [UserLogined])


    return (
        <>{
            !InstituteLogin ? <CS_PageLoader /> :
                <CS_Drawer
                    CompPathName="/institute"
                    NavListArray={Defaultdata}
                    NavConfig={{}}
                    Logo={
                        <div className="flex justify-center items-center">
                            <Avatar className="text-center" sx={{ bgcolor: blue[500], height: 42, width: 42, fontSize: "1.5rem" }} alt={`${InstituteLogin.UserNmae}`} src={InstituteLogin.instituteLogo} />
                        </div>
                    }
                />}
        </>
    )
}

export default Institute