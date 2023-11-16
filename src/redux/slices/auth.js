import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "../../util/axios";

const initialState = {
    data: null,
    errorMessage: null,
    isLoading: true
}

export const fetchUserData = createAsyncThunk(
    'auth/fetchUserData',
    async ({email, password}) => {
        const {data} = await axios.post('/auth/login', {
            email,
            password
        })
        return data
    }
)

export const fetchAuthMe = createAsyncThunk(
    'auth/fetchAuthMe',
    async () => {
        const {data} = await axios.get('/auth/me')
        return data
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = null
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchUserData.pending, (state) => {
            state.isLoading = true
            state.data = null
            state.errorMessage = null
        })
        builder.addCase(fetchUserData.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.errorMessage = null
        })
        builder.addCase(fetchUserData.rejected, (state) => {
            state.isLoading = false
            state.data = null
            state.errorMessage = 'Email or password invalid'
        })

        builder.addCase(fetchAuthMe.pending, (state) => {
            state.isLoading = true
            state.data = null
            state.errorMessage = null
        })
        builder.addCase(fetchAuthMe.fulfilled, (state, action) => {
            state.isLoading = false
            state.data = action.payload
            state.errorMessage = null
        })
        builder.addCase(fetchAuthMe.rejected, (state) => {
            state.isLoading = false
            state.data = null
            state.errorMessage = 'Email or password invalid'
        })
    }
})

export const selectIsAuth = state => Boolean(state.auth.data)

export const {logout} = authSlice.actions

export default authSlice.reducer