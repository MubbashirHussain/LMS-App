import { Routes, Route } from "react-router-dom"
import { Home, Login, NotFound, SignUp, ProtectedRoute, Admin, Institute, Student } from "../../screens";

function AppRouter() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/checkLogin" element={<ProtectedRoute/>} />
                <Route path="/institute/*" element={<Institute />} />
                <Route path="/admin/*" element={<Admin />} />
                <Route path="/student/*" element={<Student />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
        </>
    )
}
export default AppRouter;