import { CS_DataTable, CS_PageLoader } from '../../../Components'
// import { GridRowsProp } from '@mui/x-data-grid';
import { useSelector } from 'react-redux';
import { Button, Typography } from '@mui/material';
import { Route, Routes, useNavigate, useParams } from 'react-router-dom';
import {  NotFound } from '../..';

const StudentList = () => {
  let Navigate = useNavigate()
  let Params: any = useParams()
  function ClickHandler(value: any) {
    Navigate(`${value.id}`)
  }
  const TableHeadingData: any[] = [
    {
      field: 'name',
      headerName: "Students Name's",
      disableColumnMenu: true,
      align: "center",
      flex: 3,
      headerAlign: "center",
      editable: false
    },
    {
      field: 'FatherName',
      headerName: "Father Name",
      disableColumnMenu: true,
      align: "center",
      flex: 3,
      headerAlign: "center",
      editable: false
    },
    {
      field: 'Course',
      headerName: "Course",
      disableColumnMenu: true,
      align: "center",
      flex: 3,
      headerAlign: "center",
      editable: false
    },
    {
      field: 'Details',
      headerName: "See Details",
      disableColumnMenu: true,
      align: "center",
      flex: 3,
      renderCell: (params: any) => (<Button variant='outlined' onClick={() => ClickHandler(params.value)}>See Details</Button>),
      headerAlign: "center",
      editable: false
    },

  ]
  const TableStyleObj = {
    border: "1px solid #88888890",
    height: "fit-content",
    "& ::-webkit-scrollbar": { width: 0 },
    "& .MuiDataGrid-sortIcon": { color: "#fff", },
    "& .css-1y9fprk-MuiDataGrid-root": { height: "0", },
    "& .MuiDataGrid-columnHeader": {
      background: "#221f1f",
      color: "#fff",
      ":focus-within , :focus":
        { outline: "none" },
    },
  }
  let Insdata = useSelector((state: any) => state.institute.Institutes.Data)
  let Students: any = Insdata.Students ? Object.values(Insdata.Students) : null
  let StudentDetails = Insdata.Students ? Insdata.Students[Params["*"]] : null
  let data: any[] = Students?.map((x: any, i: number) => ({
    id: i,
    name: x.UserName,
    FatherName: x.FatherName,
    Course: x.Course,
    Details: x
  }))

  return (
    <Routes>
      <Route path='/' element={
        <div>
          <h1 className="text-3xl my-5 font-semibold ">Student list</h1>
          {Students ? !data ? <CS_PageLoader /> :
            <CS_DataTable StyleObj={TableStyleObj} TableRowsData={data} ColHeadings={TableHeadingData} />
            : <>
              <div className='flex text-center  flex-col gap-5 mt-[30%] justify-center items-center'>
                <h1 className='font-semibold md:text-3xl'>😕 No Student Register Here 😕 </h1>
                <Typography fontFamily="monospace" variant="caption" className="my-2 text-center">No Student Data Found In This Institute</Typography>
              </div>
            </>}
        </div>} />
      <Route path='*' element={<>
        {!StudentDetails ? <NotFound /> : <>
          <h1 className="text-3xl my-5 font-semibold ">Student Details</h1>
          <div className='container rounded-md shadow:lg bg-white p-5 '>
            <h1 className="text-3xl my-5 font-semibold text-center bg-gray-900 rounded text-white py-5">{StudentDetails.UserName}</h1>
            <table className='border w-full '>
              <tbody>
                <tr className="odd:bg-gray-100"><td className="p-2">{"Student Name "}</td><td className="p-2">{StudentDetails.UserName}</td></tr>
                <tr className="odd:bg-gray-100"><td className="p-2">{"Father Name "}</td><td className="p-2">{StudentDetails.FatherName}</td></tr>
                <tr className="odd:bg-gray-100"><td className="p-2">{"Contact "}</td><td className="p-2">{StudentDetails.Contact}</td></tr>
                <tr className="odd:bg-gray-100"><td className="p-2">{"CNIC No "}</td><td className="p-2">{StudentDetails.CNICNo}</td></tr>
                <tr className="odd:bg-gray-100"><td className="p-2">{"Last Qualification "}</td><td className="p-2">{StudentDetails.Lastqualification}</td></tr>
                <tr className="odd:bg-gray-100"><td className="p-2">{"Course "}</td><td className="p-2">{StudentDetails.Course}</td></tr>
                <tr className="odd:bg-gray-100"><td className="p-2">{"Institute "}</td><td className="p-2">{StudentDetails.institute}</td></tr>
                <tr className="odd:bg-gray-100"><td className="p-2">{"Section "}</td><td className="p-2">{StudentDetails.Section}</td></tr>
                <tr className="odd:bg-gray-100"><td className="p-2">{"Email "}</td><td className="p-2">{StudentDetails.Email}</td></tr>
                <tr className="odd:bg-gray-100"><td className="p-2">{"Password "}</td><td className="p-2">{StudentDetails.Password}</td></tr>
                <tr className="odd:bg-gray-100"><td className="p-2">{"Country "}</td><td className="p-2">{StudentDetails.Country}</td></tr>
                <tr className="odd:bg-gray-100"><td className="p-2">{"City "}</td><td className="p-2">{StudentDetails.City}</td></tr>
                <tr className="odd:bg-gray-100"><td className="p-2">{"Gender "}</td><td className="p-2">{StudentDetails.Gender}</td></tr>
                <tr className="odd:bg-gray-100"><td className="p-2">{"Address "}</td><td className="p-2">{StudentDetails.Address}</td></tr>
              </tbody>
            </table>
          </div>
        </>
        }
      </>}
      />
    </Routes>
  )
}

export default StudentList