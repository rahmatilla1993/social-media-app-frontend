import Container from "@mui/material/Container";

import {Header} from "./components";
import {AddPost, FullPost, Home, Login, Registration} from "./pages";
import {Navigate, Route, Routes} from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoute";
import {useDispatch} from "react-redux";
import {fetchAuthMe} from "./redux/slices/auth";
import {useEffect} from "react";
import Notification from "./components/Notification";

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        if (window.localStorage.getItem('auth-token'))
            dispatch(fetchAuthMe())
    }, []);

    return (
        <>
            <Header/>
            <Container maxWidth="lg">
                <Notification/>
                <Routes>
                    <Route index element={<Navigate to={'/main'} replace/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/register'} element={<Registration/>}/>
                    <Route path={'/main'} element={<ProtectedRoute/>}>
                        <Route path={''} element={<Home/>}/>
                        <Route path={'profile'} element={<Registration />}/>
                        <Route path={'posts/:id'} element={<FullPost/>}/>
                        <Route path={'add-post'} element={<AddPost/>}/>
                        <Route path={'edit-post/:id'} element={<AddPost/>}/>
                    </Route>
                </Routes>
            </Container>
        </>
    );
}

export default App;
