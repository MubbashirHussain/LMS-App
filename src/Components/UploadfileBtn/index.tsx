import React from "react"
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});
type Props = {
  label: string | React.ReactElement,
  ClassName?: string,
  sx?: React.CSSProperties | any,
  accept?: string
  Name?: string
  onChangeEvt?: CallableFunction
}
export default function InputFileUpload(props: Props) {
  const { ClassName, sx, label, accept, Name, onChangeEvt } = props
  return (
    <Button className={ClassName} sx={sx} component="label" variant="contained" startIcon={<CloudUploadIcon />}>
      <>
        {label}
      </>
      <VisuallyHiddenInput onChange={(e) => { onChangeEvt && onChangeEvt(e) }} name={Name} type="file" accept={accept} />
    </Button>
  );
}