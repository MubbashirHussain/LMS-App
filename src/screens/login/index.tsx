import { CS_Input, CS_PageLoader } from "../../Components";
import React from "react"
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { FirebaseLogin } from "../../config/Firebase/firebaseMethords";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";


// type state = { a: string }
// type AppDispatch = ThunkDispatch<state, any, AnyAction>


function Login() {
    const [inpVal, setinpVal] = React.useState<any>({ Email: "", Password: "" })
    const [FormError, setFormError] = React.useState<null | string>(null)
    const [passwordError, setPasswordError] = React.useState<boolean>(false)
    const [EmailError, setEmailError] = React.useState<boolean>(false)
    let UserLogined = useSelector((state: any) => state.User.UserLogin)

    // let dispatch: AppDispatch = useDispatch()
    React.useEffect(() => {
        if (UserLogined && UserLogined.Usertype) { Navigate("/checkLogin") }
    }, [UserLogined])
    
    let Navigate = useNavigate()
    const inputEvent = (e: any) => {
        if (e.target.value.length > 0 && e.target.name === "Password") setPasswordError(false)
        if (e.target.value.length > 0 && e.target.name === "Email") setEmailError(false)
        setinpVal({ ...inpVal, [e.target.name]: e.target.value })

    }
    let clickHandler = () => {
        if (inpVal.Password === "" && inpVal.Email === "") { setEmailError(true), setPasswordError(true) }
        if (inpVal.Email === "") { setEmailError(true) }
        else if (!inpVal.Email.includes("@")) { setEmailError(true) }
        else if (inpVal.Email.includes(" ")) { setEmailError(true) }
        else if (inpVal.Password === "") { setPasswordError(true) }
        else FirebaseLogin(inpVal).then(() => { Navigate("/checkLogin") })
            .catch((er) => setFormError(er.er.code.split("/")[1].split("-").join(" ")))
    }
    return (
        <>
            {UserLogined === "pending" ? <CS_PageLoader /> :
                <div className="bg-gradient-radial from-transparent from-0% via-gray-50 via-50% to-transparent to-100% min-h-screen flex items-center  justify-center">
                    <Container maxWidth="sm" className="flex rounded flex-column drop-shadow-md p-5 py-7 bg-white justify-center items-between" >
                        <div className="">

                            <h1 className="text-5xl my-3 text-center">Login</h1>
                            <CS_Input
                                Required={true}
                                label="Email"
                                Margin="dense"
                                Name="Email"
                                type="email"
                                fullWidth={true}
                                Error={EmailError}
                                sx={{ margin: "20px 0" }}
                                onChangeEvt={(e: any) => inputEvent(e)}
                            />

                            <CS_Input
                                Required={true}
                                sx={{ margin: "20px 0" }}
                                ClassName="my-3"
                                Margin="dense"
                                label="Password"
                                Name="Password"
                                type="password"
                                fullWidth={true}
                                Error={passwordError}
                                onChangeEvt={(e: any) => inputEvent(e)}
                            />
                            <div className="flex flex-col gap-5 my-5">
                                {FormError && <Typography variant="body2" className="text-center capitalize my-5" sx={{ my: 3 }} color="error">{FormError}</Typography>}
                                <Button variant="contained" onClick={clickHandler}>Login</Button>
                                {/* <Link to="/signup" className="text-blue-500 self-center">I don't have account Signup</Link> */}
                            </div>
                        </div>
                    </Container>

                </div>}

        </>
    )
}
export default Login;