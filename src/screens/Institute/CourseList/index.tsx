import React from "react";
import Container from '@mui/material/Container';
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CS_Card } from "../../../Components";


function CourseList() {
    let UserLogined = useSelector((state: any) => state.User.UserLogin)
    let InstitutesData = useSelector((state: any) => state.institute.Institutes)
    let Courses = Object.values(InstitutesData[UserLogined.id].Course)
    let Navigate = useNavigate()
    React.useEffect(() => {
    }, [])

    return (

        <>
            <Container maxWidth="md" className="bg-gray-100 min-w-full">
                <div className="flex items-center flex-col">
                    <h1 className="text-4xl font-semibold my-8 self-start">Course List </h1>
                    <div className="flex justify-center items-center flex-wrap gap-10">
                        {Courses && Courses.map((x: any, i: number) => <CS_Card
                            ClassName="shadow-md cursor-pointer" key={i}
                            onCardClick={()=>{Navigate(`${x.CourseName.split(" ").join('')}`)}}
                            Data={{ title: x.CourseName, description: x.Disciption, duration: x.Duration, }} />
                        )}

                    </div>
                </div>
            </Container>

        </>
    )
}
export default CourseList;
