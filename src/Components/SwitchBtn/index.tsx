import Switch from '@mui/material/Switch';

const label = { inputProps: { 'aria-label': 'Switch demo' } };

type Props ={
    defaultChecked?: boolean,
    onChangeEvt:CallableFunction
    PreColors?:  "primary" | "secondary" | "error" | "info" | "success" | "warning" | "default"
}

export default function BasicSwitches(props:Props) {
    const { defaultChecked ,onChangeEvt ,PreColors} = props
   
  return (
      <Switch  {...label}  color={PreColors} checked={defaultChecked && defaultChecked} onChange={(e)=>onChangeEvt(e.target.checked)} /> 
  );
}                                                                                                                                                                                                                                                               