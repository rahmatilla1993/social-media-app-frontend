import React from "react";
import Button from "@mui/material/Button";

import styles from "./Header.module.scss";
import Container from "@mui/material/Container";
import {Link, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {logout, selectUser} from "../../redux/slices/auth";

export const Header = () => {
    const user = useSelector(selectUser)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const signOut = () => {
        if (window.confirm('Siz rostdan ham tizimdan chiqmoqchimisiz?')) {
            dispatch(logout())
            navigate('/login')
            window.localStorage.removeItem('auth-token')
        }
    }

    return (
        <div className={styles.root}>
            <Container maxWidth="lg">
                <div className={styles.inner}>
                    <Link className={styles.logo} to="/">
                        <div>SOCIAL MEDIA</div>
                    </Link>
                    <div className={styles.buttons}>
                        {user ? (
                            <>
                                <Link to="/main/add-post">
                                    <Button variant="contained">Maqola yozish</Button>
                                </Link>
                                <Link to="/main/profile">
                                    <Button variant="outlined">Profilga o'tish</Button>
                                </Link>
                                <Button onClick={signOut} variant="contained" color="error">
                                    Chiqish
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="outlined">Kirish</Button>
                                </Link>
                                <Link to="/register">
                                    <Button variant="contained">Ro'yxatdan o'tish</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </Container>
        </div>
    );
};
