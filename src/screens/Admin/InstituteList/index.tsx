import { CS_DataTable, CS_PageLoader } from '../../../Components'
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import React from 'react';
import { FetchInstituteFromAdmin } from '../../../config/Redex/reducers/AdminSlice';
import { Typography } from '@mui/material';



const TableHeadingData: any[] = [
  {
    field: 'Logo',
    headerName: "Logo",
    disableColumnMenu: true,
    align: "center",
    flex: 1,
    renderCell: (params: any) => <img className='w-[50px] p-2 object-cover rounded-full h-[50px]' src={params.value} />,
    headerAlign: "center",
    editable: false
  },
  {
    field: 'name',
    headerName: "Institute Name's",
    disableColumnMenu: true,
    align: "center",
    flex: 3,
    headerAlign: "center",
    editable: false
  },

  {
    field: 'NoOfCampus',
    headerName: "No Of Campus",
    disableColumnMenu: true,
    maxWith: 20,
    flex: 2,
    align: "center",
    type: "number",
    headerAlign: "center",
    editable: false,
  },
  {
    field: 'status',
    headerName: "Active/InActive",
    disableColumnMenu: true,
    align: "center",
    flex: 2,
    type: "text",
    renderCell: (params: any) => <span >{params.value ? <li className="marker:text-green-500 marker:font-extrabold">Active</li> : <li className="marker:text-red-500 marker:font-extrabold">inActive</li>}</span>,
    headerAlign: "center",
    editable: false,
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
type AppDispatch = ThunkDispatch<{ a: string }, any, AnyAction>
const InstituteList = () => {
  let INdata = useSelector((state: any) => state.Admin.AdminData.Data)
  let instituteData: any[] | null = INdata ? Object.values(INdata) : null
  let dispatch: AppDispatch = useDispatch()
  let data: any[] | null | undefined = instituteData?.map((x: any, i: number) => ({
    id: i,
    name: x.InstituteName,
    Logo: x.instituteLogo,
    NoOfCampus: x.NoOfCampus,
    status: x.IsinstituteActive
  }))
  // console.log(INdata, "main ")
  // console.log(data, " data")
  // console.log(instituteData, " Insdata")
  React.useEffect(() => {
    dispatch(FetchInstituteFromAdmin("institute"))
  }, [])

  return (

    <div>
      <h1 className="text-3xl my-5 font-semibold ">Institute list</h1>
      {instituteData ? !data ? <CS_PageLoader /> :
        <CS_DataTable StyleObj={TableStyleObj} TableRowsData={data} ColHeadings={TableHeadingData} /> :
        <>
          <div className='flex text-center  flex-col gap-5 mt-[30%] justify-center items-center'>
            <h1 className='font-semibold md:text-3xl'>😕 No Institute Registered😕 </h1>
            <Typography fontFamily="monospace" variant="caption" className="my-2 text-center">Please Register Any Institute Then Institute List will Shown Here</Typography>
          </div>
        </>
      }    </div>
  )
}

export default InstituteList