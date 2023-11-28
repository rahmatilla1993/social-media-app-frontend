import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../util/axios";

const initialState = {
    user: null,
}

export const fetchAuthMe = createAsyncThunk(
    'auth/fetchAuthMe',
    async () => {
        const {data} = await axios.get('/user/me')
        return data
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchAuthMe.pending, (state) => {
            state.user = null
        })
        builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.user = action.payload
        })
        builder.addCase(fetchAuthMe.rejected, (state) => {
            state.user = null
        })
    }
})

export const {logout} = authSlice.actions

export const selectUser = state => state.auth.user

export default authSlice.reducer