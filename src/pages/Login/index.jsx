import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";

import styles from "./Login.module.scss";
import {useForm} from "react-hook-form";
import {useDispatch, useSelector} from "react-redux";
import {fetchAuthMe, selectUser} from "../../redux/slices/auth";
import {useNavigate} from "react-router-dom";
import axios from "../../util/axios";

export const Login = () => {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const navigate = useNavigate()

    if (user) {
        navigate('/main')
    }

    const {
        register,
        handleSubmit,
        setValue,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            email: '',
            password: ''
        },
        mode: 'all'
    })

    const onSubmit = async (values) => {
        axios.post('/auth/login', values)
            .then(({data}) => {
                window.localStorage.setItem('auth-token', data.token)
                dispatch(fetchAuthMe())
            })
            .catch((err) => {
                const {data} = err.response.data
                setValue('email', '')
                setValue('password', '')
                alert(data)
            })
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
                <Button type={'submit'} size="large" variant="contained" disabled={!isValid} fullWidth>
                    Войти
                </Button>
            </form>
        </Paper>
    );
};
