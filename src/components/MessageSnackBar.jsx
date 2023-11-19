import {Box, Snackbar} from "@mui/material";
import {useState} from "react";

function MessageSnackBar() {

    const [state, setState] = useState({
        open: false,
        vertical: "top",
        horizontal: "center",
    });
    const {vertical, horizontal, open} = state;

    const handleClick = (newState) => () => {
        setState({...newState, open: true});
    };

    const handleClose = () => {
        setState({...state, open: false});
    };

    return (
        <Box sx={{width: 500}}>
            <Snackbar
                anchorOrigin={{vertical, horizontal}}
                autoHideDuration={2000}
                open={open}
                onClose={handleClose}
                message="I love snacks"
            />
        </Box>
    )
}

export default MessageSnackBar