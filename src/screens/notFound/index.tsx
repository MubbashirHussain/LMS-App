import { Typography } from "@mui/material";

function NotFound() {
    return (
        <>
            <div className="min-h-screen flex flex-col justify-center items-center gap-2 NotFound404">
                <Typography fontFamily="Lobster" variant="h1">404</Typography>
                <Typography fontFamily="Lobster" variant="h3">Not Found</Typography>
                <Typography fontFamily="monospace" variant="caption" className="my-2 text-center">This page is Not Found. <br/> Please Check Path and put again <br/> This is not a Valid Path</Typography>
            </div>
        </>
    )
}
export default NotFound;