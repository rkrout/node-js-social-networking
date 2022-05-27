import { Navigate, Outlet } from "react-router-dom";

export default function RequireNotAuth() {
    if (localStorage.getItem('accessToken')) {
        return <Navigate to="/" replace />
    } else {
        return <Outlet />
    }
}