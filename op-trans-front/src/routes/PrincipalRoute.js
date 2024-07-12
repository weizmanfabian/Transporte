import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
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

                <Route
                    path="/"
                    element={
                        isLogged ? <Navigate to="/app/home" /> : <Navigate to="/auth/login" />
                    }
                />

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
