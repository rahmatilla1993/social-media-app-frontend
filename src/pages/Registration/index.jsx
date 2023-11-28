import React, {useEffect, useRef, useState} from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";

import styles from "./Login.module.scss";
import {useLocation, useNavigate} from "react-router-dom";
import {useForm} from "react-hook-form";
import axios from "../../util/axios";
import {useDispatch, useSelector} from "react-redux";
import {setNotification} from "../../redux/slices/notification";
import {fetchAuthMe, selectUser} from "../../redux/slices/auth";
import {FormControl, FormHelperText, InputAdornment, InputLabel, OutlinedInput} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export const Registration = () => {

    const {pathname} = useLocation()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const inputFileRef = useRef(null)
    const [image, setImage] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const user = useSelector(selectUser)

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const isEditing = Boolean(pathname.includes('profile'))
    useEffect(() => {
        if (isEditing) {
            setImage(user.imageUrl)
        }
    }, []);

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isValid}
    } = useForm({
        defaultValues: {
            fullName: user?.fullName || '',
            email: user?.email || '',
            password: '',
            confirmPassword: ''
        },
        mode: 'all'
    })

    const onSubmit = (values) => {
        if (isEditing) {
            editUser(values)
        } else {
            registerUser(values)
        }
    }

    const registerUser = (values) => {
        const jsonBlob = new Blob([JSON.stringify(values)], {
            type: 'application/json'
        })
        const formData = new FormData()
        formData.append('file', imageFile)
        formData.append('data', jsonBlob)
        axios.post('/auth/signup', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(({data}) => {
                dispatch(setNotification({
                    open: true,
                    severity: 'success',
                    message: data.data
                }))
                navigate('/login')
            })
            .catch(err => {
                const {data} = err.response.data
                if (data) {
                    setError('email', {type: 'custom', message: data})
                } else {
                    setError('confirmPassword',
                        {
                            type: 'custom',
                            message: err.response.data.PasswordMatches
                        })
                }
            })
    }

    const editUser = (values) => {
        console.log(values)
        const jsonBlob = new Blob([JSON.stringify(values)], {
            type: 'application/json'
        })
        const formData = new FormData()
        formData.append('file', imageFile)
        formData.append('data', jsonBlob)
        axios.put('/user/edit', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(({data}) => {
                dispatch(setNotification({
                    open: true,
                    severity: 'success',
                    message: data.data
                }))
                dispatch(fetchAuthMe())
                navigate('/main')
            })
            .catch(err => {
                const {data} = err.response.data
                if (data) {
                    setError('email', {type: 'custom', message: data})
                } else {
                    setError('confirmPassword',
                        {
                            type: 'custom',
                            message: err.response.data.PasswordMatches
                        })
                }
            })
    }

    const onFileSelected = (event) => {
        const file = event.target.files[0]
        setImageFile(file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setImage(reader.result)
        }
    }

    return (
        <Paper classes={{root: styles.root}}>
            <Typography classes={{root: styles.title}} variant="h5">
                {isEditing ? 'Tahrirlash' : 'Akkaunt yaratish'}
            </Typography>
            <div className={styles.avatar}>
                <Avatar sx={{width: 100, height: 100}} src={image} onClick={() => inputFileRef.current.click()}/>
            </div>
            <p className={styles.title}>Akkauntga rasm tanlash (Avatar ikonkasini bosing)</p>
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    type="file"
                    hidden
                    ref={inputFileRef}
                    onChange={onFileSelected}
                    accept={'image/*,.jpg,.jpeg,.web,.png'}
                />
                <TextField className={styles.field}
                           label="To'liq ismi"
                           inputMode={'text'}
                           error={Boolean(errors.fullName?.message)}
                           helperText={errors.fullName?.message}
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
                        pattern: {
                            value: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/,
                            message: 'Emailga mos kelmadi'
                        }
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
                {/*Confirm password*/}
                <FormControl
                    className={styles.field}
                    variant="outlined"
                    fullWidth
                    error={Boolean(errors.confirmPassword?.message)}>
                    <InputLabel htmlFor="outlined-adornment-confirmPassword">Parolni tasdiqlash</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-confirmPassword"
                        type={showConfirmPassword ? 'text' : 'password'}
                        {...register('confirmPassword', {
                            required: "Password ni tasdiqlash maydoni bo'sh qolmasin",
                            pattern: {
                                value: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,}$/,
                                message: "Kamida 4 ta belgi, katta va kichik harflar va raqam bo'lishi shart"
                            }
                        })}
                        endAdornment={
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowConfirmPassword((show) => !show)}
                                    edge="end"
                                >
                                    {showConfirmPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Parolni tasdiqlash"
                    />
                    <FormHelperText disabled={Boolean(!errors.confirmPassword?.message)}>
                        {errors.confirmPassword?.message}
                    </FormHelperText>
                </FormControl>
                <Button type={'submit'} size="large" variant="contained" disabled={!isValid} fullWidth>
                    {isEditing ? 'Tahrirlash' : 'Kirish'}
                </Button>
            </form>
        </Paper>
    );
};
