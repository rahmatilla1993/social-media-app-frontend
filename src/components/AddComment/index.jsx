import React, {useState} from "react";

import styles from "./AddComment.module.scss";

import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import {useDispatch} from "react-redux";
import {fetchAddComment} from "../../redux/slices/comment";

export const Index = ({postId}) => {

    const dispatch = useDispatch()
    const [text, setText] = useState('')

    const onSendHandle = () => {
        dispatch(fetchAddComment({
            postId,
            content: text
        }))
    }

    return (
        <>
            <div className={styles.root}>
                <Avatar
                    classes={{root: styles.avatar}}
                />
                <div className={styles.form}>
                    <TextField
                        label="Izoh yozish"
                        variant="outlined"
                        maxRows={10}
                        multiline
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        fullWidth
                    />
                    <Button variant="contained" onClick={onSendHandle}>Yuborish</Button>
                </div>
            </div>
        </>
    );
};
