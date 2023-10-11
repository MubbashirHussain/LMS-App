import { CS_Input, CS_Select } from "../../Components";
import React from "react"
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { isUserLogin, FirebaseGetData, FirebaseSetData, FirebaseSignup } from "../../config/Firebase/firebaseMethords";
import { Link, useNavigate } from "react-router-dom";


function Signup() {
    const [SignupData, setSData] = React.useState<any>({ Email: "", Password: "", Role: "user" })
    // const [FormError, setFormError] = React.useState<null | string>(null)
    const [passwordError, setPasswordError] = React.useState<boolean>(false)
    const [EmailError, setEmailError] = React.useState<boolean>(false)
    let Navigate = useNavigate()
    const inputEvent = (e: any) => {
        if (e.target.value.length > 0 && e.target.name === "Password") setPasswordError(false)
        if (e.target.value.length > 0 && e.target.name === "Email") setEmailError(false)
        setSData({ ...SignupData, [e.target.name]: e.target.value })
    }
    React.useEffect(() => {
        isUserLogin()
            .then((user: any) => {
                FirebaseGetData(`user/${user.uid}`)
                    .then((res: any) => res.Role === "admin" ? Navigate(`admin`) : Navigate("/quiz"))
            })
            .catch(() => { Navigate('/signup') })
    }, [])
    let clickHandler = () => {
        if (SignupData.Email === "") { setEmailError(true) }
        else if (!SignupData.Email.includes("@")) { setEmailError(true) }
        else if (SignupData.Email.includes(" ")) { setEmailError(true) }
        else if (SignupData.Password === "") { setPasswordError(true) }
        else FirebaseSignup(SignupData).then((res: any) => {
            // console.log(res.res.user.uid)
            FirebaseSetData("user", res.UserData, res.res.user.uid)
            alert("You'er Sign up Successfully")
            Navigate("/quiz")
            setSData({ Email: "", Password: "" });
        }).catch((er: any) => {
            console.log(er)
            setEmailError(true);
            setPasswordError(true);
            // setFormError(er.code.split("/")[1].split("-").join(" "))
        })
    }
    return (
        <>
            <div className="bg-gradient-radial from-transparent from-0% via-gray-50 via-50% to-transparent to-100% min-h-screen flex items-center  justify-center">
                <Container maxWidth="sm" className="flex rounded flex-column drop-shadow-md p-5 py-7 bg-white justify-center items-between" >
                    <div className="">

                        <h1 className="text-5xl my-3 text-center">Signup</h1>
                        <CS_Input
                            Required={true}
                            sx={{ margin: "20px 0" }}
                            label="User Name"
                            Name="UserName"
                            type="text"
                            Margin="dense"
                            fullWidth={true}
                            onChangeEvt={(e: any) => inputEvent(e)}
                        />
                        <CS_Input
                            Required={true}
                            sx={{ margin: "20px 0" }}
                            label="Email"
                            Name="Email"
                            Error={EmailError}
                            Margin="dense" type="email" fullWidth={true}
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

                        <CS_Select
                            label="Role"
                            Options={[{ value: "user", text: "User" }, { value: "admin", text: "Admin" }]}
                            Readonly={true}
                            Selected={"user"}
                            fullWidth={true}
                            Size="medium"

                        />


                        <CS_Input
                            Required={true}
                            sx={{ margin: "20px 0" }}
                            ClassName="my-3"
                            Margin="dense"
                            label="Full Name"
                            Name="FullName"
                            type="0"
                            fullWidth={true}
                            onChangeEvt={(e: any) => inputEvent(e)}
                        />
                        <div className="flex flex-col gap-5 my-5">
                            {/* {FormError && <Typography variant="body2" className="text-center capitalize my-5" sx={{ my: 3 }} color="error">{FormError}</Typography>} */}
                            <Button variant="contained" onClick={clickHandler}>Sign up</Button>
                            <Link to="/login" className="text-blue-500 self-center">I Already have account Login</Link>
                        </div>
                    </div>
                </Container>

            </div>

        </>
    )
}
export default Signup;