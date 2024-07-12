import { Navigate } from "react-router-dom";

const PublicRoute = ({ children, isLogged }) => {
    return isLogged ? <Navigate to="/app/home" /> : children
}

export default PublicRoute;