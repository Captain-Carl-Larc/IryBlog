import { Children } from "react";
import { useAuth } from "../context/AuthContext";
import { Navigate } from "react-router-dom";


const protectedRoute = ({Children}){
    const {loading,isAuthenticated} = useAuth()

    if(loading){
        return <p>loading...</p>
    }

    if (isAuthenticated) {
        return Children
    }else{
        return <Navigate to={'/login'} replace/>
    }
}