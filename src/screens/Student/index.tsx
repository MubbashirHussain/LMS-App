import { FirebaseLogout } from "../../config/Firebase/firebaseMethords"
import { Button } from "@mui/material"

const Student = () => {
    return (<>
        <div>Student</div>
        <Button variant="contained" onClick={() => FirebaseLogout()}>Logout</Button>
    </>
    )
}

export default Student