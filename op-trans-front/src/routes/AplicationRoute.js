import { Route, Routes } from "react-router-dom";
import HomeApp from "../pages/Home.js";
import Navbar from "../components/Navbar.js"
import RegistrarManifiesto from "../components/RegistrarManifiesto.js";

const AplicationRoute = ({ user, setUser }) => {
    return (
        <>
            <Navbar user={user} setUser={setUser} />
            <Routes>
                <Route path="/home" element={<HomeApp user={user} />} />
                <Route path="/registrar" element={<RegistrarManifiesto />} />
                <Route path="/registrar/:idManifiesto" element={<RegistrarManifiesto />} />
            </Routes>
        </>
    );
}

export default AplicationRoute;