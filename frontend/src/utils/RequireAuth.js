import { Navigate } from 'react-router-dom'

export default function RequireAuth({ children }) {
    return children
    if (localStorage.getItem('token')) 
    {
        return children
    } 
    else 
    {
        return <Navigate to="login" replace />
    }
}