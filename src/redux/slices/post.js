import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../util/axios";

const initialState = {
    tagName: null,
    search: null,
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
    async ({title, tag, order}) => {
        const {data} = await axios.get('/posts', {
            params: {
                title,
                tag,
                order
            }
        })
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

export const fetchRemovePost = createAsyncThunk(
    'posts/fetchRemovePosts',
    async (id) => await axios.delete(`/posts/${id}/delete`)
)

const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        setTagName: (state, action) => {
            state.tagName = action.payload
        },
        setSearch: (state, action) => {
            state.search = action.payload
        }
    },
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

        //delete post
        builder.addCase(fetchRemovePost.fulfilled, (state, action) => {
            state.posts.items = state.posts.items.filter(post => post.id !== action.meta.arg)
        })
    }
})

export const selectAllPosts = (state) => state.post.posts
export const selectAllTags = (state) => state.post.tags

export const {setTagName, setSearch} = postSlice.actions

export default postSlice.reducer