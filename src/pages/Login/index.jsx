import React, {useEffect, useState} from "react";
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
import {setNotification} from "../../redux/slices/notification";
import {FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export const Login = () => {

    const dispatch = useDispatch()
    const user = useSelector(selectUser)
    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        if (user) {
            navigate('/main')
        }
    }, [user]);

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



    const onSubmit = (values) => {
        axios.post('/auth/login', values)
            .then(({data}) => {
                window.localStorage.setItem('auth-token', data.token)
                dispatch(setNotification({
                    open: true,
                    severity: 'success',
                    message: 'Successfully login'
                }))
                dispatch(fetchAuthMe())
            })
            .catch(() => {
                setValue('email', '')
                setValue('password', '')
                dispatch(setNotification({
                    open: true,
                    severity: 'error',
                    message: 'Email or password invalid'
                }))
            })
    }

    return (

        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                Akkauntga kirish
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
                {/*Password*/}
                <FormControl
                    className={styles.field}
                    variant="outlined"
                    fullWidth
                    error={Boolean(errors.password?.message)}>
                    <InputLabel htmlFor="outlined-adornment-password">Parol</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        {...register('password', {
                            required: "Password maydoni bo'sh qolmasin",
                            pattern: {
                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/,
                                message: "Kamida 4 ta belgi, katta va kichik harflar va raqam bo'lishi shart"
                            }
                        })}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowPassword((show) => !show)}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Parol"
                    />
                    <FormHelperText disabled={Boolean(!errors.password?.message)}>
                        {errors.password?.message}
                    </FormHelperText>
                </FormControl>
                <Button type={'submit'} size="large" variant="contained" disabled={!isValid} fullWidth>
                    Kirish
                </Button>
            </form>
        </Paper>
    )

};
