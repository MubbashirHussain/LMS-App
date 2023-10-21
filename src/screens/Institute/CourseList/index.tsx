import Container from '@mui/material/Container';
import { Route, Routes, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { CS_Card } from "../../../Components";
import { Typography } from '@mui/material';


function CourseList() {
    let InstitutesData = useSelector((state: any) => state.institute.Institutes.Data)
    let Courses: any[] | null = InstitutesData.Course ? Object.values(InstitutesData.Course) : null
    let Navigate = useNavigate()
    return (

        <>
            <Routes>
                <Route path='/' element={<>
                    <Container maxWidth="md" className="bg-gray-100 min-w-full">
                        <div className="flex items-center flex-col">
                            <h1 className="text-4xl font-semibold my-8 self-start">Course List </h1>
                            <div className="flex justify-center items-center flex-wrap gap-10">
                                {Courses ? Courses?.map((x: any, i: number) => <CS_Card
                                    ClassName="shadow-md cursor-pointer" key={i}
                                    onCardClick={() => { Navigate(`${x.CourseName.split(" ").join('')}`) }}
                                    Data={{
                                        title: x.CourseName, description: x.Disciption, BottomComp: <div className="flex w-full justify-end">
                                            <p className="px-3 font-semibold text-sm uppercase">Duration <span className='text-blue-500'>{x.Duration}</span></p>
                                        </div>
                                    }} />
                                ) : <>
                                    <div className='flex text-center  flex-col gap-5 mt-[30%] justify-center items-center'>
                                        <h1 className='font-semibold md:text-3xl'>😕 No Courses Available Here 😕 </h1>
                                        <Typography fontFamily="monospace" variant="caption" className="my-2 text-center">Please Add Any Course The Course List will Shown Here</Typography>
                                    </div>
                                </>}

                            </div>
                        </div>
                    </Container>
                </>} />
            </Routes>
        </>
    )
}
export default CourseList;


