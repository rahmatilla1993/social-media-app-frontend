import {Outlet, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {selectUser} from "../redux/slices/auth";

function ProtectedRoute() {

    const user = useSelector(selectUser)
    const navigate = useNavigate()

    useEffect(() => {
        if (!user) {
            navigate('/login')
        }
    }, []);

    return (
        <>
            {user && <Outlet/>}
        </>
    )
}

export default ProtectedRoute