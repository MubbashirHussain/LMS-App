import * as React from 'react';
import Box from '@mui/material/Box';
// import Button from '@mui/material/Button';
// import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import SaveIcon from '@mui/icons-material/Save';
import CancelIcon from '@mui/icons-material/Close';
import {
    GridRowsProp,
    GridRowModesModel,
    GridRowModes,
    DataGrid,
    GridColDef,
    // GridToolbarContainer,
    GridActionsCellItem,
    GridEventListener,
    GridRowId,
    GridRowModel,
    GridRowEditStopReasons,
} from '@mui/x-data-grid';
// import { randomId } from "@mui/x-data-grid-generator";

// interface EditToolbarProps {
//     setRows: (newRows: (oldRows: GridRowsProp) => GridRowsProp) => void;
//     setRowModesModel: (
//         newModel: (oldModel: GridRowModesModel) => GridRowModesModel,
//     ) => void;
// }

// function EditToolbar(props: EditToolbarProps) {
//     const { setRows, setRowModesModel } = props;

//     const handleClick = () => {
//         const id = randomId();
//         setRows((oldRows) => [...oldRows, { id, name: '', age: '', isNew: true }]);
//         setRowModesModel((oldModel) => ({
//             ...oldModel,
//             [id]: { mode: GridRowModes.Edit, fieldToFocus: 'name' },
//         }));
//     };

//     return (
//         <GridToolbarContainer>
//             <Button color="primary" startIcon={<AddIcon />} onClick={handleClick}>
//                 Add New record
//             </Button>
//         </GridToolbarContainer>
//     );
// }

type Props = {
    ColHeadings: GridColDef[],
    TableRowsData: GridRowsProp,
    StyleObj?: {}
}


export default function FullFeaturedCrudGrid(props: Props) {
    const { ColHeadings, TableRowsData, StyleObj } = props

    const [rows, setRows] = React.useState(TableRowsData);
    const [rowModesModel, setRowModesModel] = React.useState<GridRowModesModel>({});


    React.useEffect(() => {
        setRows(TableRowsData)
    }, [TableRowsData])

    const handleRowEditStop: GridEventListener<'rowEditStop'> = (params: any, event: any) => {
        if (params.reason === GridRowEditStopReasons.rowFocusOut) {
            event.defaultMuiPrevented = true;
        }
    };

    const handleEditClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
    };

    const handleSaveClick = (id: GridRowId) => () => {
        setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
    };

    const handleDeleteClick = (id: GridRowId) => () => {
        setRows(rows.filter((row: any) => row.id !== id));
    };

    const handleCancelClick = (id: GridRowId) => () => {
        setRowModesModel({
            ...rowModesModel,
            [id]: { mode: GridRowModes.View, ignoreModifications: true },
        });

        const editedRow = rows.find((row) => row.id === id);
        if (editedRow!.isNew) {
            setRows(rows.filter((row) => row.id !== id));
        }
    };

    const processRowUpdate = (newRow: GridRowModel) => {
        const updatedRow = { ...newRow, isNew: false };
        setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
        return updatedRow;
    };

    const handleRowModesModelChange = (newRowModesModel: GridRowModesModel) => {
        setRowModesModel(newRowModesModel);
    };


    const arr: GridColDef[] = ColHeadings;
    let arr2 = arr.findIndex((x: any) => x.type === "actions")
    if (arr2 >= 0) {
        let arr3 = {
            ...arr[arr2],
            getActions: (p: any) => {
                const { id } = p
                const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;

                if (isInEditMode) {
                    return [
                        <GridActionsCellItem
                            icon={<SaveIcon />}
                            label="Save"
                            sx={{
                                color: 'primary.main',
                            }}
                            onClick={handleSaveClick(id)}
                        />,
                        <GridActionsCellItem
                            icon={<CancelIcon />}
                            label="Cancel"
                            className="textPrimary"
                            onClick={handleCancelClick(id)}
                            color="inherit"
                        />,
                    ];
                }

                return [
                    <GridActionsCellItem
                        icon={<EditIcon />}
                        label="Edit"
                        className="textPrimary"
                        onClick={handleEditClick(id)}
                        color="inherit"
                    />,
                    <GridActionsCellItem
                        icon={<DeleteIcon />}
                        label="Delete"
                        onClick={handleDeleteClick(id)}
                        color="inherit"
                    />,
                ];
            },
        }
        arr.splice(arr2, 1, arr3)
    }

    const columns: GridColDef[] = [...arr];
    return (
        <Box
            sx={{
                height: 500,
                width: '100%',
                '& .actions': { color: 'text.secondary', },
                '& .textPrimary': { color: 'text.primary', },
            }}
        >
            <DataGrid sx={StyleObj}
                rows={rows}
                columns={columns}
                editMode="row"
                rowModesModel={rowModesModel}
                onRowModesModelChange={handleRowModesModelChange}
                onRowEditStop={handleRowEditStop}
                processRowUpdate={processRowUpdate}
                hideFooter
            />
        </Box>
    );
}
