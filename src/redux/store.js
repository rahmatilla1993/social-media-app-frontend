import {configureStore} from "@reduxjs/toolkit";
import post from "./slices/post";
import comment from "./slices/comment";
import auth from "./slices/auth";

export const store = configureStore({
    reducer: {
        post,
        comment,
        auth
    }
})