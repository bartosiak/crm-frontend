import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
    const token = localStorage.getItem("token");
    const isAuth = !!token;
    const navigate = useNavigate();

    useEffect(() => {
        if (!isAuth) {
            navigate("/login");
        }
    }, [isAuth, navigate]);

    if (!isAuth) {
        return null;
    }

    return children;
};
