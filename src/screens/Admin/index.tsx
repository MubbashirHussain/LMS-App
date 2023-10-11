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
import InstituteList from "./InstituteList";
import { useSelector } from "react-redux";
import InstituteForm from "./InstituteFrom";
import UserRegsitration from "./UserRegistration";

function Logout() {
    let Navigate = useNavigate()
    React.useEffect(() => {
        FirebaseLogout()
        Navigate("/login")
    }, [])
    return (<><h1>13</h1></>)
}

let Defaultdata = {
    NavList: [
        {
            Heading: "Institute",
            Components: [
                { route: "InstituteList", text: "Institute List", Icon: <PlaylistAddCheckIcon />, RouteComponent: <InstituteList /> },
                { route: "InstituteForm", text: "Institute Form", Icon: <InsertDriveFileOutlinedIcon />, RouteComponent: <InstituteForm /> },
                // { route: "InstituteSubmitions", text: "Institute Submitions", Icon: <FormatIndentIncreaseIcon />, RouteComponent: <>Submition</> },
            ]
        },
        {
            Components: [
                { route: "UserRegister", text: "User Register", Icon: <PersonAddAltIcon />, RouteComponent: <UserRegsitration /> },
                { route: "ColorThemeSet", text: "Color Theme Set", Icon: <PaletteOutlinedIcon />, RouteComponent: <>Color</> },
                { route: "ActivationPayment", text: `Activation \n and payment details`, Icon: <AddCardIcon />, RouteComponent: <>Activation payment details</> },
            ]
        },
    ],
    BottomNav: [
        { route: "logout", text: "Logout", Icon: <LogoutIcon />, RouteComponent: <Logout /> },
    ]
}


const Admin = () => {

    let UserLogined = useSelector((state: any) => state.User.UserLogin)
    let Navigate = useNavigate()

    React.useEffect(() => {
        UserLogined.Usertype ? (UserLogined.Usertype != "admin" ? Navigate("/login") : null) : UserLogined === "NoUserLogin" ? Navigate("/login") : null
    }, [UserLogined])



    return (
        <>
            {UserLogined.Usertype != "admin" ? <CS_PageLoader /> :
                <CS_Drawer
                    CompPathName="/admin"
                    NavListArray={Defaultdata}
                    NavConfig={{}}
                    Logo={
                        <div className="flex justify-center items-center">
                            <Avatar className="text-center" sx={{ bgcolor: blue[500], height: 42, width: 42, fontSize: "1.5rem" }} alt={UserLogined.UserName} src="./" />
                        </div>
                    }
                />}
        </>
    )
}

export default Admin