import CircularProgress from '@mui/material/CircularProgress';


type PageLoaderProps = {
  PreColor?: "error" | "info" | "inherit" | "success" | "primary" | "secondary" | "warning",
  Variant?: "determinate" | "indeterminate",
  sx?: React.CSSProperties,
  ClassName?: string,
}


const PageLoader = (props: PageLoaderProps) => {
  const { PreColor, Variant, sx, ClassName } = props
  return (
    <div className="h-screen flex justify-center items-center"><CircularProgress color={PreColor} variant={Variant} sx={sx} className={ClassName} /></div>
  )
}

type LoaderProps = {
  PreColor?: "error" | "info" | "inherit" | "success" | "primary" | "secondary" | "warning",
  Variant?: "determinate" | "indeterminate",
  sx?: React.CSSProperties,
  ClassName?: string,
}

const Loader = (props: LoaderProps) => {
  const { PreColor, Variant, sx, ClassName } = props
  return (
    <CircularProgress color={PreColor} sx={sx} variant={Variant} className={ClassName} />
  )
}


export { Loader }
export default PageLoader