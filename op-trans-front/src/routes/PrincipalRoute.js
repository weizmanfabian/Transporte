import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AplicationRoute from "./AplicationRoute";
import AuthRoute from "./AuthRoute";
import PrivateRoute from "./PrivateRoute";
import PublicRoute from "./PublicRoute";

//router principal
const PrincipalRoute = () => {

    const isLogged = true;

    return (
        <BrowserRouter>
            <Routes>

                {/* rutas públicas */}
                <Route
                    path="/auth/*"
                    element={
                        <PublicRoute isLogged={isLogged}>
                            <AuthRoute />
                        </PublicRoute>
                    }
                />

                {/* rutas privadas */}
                <Route
                    path="/app/*"
                    element={
                        <PrivateRoute isLogged={isLogged}>
                            <AplicationRoute />
                        </PrivateRoute>
                    }
                />
            </Routes>

        </BrowserRouter>
    );
}

export default PrincipalRoute;