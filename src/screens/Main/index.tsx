import React from "react";
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Logout from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
import { isUserLogin ,  FirebaseGetData, FirebaseLogout } from "../../config/Firebase/firebaseMethords";
import { CS_Card, CS_PageLoader } from "../../Components";


function Quiz() {
    let [Quizes, setQuizes] = React.useState<any[]>([])
    let Navigate = useNavigate()
    React.useEffect(() => {
        isUserLogin().then(()=>{
            FirebaseGetData("qiuzList/")
                .then((res: any) => { console.log(setQuizes(Object.values(res))) })
                .catch((er: any) => { console.log(er) })
            }).catch(()=>Navigate("/login"))
    }, [])

    return (
        Quizes.length === 0  ? <CS_PageLoader /> :
            <>
                <Container maxWidth="md" className="bg-gray-100 p-10 min-h-screen min-w-full">
                    <div className="flex"><Button startIcon={<span className="rotate-180"><Logout /></span>} className="self-end" variant="contained" onClick={() => FirebaseLogout().then(()=>Navigate("/login"))}>Logout</Button></div>
                    <div className="flex items-center flex-col">
                        <h1 className="text-4xl font-semibold my-8">Public Quiz</h1>
                        <div className="flex justify-center items-center flex-wrap gap-10">
                            {!Quizes ?  <CS_PageLoader /> :  Quizes.map((x: any, i: number) => {
                                return <CS_Card ClassName="shadow-md" key={i} Data={{ title: x.QuizInfo.QuizName, description: x.QuizInfo.QuizDescription, duration: x.QuizInfo.QuizDuration, Openstatus: x.QuizInfo.QuizOpen, ActionBtns: [<Button variant="contained" disabled={!x.QuizInfo.QuizOpen} onClick={() => { console.log(Navigate(`/quiz/${x.id}`)) }}>Start</Button>] }} />
                            })}
                        </div>
                    </div>
                </Container>

            </>
    )
}
export default Quiz;
