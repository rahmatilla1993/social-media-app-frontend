import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../util/axios";

const initialState = {
    posts: {
        items: [],
        isLoading: true
    },
    tags: {
        items: [],
        isLoading: true
    }
}

export const fetchPosts = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const {data} = await axios.get('/posts')
        return data
    }
)

export const fetchAllTags = createAsyncThunk(
    'tags/fetchAllTags',
    async () => {
        const {data} = await axios.get('/posts/allTags')
        return data
    }
)

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {},
    extraReducers: builder => {
        //get all posts
        builder.addCase(fetchPosts.pending, (state) => {
            state.posts.isLoading = true
            state.posts.items = []
        })
        builder.addCase(fetchPosts.fulfilled, (state, action) => {
            state.posts.isLoading = false
            state.posts.items = action.payload
        })
        builder.addCase(fetchPosts.rejected, (state) => {
            state.posts.isLoading = false
            state.posts.items = []
        })
        //get all tags
        builder.addCase(fetchAllTags.pending, (state) => {
            state.tags.isLoading = true
            state.tags.items = []
        })
        builder.addCase(fetchAllTags.fulfilled, (state, action) => {
            state.tags.isLoading = false
            state.tags.items = action.payload
        })
        builder.addCase(fetchAllTags.rejected, (state) => {
            state.tags.isLoading = false
            state.tags.items = []
        })
    }
})

export const selectAllPosts = (state) => state.post.posts
export const selectAllTags = (state) => state.post.tags

export default postSlice.reducer