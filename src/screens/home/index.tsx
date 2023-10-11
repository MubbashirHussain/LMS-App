import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";

function Home() {
    let Navigate = useNavigate()
    return (
        <>
            <div className="flex justify-center items-center min-h-screen flex-col">
                <div className="max-w-md flex flex-col">
                    <h1 className="text-3xl text-center">This page in under Constraction 🏗️</h1>
                    <div className="my-5">
                        <li className="marker:content-['🚧']"> Some Changes in Admin Drawer</li>
                        <li className="marker:content-['🚧']"> Time Duration On Quiz</li>
                        <li className="marker:content-['🚧']"> Quiz Given by URL</li>
                        <li className="marker:content-['🚧']"> Private Quiz</li>
                        <li className="marker:content-['🚧']"> Secret key</li>
                    </div>
                    <Button variant="contained" color="warning" className="self-center" onClick={() => Navigate("/quiz")}>GO Forwrd</Button>
                </div>
            </div>
        </>
    )
}
export default Home;
