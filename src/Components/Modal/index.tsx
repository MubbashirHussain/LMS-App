import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
let style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: 500,
    display : "none"
};


type Props = {
    ChildComponent: React.ReactElement
    OpenState: { State?: boolean, StateSetFx?: CallableFunction }
}
export default function KeepMountedModal(props: Props) {
    const { ChildComponent, OpenState } = props
    const handleClose = () => OpenState?.StateSetFx && OpenState.StateSetFx(false)
    style.display = OpenState.State ? "block" : "none"
    return (
        <div>
            <Modal
                keepMounted
                open={OpenState.State ?? false}
                onClose={handleClose}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
            >
                <Box sx={style}>
                    {ChildComponent ?? null}
                </Box>
            </Modal>
        </div>
    );
}