import React, {useCallback, useEffect, useMemo, useRef, useState} from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";

import "easymde/dist/easymde.min.css";
import styles from "./AddPost.module.scss";
import axios from "../../util/axios";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch} from "react-redux";
import {setNotification} from "../../redux/slices/notification";

export const AddPost = () => {
    const {id} = useParams()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [post, setPost] = useState({});
    const [image, setImage] = useState(null)
    const [imageFile, setImageFile] = useState(null)
    const inputFileRef = useRef(null)
    const isEditing = Boolean(id)

    useEffect(() => {
        if (id) {
            axios.get(`/posts/${id}`)
                .then(({data}) => {
                    setPost({
                        title: data.title,
                        content: data.text,
                        tags: data.tags.join(', ')
                    })
                    downloadImage(data.id)
                })
                .catch(err => console.log(err))
        }
    }, []);

    const downloadImage = (postId) => {
        axios.get(`/image/${postId}/download`, {
            responseType: 'blob'
        })
            .then((res) => {
                const reader = new FileReader()
                reader.readAsDataURL(res.data)
                reader.onload = () => {
                    setImage(reader.result)
                }
                // setImageFile(new File([res.data], 'aaab.jpg', res.data))
            })
            .catch(err => console.warn(err))
    }

    const onChange = useCallback((value) => {
        setPost(prevState => ({
            ...prevState,
            content: value
        }))
    }, []);

    const options = useMemo(() => ({
        spellChecker: false,
        maxHeight: "400px",
        autofocus: true,
        placeholder: "Введите текст...",
        status: false,
        autosave: {
            enabled: true, delay: 1000,
        },
    }), []);

    const handleChangeFile = (event) => {
        const file = event.target.files[0]
        setImageFile(file)
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => {
            setImage(reader.result)
        }
    }

    const uploadImage = (postId) => {
        if (imageFile) {
            const formData = new FormData()
            formData.append('file', imageFile)
            axios.post(`/image/${postId}/upload`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(({data}) => {
                    console.log(data)
                })
                .catch(err => console.error(err))
        }
        navigate(`/main`)
    }

    const onSubmit = async () => {
        try {
            const {data} = isEditing ?
                await axios.put(`/posts/${id}/edit`, {...post}) :
                await axios.post('/posts/add', {...post})
            dispatch(setNotification({
                open: true,
                severity: 'success',
                message: isEditing ? 'Post edited' : 'Post created'
            }))
            uploadImage(data.id)
        } catch (err) {
            dispatch(setNotification({
                open: true,
                severity: 'error',
                message: err.data
            }))
        }
    }

    return (<Paper style={{padding: 30}}>
        <Button variant="outlined" size="large" onClick={() => inputFileRef.current.click()}>
            Image Upload
        </Button>
        <input type="file" onChange={handleChangeFile} hidden ref={inputFileRef}/>
        {image && (<>
            <Button variant="contained" color="error" onClick={() => setImage(null)}>
                Delete
            </Button>
            <img
                className={styles.image}
                src={image}
                alt="Uploaded"
            />
        </>)}
        <br/>
        <br/>
        <TextField
            value={post.title}
            classes={{root: styles.title}}
            variant="standard"
            placeholder="Maqola sarlavhasi"
            onChange={(e) => setPost({...post, title: e.target.value})}
            fullWidth
        />
        <TextField
            value={post.tags}
            classes={{root: styles.tags}}
            variant="standard"
            placeholder="Heshteglar"
            onChange={e => setPost({...post, tags: e.target.value})}
            fullWidth
        />
        <SimpleMDE
            className={styles.editor}
            value={post.content}
            onChange={onChange}
            options={options}
        />
        <div className={styles.buttons}>
            <Button size="large" variant="contained" onClick={onSubmit}>
                {isEditing ? 'Edit' : 'Add'}
            </Button>
            <Button size="large">Cancel</Button>
        </div>
    </Paper>);
};
