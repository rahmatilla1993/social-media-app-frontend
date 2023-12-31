import React from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";
import {useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "../../util/axios";

export const Registration = () => {

    const navigate = useNavigate()

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            fullName: '',
            email: '',
            password: ''
        },
        mode: 'all'
    })

    const onSubmit = async (values) => {
        axios.post('/auth/signup', values)
            .then(({data}) => {
                alert(data.data)
                navigate('/login')
            })
            .catch(err => {
                const {data} = err.response.data
                setError('email', {type: 'custom', message: data})
            })
    }

    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Создание аккаунта
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{width: 100, height: 100}}/>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <TextField className={styles.field} label="To'liq ismi" inputMode={'text'}
                           error={Boolean(errors.fullName?.message)} helperText={errors.fullName?.message}
                           {...register('fullName', {
                               required: "To'liq ism kiritilishi kerak"
                           })}
                           fullWidth/>
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
