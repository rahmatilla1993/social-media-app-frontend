import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchUserData, selectIsAuth} from "../../redux/slices/auth";
import {useNavigate} from "react-router-dom";

export const Login = () => {

    const dispatch = useDispatch()
    const isAuth = useSelector(selectIsAuth)
    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'all'
    })

    if (isAuth) {
        navigate('/')
    }

    const onSubmit = async (values) => {
        const data = await dispatch(fetchUserData(values))

        if (!data.payload) {
            return alert('UnAuthorized')
        }

        if ('token' in data.payload) {
            window.localStorage.setItem('auth-token', data.payload.token)
        }
    }

    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Вход в аккаунт
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField
                    className={styles.field}
                    label="E-mail"
                    inputMode={'email'}
                    error={Boolean(errors.email?.message)}
                    helperText={errors.email?.message}
                    {...register('email', {
                        required: "Email maydoni bo'sh qolmasin",
                        pattern: {value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/, message: 'Emailga mos kelmadi'}
                    })}
                    fullWidth
                />
                <TextField
                    className={styles.field}
                    label="Password" fullWidth
                    inputMode={'text'}
                    error={Boolean(errors.password?.message)}
                    helperText={errors.password?.message}
                    {...register('password', {
                        required: "Password maydoni bo'sh qolmasin",
                        pattern: {
                            value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/,
                            message: "Kamida 4 ta belgi, katta va kichik harflar bo'lishi shart"
                        }
                    })}
                />
                <Button type={'submit'} size="large" variant="contained" fullWidth>
                    Войти
                </Button>
            </form>
        </Paper>
    );
};
