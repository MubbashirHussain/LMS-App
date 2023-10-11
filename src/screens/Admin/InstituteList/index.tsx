import { CS_DataTable ,CS_PageLoader } from '../../../Components'
// import { GridRowsProp } from '@mui/x-data-grid';
import { useDispatch, useSelector } from 'react-redux';
import { AnyAction, ThunkDispatch } from '@reduxjs/toolkit';
import { FetchInstitute } from '../../../config/Redex/reducers/instituteList';
import React from 'react';



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
  let INdata = useSelector((state: any) => state.institute.Institutes)
  let instituteData = Object.values(INdata)
  let dispatch: AppDispatch = useDispatch()
  let data: any[] = instituteData.map((x: any, i: number) => ({
    id: i,
    name: x.InstituteName,
    Logo: x.instituteLogo,
    NoOfCampus: x.NoOfCampus,
    status: x.IsinstituteActive
  }))
  console.log(data)
  React.useEffect(() => {
    dispatch(FetchInstitute("institute"))
  }, [])

  return (

    <div>
      <h1 className="text-3xl my-5 font-semibold ">Institute list</h1>
      {!data ? <CS_PageLoader /> :
        <CS_DataTable StyleObj={TableStyleObj} TableRowsData={data} ColHeadings={TableHeadingData} />
      }    </div>
  )
}

export default InstituteList