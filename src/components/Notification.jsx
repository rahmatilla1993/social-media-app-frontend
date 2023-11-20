import Stack from "@mui/material/Stack";
import {Alert, Snackbar} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {selectNotificationData, setNotification} from "../redux/slices/notification";

function Notification() {

    const dispatch = useDispatch()
    const {open, severity, message} = useSelector(selectNotificationData)

    const handleClose = (event, reason) => {
        if (reason === "clickaway") {
            return;
        }
        dispatch(setNotification({
            open: false
        }))
    }

    return (
        <Stack spacing={2} sx={{width: "100%"}}>
            <Snackbar maxWidth open={open} autoHideDuration={3000} onClose={handleClose} anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}>
                <Alert severity={severity} sx={{width: "100%"}}>
                    {message}
                </Alert>
            </Snackbar>
        </Stack>
    )
}

export default Notification