import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../util/axios";

const initialState = {
    comments: [],
    isLoading: true,
    commentsByPost: {
        items: [],
        isLoading: true
    }
}

export const fetchCommentsByPost = createAsyncThunk(
    'comments/fetchCommentsByPost',
    async (postId) => {
        const {data} = await axios.get(`/comments/${postId}`)
        return data
    }
)

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async () => {
        const {data} = await axios.get('/comments')
        return data
    }
)

export const fetchAddComment = createAsyncThunk(
    'comments/fetchAddComment',
    async ({postId, content}) => {
        const {data} = await axios.post(`/comments/${postId}`, {
            content,
            postId
        })
        return data
    }
)

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: builder => {

        //get all comments
        builder.addCase(fetchComments.pending, (state) => {
            state.isLoading = true
            state.comments = []
        })
        builder.addCase(fetchComments.fulfilled, (state, action) => {
            state.isLoading = false
            state.comments = action.payload
        })
        builder.addCase(fetchComments.rejected, (state) => {
            state.isLoading = false
            state.comments = []
        })

        //get all comments by post
        builder.addCase(fetchCommentsByPost.pending, (state) => {
            state.commentsByPost.isLoading = true
            state.commentsByPost.items = []
        })
        builder.addCase(fetchCommentsByPost.fulfilled, (state, action) => {
            state.commentsByPost.isLoading = false
            state.commentsByPost.items = action.payload
        })
        builder.addCase(fetchCommentsByPost.rejected, (state) => {
            state.commentsByPost.isLoading = false
            state.commentsByPost.items = []
        })

        //add comment
        builder.addCase(fetchAddComment.pending, (state) => {
            state.commentsByPost.isLoading = true
        })
        builder.addCase(fetchAddComment.fulfilled, (state, action) => {
            state.commentsByPost.isLoading = false
            state.commentsByPost.items.push(action.payload)
            state.comments.push(action.payload)
        })
    }
})

export const selectComments = state => state.comment

export const selectCommentDataByPost = state => state.comment.commentsByPost

export default commentSlice.reducer