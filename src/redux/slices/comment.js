import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../util/axios";

const initialState = {
    comments: [],
    isLoading: true
}

export const fetchComments = createAsyncThunk(
    'comments/fetchComments',
    async () => {
        const {data} = await axios.get('/comments')
        return data
    }
)

const commentSlice = createSlice({
    name: 'comment',
    initialState,
    reducers: {},
    extraReducers: builder => {
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
    }
})

export const selectComments = state => state.comment

export default commentSlice.reducer