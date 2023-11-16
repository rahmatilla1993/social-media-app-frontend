import Container from "@mui/material/Container";

import {Header} from "./components";
import {AddPost, FullPost, Home, Login, Registration} from "./pages";
import {Route, Routes} from "react-router-dom";
import {useDispatch} from "react-redux";
import {fetchAuthMe} from "./redux/slices/auth";
import {useEffect} from "react";

function App() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchAuthMe())
    }, []);

    return (
        <>
            <Header/>
            <Container maxWidth="lg">
                <Routes>
                    <Route path={'/'} element={<Home/>}/>
                    <Route path={'/posts/:id'} element={<FullPost/>}/>
                    <Route path={'/add-post'} element={<AddPost/>}/>
                    <Route path={'/login'} element={<Login/>}/>
                    <Route path={'/register'} element={<Registration/>}/>
                    <Route path={'*'} element={<h1>Not found</h1>}/>
                </Routes>
            </Container>
        </>
    );
}

export default App;
