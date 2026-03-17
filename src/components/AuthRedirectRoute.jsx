import { Navigate } from "react-router-dom";
import { useAuth } from '../context/AuthContext'

export default function AuthRedirectRoute({children}){
    const {user, role, loading} = useAuth();

    if(loading) return null;
    if(user && role === 'worker') return <Navigate to='/home-worker' replace />
    if(user && role === 'client') return <Navigate to='/home-customer' replace />

    return children;
}