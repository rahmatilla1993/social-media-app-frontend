import {configureStore} from "@reduxjs/toolkit";
import post from "./slices/post";
import comment from "./slices/comment";
import auth from "./slices/auth";
import notification from "./slices/notification";

export const store = configureStore({
    reducer: {
        post,
        comment,
        auth,
        notification
    }
})