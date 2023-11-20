import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    data: {
        open: false,
        severity: '',
        message: ''
    },
}

const notificationSlice = createSlice({
    name: 'notification',
    initialState,
    reducers: {
        setNotification: (state, action) => {
            state.data = action.payload
        },
    }
})

export const {setNotification} = notificationSlice.actions

export const selectNotificationData = state => state.notification.data
export const selectConfirmData = state => state.notification.confirm

export default notificationSlice.reducer