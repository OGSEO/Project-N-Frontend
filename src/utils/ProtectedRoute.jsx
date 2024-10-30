import { Outlet, Navigate } from 'react-router-dom'
import ApiService from "../service/ApiService.js";

export default function ProtectedRoute() {
    let isLoggedIn = ApiService.isAutheticated();
    return (
        isLoggedIn ? (
            <Outlet />
        )  : (
            <Navigate to="login" />
        )
    )
}